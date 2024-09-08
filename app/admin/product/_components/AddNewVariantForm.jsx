"use client";

import { AddNewVariationSchema } from "@/lib/validationSchema";
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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addProductVariation } from "../actions/addProductVariation";
import { toast } from "sonner";

const AddNewVariantForm = ({ sizes, colors, product }) => {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState();

  const form = useForm({
    resolver: zodResolver(AddNewVariationSchema),
    defaultValues: {
      quantity: "",
      price: "",
      sizeId: "",
      colorId: "",
      variation_img: "",
    },
  });

  const onSubmit = async (data) => {
    // Debugging: Log the submitted data
    console.log("Submitted data:", data);

    const formData = new FormData();
    formData.append("quantity", data.quantity);
    formData.append("price", data.price);
    formData.append("colorId", data.colorId);
    formData.append("sizeId", data.sizeId);
    formData.append("variation_img", data.variation_img);

    startTransition(async () => {
      const response = await addProductVariation(formData, product.id);
      if (response?.error) {
        setErrors(response?.error);
        toast.error(response?.error);
      }
      toast.success("new variation has been added");
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem value={color.id} key={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage color in the{" "}
                    <Link href="/admin/variations" className="text-blue-700">
                      manage variations page
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem value={size.id} key={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage size in the{" "}
                    <Link href="/admin/variations" className="text-blue-700">
                      manage variations page
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variation price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="add category name"
                      {...field}
                      type="number"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-5">
          <FormField
            control={form.control}
            name="variation_img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      // Capture the selected file
                      const selectedFile = e.target.files?.[0] || null;
                      // Manually trigger the onChange event with the selected file
                      field.onChange(selectedFile);
                    }}
                    ref={field.ref} // Ensure the input is properly registered
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Variation"}
        </Button>
      </form>
    </Form>
  );
};

export default AddNewVariantForm;
