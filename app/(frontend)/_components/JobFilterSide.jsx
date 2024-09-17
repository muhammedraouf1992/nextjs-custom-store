"use client";

import { Label } from "@/components/ui/label";

import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import "@/app/globals.css";
import { filterAction } from "../actions/filterAction";
import { filterSchema } from "@/lib/validationSchema";
import { useRouter } from "next/navigation";
const JobFilterSide = ({ sizes, colors, categoryId }) => {
  const [range, setRange] = useState([0, 300]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleRangeChange = (value) => {
    setRange(value);
  };
  const form = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      colorId: "",
      sizeId: "",
    },
  });
  const onSubmit = (values) => {
    const formData = new FormData();

    formData.append("colorId", values.colorId);
    formData.append("sizeId", values.sizeId);
    formData.append("priceRange", range);
    startTransition(async () => {
      await filterAction(formData, categoryId);
    });
  };
  const onClearFilters = () => {
    form.reset(); // Reset the form fields
    setRange([0, 300]); // Reset the price range slider
    router.push(`/category/${categoryId}`);
    router.refresh();
  };
  return (
    <aside className="relative md:sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[300px]  md:block">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
                        <SelectValue placeholder="Select size" />
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

                  <FormMessage />
                </FormItem>
              )}
            />
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
                        <SelectValue placeholder="Select color" />
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

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label className="my-3">Price</Label>
              <div className="my- test">
                <Slider
                  defaultValue={[0, 300]}
                  max={1000}
                  min={0}
                  step={50}
                  value={range}
                  onValueChange={handleRangeChange}
                  formatLabel={(value) => `${value} SAR`}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-14">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Searching..." : "Search"}
            </Button>
            <Button type="button" variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
          </div>
        </form>
      </Form>
    </aside>
  );
};

export default JobFilterSide;
