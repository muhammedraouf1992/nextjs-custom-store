"use server";

import { filterSchema } from "@/lib/validationSchema";
import { redirect } from "next/navigation";

export const filterAction = async (data, categoryId) => {
  const formData = Object.fromEntries(data);
  const results = filterSchema.safeParse(formData);
  if (!results.success) {
    console.log(results.error.message);
    return results.error.message;
  }
  const { q, colorId, sizeId } = results.data;
  console.log(results.data);

  const priceRangeArray = formData.priceRange.split(",");

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(colorId && { colorId }),
    ...(sizeId && { sizeId }),
    ...(formData.priceRange && {
      min: priceRangeArray[0],
      max: priceRangeArray[1],
    }),
  });

  redirect(`/category/${categoryId}/?${searchParams.toString()}`);
};
