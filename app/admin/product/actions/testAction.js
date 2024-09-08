"use server";

import prisma from "@/prismaClient";

export const test = async () => {
  const category = await prisma.category.findMany({});
  console.log(category);
};
