import PaginationComponent from "@/app/(frontend)/_components/PaginationComponent";
import ProductCard from "@/app/(frontend)/_components/ProductCard";
import prisma from "@/prismaClient";
import React from "react";

const SubCategoryPage = async ({ params, searchParams }) => {
  const searchValues = {
    q: searchParams?.q,
    colorId: searchParams?.colorId,
    sizeId: searchParams?.sizeId,
    min: searchParams?.min,
    max: searchParams?.max,
  };
  const pageSize = 8;

  const page = parseInt(searchParams.page) || 1;

  const productsPromise = prisma.product.findMany({
    where: {
      categoryId: params.id,
      subCategoryId: params.subCategoryId,
    },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      images: true,
      variations: {
        where: {
          AND: [
            searchValues.colorId && { colorId: searchValues.colorId },
            searchValues.sizeId && { sizeId: searchValues.sizeId },
            searchValues.min &&
              searchValues.max && {
                price: {
                  gte: Number(searchValues.min),
                  lte: Number(searchValues.max),
                },
              },
          ].filter(Boolean), // Filters out any `false` or `null` conditions
        },
        include: {
          images: true,
        },
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const countPromise = prisma.product.count({
    where: {
      categoryId: params.id,
      subCategoryId: params.subCategoryId,
      variations: {
        every: {
          // Ensure that every variation matches all the filters
          AND: [
            searchValues.colorId && { colorId: searchValues.colorId },
            searchValues.sizeId && { sizeId: searchValues.sizeId },
            searchValues.min &&
              searchValues.max && {
                price: {
                  gte: Number(searchValues.min),
                  lte: Number(searchValues.max),
                },
              },
          ].filter(Boolean), // Filters out any `false` or `null` conditions
        },
      },
    },
  });

  const [products, totalCount] = await Promise.all([
    productsPromise,
    countPromise,
  ]);

  const filteredProducts = products?.filter(
    (product) => product.variations.length > 0
  );

  if (filteredProducts?.length < 1) {
    return <p>there are no products....expand your filters</p>;
  }
  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4 grid-cols-2">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <PaginationComponent
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </div>
  );
};

export default SubCategoryPage;
