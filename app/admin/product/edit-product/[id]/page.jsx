import React from "react";
import EditProductForm from "../../_components/EditProductForm";
import prisma from "@/prismaClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VariableProducts from "../../_components/VariableProducts";
import PageHeader from "@/components/layout/PageHeader";
const EditProductPage = async ({ params }) => {
  const categories = await prisma.category.findMany({});
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: true,
      variations: {
        include: {
          size: true,
          color: true,
          images: true,
        },
      },
    },
  });

  return (
    <>
      <PageHeader>edit product </PageHeader>
      <div>
        <Tabs defaultValue="edit">
          <TabsList>
            <TabsTrigger value="edit">Edit product</TabsTrigger>
            <TabsTrigger value="variables">variants</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <EditProductForm categories={categories} product={product} />
          </TabsContent>
          <TabsContent value="variables">
            <VariableProducts product={product} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default EditProductPage;
