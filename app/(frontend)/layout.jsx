import MainNavbar from "@/components/layout/MainNavbar";
import { getCart } from "@/lib/cart";
import prisma from "@/prismaClient";

import React from "react";

const layout = async ({ children }) => {
  const cart = await getCart();
  const category = await prisma.category.findMany({});

  return (
    <div>
      <>
        <MainNavbar cart={cart} category={category} />
      </>
      <div>{children}</div>
    </div>
  );
};

export default layout;
