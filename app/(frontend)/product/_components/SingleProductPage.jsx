"use client";

import React, { useState } from "react";
import parse from "html-react-parser";
import PickVariationForm from "../_components/PickVariationForm";
import ProductSlider from "../../_components/ProductSlider";
import ProductDetails from "../_components/ProductDetails";
import { formatPrice } from "@/lib/utils";

const SingleProductPage = ({
  product,
  uniqueSizes,
  uniqueImages,
  colors,
  sizes,
}) => {
  const [sliderImages, setSliderImages] = useState(product.images);
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 justify-start items-start">
      <div>
        <ProductSlider sliderImages={sliderImages} />
      </div>

      <div>
        <p className="text-lg uppercase font-bold">{product.category.name}</p>
        <h2 className="text-3xl my-5">{product.name}</h2>
        <p className="text-blue-500 font-bold">
          {formatPrice(product.variations[0].price)}
        </p>

        <div className="text-slate-600 mt-2">
          {parse(product.short_description)}
        </div>

        <PickVariationForm
          newSizes={uniqueSizes}
          uniqueImages={uniqueImages}
          productId={product.id}
          colors={colors}
          sizes={sizes}
          setSliderImages={setSliderImages}
        />
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default SingleProductPage;
