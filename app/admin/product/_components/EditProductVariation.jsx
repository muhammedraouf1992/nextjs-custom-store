"use client";
import { editVariationSchema } from "@/lib/validationSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { editVariationAction } from "../actions/editVariationAction";
import { toast } from "sonner";

const EditProductVariation = ({ variation }) => {
  const [isPending, startTransition] = useTransition();

  const [image, setImage] = useState(null);

  const form = useForm({
    resolver: zodResolver(editVariationSchema),
    defaultValues: {},
  });

  const handleSubmit = (data) => {
    const formData = new FormData();
    formData.append("price", data.price || variation.price);
    formData.append("quantity", data.quantity || variation.quantity);
    formData.append("sku", data.sku || variation.sku);
    formData.append("bar_code", data.bar_code || variation.bar_code);

    if (image) {
      formData.append("variation_img", image); // Append new image file
    } else {
      formData.append("variation_img", variation.images); // Keep old image if no new image is selected
    }

    startTransition(async () => {
      const response = await editVariationAction(formData, variation);
      if (response?.error) {
        toast.error("error while updating the variation");
      }
      toast.success("product varition was updated successfully");
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="price"
          render={({ field: { value, ...moreFields } }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="price"
                  {...moreFields}
                  value={value || variation?.price}
                  type="number"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field: { value, ...moreFields } }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder="Quantity"
                  {...moreFields}
                  value={value || variation?.quantity}
                  type="number"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* sku Field */}
        <FormField
          control={form.control}
          name="sku"
          render={({ field: { value, ...moreFields } }) => (
            <FormItem>
              <FormLabel>Product sku</FormLabel>
              <FormControl>
                <Input
                  placeholder="add product sku"
                  {...moreFields}
                  value={value || variation?.sku}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* barcode Field */}
        <FormField
          control={form.control}
          name="bar_code"
          render={({ field: { value, ...moreFields } }) => (
            <FormItem>
              <FormLabel>Product barcode</FormLabel>
              <FormControl>
                <Input
                  placeholder="add product barcode"
                  {...moreFields}
                  value={value || variation?.bar_code}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="variation_img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variation Image</FormLabel>

              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;

                    // Use setValue to update the form state
                    form.setValue("variation_img", selectedFile);
                    setImage(selectedFile);
                  }}
                  ref={field.ref} // Ensure the input is properly registered
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="my-4" disabled={isPending}>
          Edit Variation
        </Button>
      </form>
    </Form>
  );
};

export default EditProductVariation;
