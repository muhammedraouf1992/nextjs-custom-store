import prisma from "@/prismaClient";
import React from "react";
import SingleProductPage from "../_components/SingleProductPage";

const SingleProduct = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: true,
      category: true,
      variations: {
        include: {
          size: true,
          color: true,
          images: true,
        },
      },
    },
  });
  const uniqueImages = Object.values(
    product.variations.reduce((acc, item) => {
      if (!acc[item.colorId]) {
        acc[item.colorId] = item;
      }
      return acc;
    }, {})
  );

  const colors = await prisma.color.findMany({});
  const sizes = await prisma.size.findMany({});

  // Extract unique sizes
  const uniqueSizes = Array.from(
    new Set(product.variations.map((vari) => JSON.stringify(vari.size)))
  ).map((size) => JSON.parse(size));

  return (
    <>
      <SingleProductPage
        uniqueSizes={uniqueSizes}
        colors={colors}
        sizes={sizes}
        uniqueImages={uniqueImages}
        product={product}
      />
    </>
  );
};

export default SingleProduct;
