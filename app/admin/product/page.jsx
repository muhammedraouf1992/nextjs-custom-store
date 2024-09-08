import { Button } from "@/components/ui/button";

import Link from "next/link";
import ProductTable from "./_components/ProductTable";
import PageHeader from "@/components/layout/PageHeader";
const ProductsPage = () => {
  return (
    <>
      <div className="flex justify-between items-center my-5">
        <PageHeader>Product</PageHeader>
        <div className="flex flex-col gap-2 lg:flex-row">
          <Button asChild>
            <Link href="/admin/product/add-product">Add new Product</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/product/upload">Upload Prodcts</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/variations">Manage variations</Link>
          </Button>
        </div>
      </div>
      <ProductTable />
    </>
  );
};

export default ProductsPage;
