"use server";

import { editVariationSchema } from "@/lib/validationSchema";
import prisma from "@/prismaClient";
import { deleteImage, uploadSingleImage } from "../../../../lib/imageActions";

import { revalidatePath } from "next/cache";

export const editVariationAction = async (formData, variation) => {
  const newData = Object.fromEntries(formData.entries());

  const results = editVariationSchema.safeParse(newData);

  if (results.success === false) {
    console.log(results.error.formErrors.fieldErrors);
    return results.error.formErrors.fieldErrors;
  }

  const data = results.data;
  console.log("data from the server");
  console.log(data);
  let imageUrl;
  const imageId = variation.images[0]?.id;

  if (formData.has("variation_img")) {
    const file = formData.get("variation_img");
    if (file instanceof File) {
      try {
        imageUrl = await uploadSingleImage(file); // Upload new image if provided

        const publicId = variation.images[0]?.url
          ?.split("/")
          .pop()
          .split(".")[0];
        if (publicId) {
          await deleteImage(publicId);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        return { variation_img: ["Failed to upload image"] }; // Return error if image upload fails
      }
    }
  }

  try {
    if (imageId) {
      await prisma.productVariation.update({
        where: { id: variation.id },
        data: {
          price: Number(data.price),
          quantity: Number(data.quantity),
          sku: data.sku,
          bar_code: data.bar_code,
          images: {
            update: {
              where: { id: imageId },
              data: { url: imageUrl },
            },
          },
        },
      });
    } else {
      await prisma.$transaction([
        prisma.productVariation.update({
          where: { id: variation.id },
          data: {
            price: Number(data.price),
            quantity: Number(data.quantity),
            sku: data.sku,
            bar_code: data.bar_code,
          },
        }),
        prisma.image.create({
          data: {
            productVariationId: variation.id,
            url: imageUrl,
            description: `Photo for variation product`,
          },
        }),
      ]);
    }

    // Revalidate the path after successful operations
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
