"use server";

import { AddNewVariationSchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";
import { uploadSingleImage } from "../../../../lib/imageActions";

export const addProductVariation = async (formData, productId) => {
  const newData = Object.fromEntries(formData);
  const results = AddNewVariationSchema.safeParse(newData);
  if (results.success === false) {
    console.log(results.error.formErrors.fieldErrors);
    return results.error.formErrors.fieldErrors;
  }
  const data = results.data;

  const url = await uploadSingleImage(data.variation_img);
  try {
    await prisma.productVariation.create({
      data: {
        productId,
        price: Number(data.price),
        quantity: Number(data.quantity),
        sizeId: data.sizeId,
        colorId: data.colorId,
        images: {
          create: {
            url,
          },
        },
      },
    });
    revalidatePath("/admin/product/edit-product/[id]", "page");
  } catch (error) {
    console.error(
      "Error during product variation update or image creation:",
      error
    );

    // Return an error response or handle the error accordingly
    return { error: error.message };
  }
};
