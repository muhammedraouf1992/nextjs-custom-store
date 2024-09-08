import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";

import PageHeader from "@/components/layout/PageHeader";
import CategoryTable from "./_components/CategoryTable";

const CategoryPage = async () => {
  return (
    <>
      <div className="flex justify-between items-center my-5">
        <PageHeader>Category</PageHeader>
        <Link href="/admin/category/add-category" className={buttonVariants()}>
          Add new Category
        </Link>
      </div>

      <CategoryTable />
    </>
  );
};

export default CategoryPage;
