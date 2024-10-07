"use client";

import { pickVariationSchema } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AddToCartButton from "../../_components/AddToCartButton";
import { incrementCartQuantity } from "../../actions/cartAction";
import { toast } from "sonner";
import { getProductVariation } from "../[id]/actions/getProductVariationAction";

import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PickVariationForm = ({
  newSizes,

  productId,
  colors,
  sizes,
  uniqueImages,
}) => {
  const [img, setImg] = useState(null);

  const [variation, setVariation] = useState(null);
  const [scolor, setColor] = useState(null);
  const [ssize, setSize] = useState(null);

  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(pickVariationSchema),
    defaultValues: {
      colorId: "",
      sizeId: "",
    },
  });

  const handleSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("colorId", data.colorId);
    formData.append("sizeId", data.sizeId);

    startTransition(async () => {
      const response = await incrementCartQuantity(formData, productId);
      if (response?.error) {
        toast.error(response?.error);
      }
      toast.success(response?.message);
    });
  };

  const handleColorSelection = (colorId, imageUrl) => {
    setColor(colorId);
    setImg(imageUrl);
    if (ssize) {
      getSingleVariation(ssize, colorId); // Call when both are selected
    }
  };

  const handleSizeSelection = (sizeId) => {
    setSize(sizeId);
    if (scolor) {
      getSingleVariation(sizeId, scolor); // Call when both are selected
    }
  };
  const getSingleVariation = async (size, color) => {
    if (color && size) {
      const variation = await getProductVariation(size, color, productId);
      setVariation(variation);
    }
  };

  function getProductSizes(newSizesArray, value) {
    const isExist = newSizesArray.find(
      (newSize) => newSize.name.toLowerCase() == value.toLowerCase()
    );

    if (isExist) {
      return false;
    }
    return true;
  }

  function getProductSizeId(newSizesArray, value) {
    const isExist = newSizesArray.find(
      (newSize) => newSize.name.toLowerCase() == value.toLowerCase()
    );
    if (!isExist) {
      return null;
    }
    return isExist.id;
  }

  return (
    <div className="mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="my-5">
          {/* Color Select */}
          <FormField
            control={form.control}
            name="colorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select color</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="grid grid-cols-5 px-10 py-2">
                      {uniqueImages.map((color) => (
                        <FormItem
                          className={`flex justify-center items-center`}
                          key={color.id}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={getProductSizeId(colors, color.color.name)}
                              onClick={() =>
                                handleColorSelection(
                                  color.color.id,
                                  color.images[0].url
                                )
                              }
                            />
                          </FormControl>
                          <FormLabel
                            className={`font-normal border border-slate-300 cursor-pointer`}
                          >
                            <Image
                              src={color.images[0].url}
                              width={50}
                              height={50}
                              alt="variation image"
                            />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Size Select */}
          <FormField
            control={form.control}
            name="sizeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Size</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="grid grid-cols-5 px-10 py-2">
                      {sizes.map((size) => (
                        <FormItem
                          className={`flex justify-center items-center `}
                          key={size.id}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={getProductSizeId(sizes, size.name)}
                              disabled={getProductSizes(newSizes, size.name)}
                            />
                          </FormControl>
                          <FormLabel
                            className={`font-normal p-4 border border-slate-300 ${
                              getProductSizes(newSizes, size.name)
                                ? "disabled"
                                : "abled"
                            }`}
                            onClick={() => handleSizeSelection(size.id)}
                          >
                            {size.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <AddToCartButton
            isPending={isPending}
            quantity={variation?.quantity}
          />
        </form>
      </Form>
      {img && (
        <div>
          <Image
            src={img}
            width={200}
            height={200}
            alt="product variation image"
            className="rounded-2xl"
          />
        </div>
      )}
      {variation && (
        <div className="flex gap-2 my-4">
          Quantity
          {variation?.quantity > 3 ? (
            <p className="font-bold">INSTOCK</p>
          ) : (
            <p className="text-red-500 uppercase">{variation?.quantity} left</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PickVariationForm;
