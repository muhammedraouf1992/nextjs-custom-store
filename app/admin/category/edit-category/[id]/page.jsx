import prisma from "@/prismaClient";
import React from "react";
import EditCategoryForm from "../../_components/EditCategoryForm";

const EditCategory = async ({ params }) => {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });
  return (
    <div>
      <EditCategoryForm category={category} />
    </div>
  );
};

export default EditCategory;
