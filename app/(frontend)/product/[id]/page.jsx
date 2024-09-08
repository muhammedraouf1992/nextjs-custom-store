import { formatPrice } from "@/lib/utils";
import prisma from "@/prismaClient";

import React from "react";

import PickVariationForm from "../_components/PickVariationForm";

import ProductSlider from "../../_components/ProductSlider";
import ProductDetails from "../_components/ProductDetails";
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
        },
      },
    },
  });

  // Extract unique colors
  const uniqueColors = Array.from(
    new Set(product.variations.map((vari) => JSON.stringify(vari.color)))
  ).map((color) => JSON.parse(color));

  // Extract unique sizes
  const uniqueSizes = Array.from(
    new Set(product.variations.map((vari) => JSON.stringify(vari.size)))
  ).map((size) => JSON.parse(size));

  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 py-10">
      <div>
        <ProductSlider product={product} />
      </div>

      <div>
        <p className="text-lg uppercase font-bold">{product.category.name}</p>
        <h2 className="text-3xl my-5">{product.name}</h2>
        <p className="text-blue-500 font-bold">
          {formatPrice(product.variations[0].price)}
        </p>
        <p className="text-slate-600 mt-2">{product.description}</p>

        <PickVariationForm
          newSizes={uniqueSizes}
          newColors={uniqueColors}
          productId={product.id}
        />
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default SingleProduct;
