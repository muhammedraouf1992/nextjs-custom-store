"use server";
import { uploadSingleImage } from "@/lib/imageActions";
import { addSubCategorySchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";

import { revalidatePath } from "next/cache";

export const addSubCategoryAction = async (formData, categoryId) => {
  console.log(formData);
  const newData = Object.fromEntries(formData.entries());

  const results = addSubCategorySchema.safeParse(newData);

  if (results.success === false) {
    return results.error.formErrors.fieldErrors;
  }
  const data = results.data;

  const url = await uploadSingleImage(data.subCategory_img);

  await prisma.subCategory.create({
    data: {
      name: data.name,
      description: data.description,
      imgUrl: url,
      categoryId: categoryId,
    },
  });

  revalidatePath("/admin/category/edit-category/[id]", "page");
};
