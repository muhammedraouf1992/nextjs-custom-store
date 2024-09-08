import React from "react";
import JobFilterSide from "../../_components/JobFilterSide";
import prisma from "@/prismaClient";

const layout = async ({ children, params }) => {
  const colors = await prisma.color.findMany({});
  const sizes = await prisma.size.findMany({});
  return (
    <div className="container ">
      <div className="flex flex-col gap-4 md:flex-row">
        <JobFilterSide colors={colors} sizes={sizes} categoryId={params.id} />
        {children}
      </div>
    </div>
  );
};

export default layout;
