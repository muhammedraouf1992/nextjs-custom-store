"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import Image from "next/image";

const ProductSlider = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        pagination={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Pagination, Thumbs]}
        className="mySwiper2"
      >
        {product.images.map((image) => (
          <SwiperSlide key={image.id}>
            <div>
              <Image
                src={image.url}
                width={600}
                height={600}
                alt="product image"
                className="rounded-3xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        loop={true}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper styles opacity-40"
      >
        {product.images.map((image) => (
          <SwiperSlide key={image.id}>
            <div>
              <Image
                src={image.url}
                width={600}
                height={600}
                alt="product image"
                className="rounded-3xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductSlider;
