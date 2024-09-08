"use client";

import { pickVariationSchema } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import logo from "@/public/unknown.png";
const PickVariationForm = ({ newSizes, newColors, productId }) => {
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);

  const [variation, setVariation] = useState(null);

  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(pickVariationSchema),
    defaultValues: {
      colorId: "",
      sizeId: "",
    },
  });

  const handleSubmit = (data) => {
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

  const getSingleVariation = async (size, color) => {
    if (color && size) {
      const variation = await getProductVariation(size, color, productId);
      setVariation(variation);
    }
  };

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
                <FormLabel>Select Color</FormLabel>
                <Select
                  onValueChange={(e) => {
                    field.onChange(e);
                    setColor(e);
                    getSingleVariation(size, e);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {newColors.map((color) => (
                      <SelectItem
                        value={color.id}
                        key={color.id}
                        className="uppercase"
                      >
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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
                <Select
                  onValueChange={(e) => {
                    field.onChange(e);
                    setSize(e);
                    getSingleVariation(e, color);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {newSizes.map((size) => (
                      <SelectItem
                        value={size.id}
                        key={size.id}
                        className="uppercase"
                      >
                        {size.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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
      {variation && (
        <div>
          <p className="uppercase my-2">quantity: {variation?.quantity} left</p>
          <p className="uppercase my-2 text-blue-500">
            price: {formatPrice(variation?.price)}
          </p>
          <Image
            src={variation?.images[0]?.url || logo}
            width={200}
            height={200}
            alt="product variation image"
            className="rounded-2xl"
          />
        </div>
      )}
      <div></div>
    </div>
  );
};

export default PickVariationForm;
