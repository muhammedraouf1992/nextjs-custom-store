import { Button } from "@/components/ui/button";
import { PenIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteProductVariation from "./DeleteProductVariation";
import EditProductVariation from "./EditProductVariation";
import AddNewVariantForm from "./AddNewVariantForm";
import prisma from "@/prismaClient";

const VariableProducts = async ({ product }) => {
  const sizes = await prisma.size.findMany({});
  const colors = await prisma.color.findMany({});
  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {product.variations.map((variation) => (
          <div
            key={variation.id}
            className="relative  p-5 bg-slate-100 rounded-lg"
          >
            <div>
              <Image
                src={variation.images[0]?.url || "/unknown.png"}
                height={200}
                width={200}
                alt=""
              />
              <div className="flex justify-between my-2">
                <p>size: {variation.size.name}</p>
                <p> color: {variation.color.name}</p>
              </div>

              <EditProductVariation variation={variation} />
            </div>

            <div className="absolute top-4 right-4">
              <DeleteProductVariation variation={variation} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20 flex justify-center">
        <h2 className="text-3xl capitalize">you can add a new variant</h2>
      </div>
      <div className="flex justify-center my-10">
        <AddNewVariantForm sizes={sizes} colors={colors} product={product} />
      </div>
    </>
  );
};

export default VariableProducts;
