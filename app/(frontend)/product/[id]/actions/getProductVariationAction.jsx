"use server";
import prisma from "@/prismaClient";

export const getProductVariation = async (sizeId, colorId, productId) => {
  console.log("function is working");
  try {
    const variation = await prisma.productVariation.findFirst({
      where: {
        sizeId,
        colorId,
        productId,
      },
      include: {
        images: true,
      },
    });
    console.log(variation);
    return variation;
  } catch (error) {
    console.log(error);
  }
};
