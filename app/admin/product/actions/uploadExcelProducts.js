"use server";
import * as XLSX from "xlsx";
import { uploadExcelSheet } from "@/lib/validationSchema";
import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";

export const uploadExcelProducts = async (formData) => {
  const newData = Object.fromEntries(formData.entries());
  const results = uploadExcelSheet.safeParse(newData);
  if (!results.success) {
    console.log(results.error.message);
  }
  const file = results.data.file;
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  await uploadProducts(jsonData);
  revalidatePath("/admin/product", "page");
};

const uploadProducts = async (parsedData) => {
  const products = [];
  const category = await prisma.category.findMany({});
  const colors = await prisma.color.findMany({});
  const sizes = await prisma.size.findMany({});

  parsedData.forEach((row) => {
    if (category) {
    }
    const filteredCategory = category.find(
      (c) => c.name.toLowerCase() == row.category_name?.toLowerCase()
    );
    const filteredColor = colors.find(
      (c) => c.name.toLowerCase() == row.color.toLowerCase()
    );
    const filteredSize = sizes.find(
      (c) => c.name.toLowerCase() == row.size.toLowerCase()
    );

    const duplicateProduct = products.find(
      (p) => p.productDetails.name === row.product_name
    );
    if (duplicateProduct) {
      duplicateProduct.variations.push({
        sizeId: filteredSize.id,
        colorId: filteredColor.id,
        price: row.price,
        quantity: row.quantity,
        variation_image: row.variation_image,
      });
    } else {
      products.push({
        productDetails: {
          name: row.product_name,
          description: row.product_description,
          categoryId: filteredCategory.id,
          is_available: row.available,
          is_featured: row.featured,
          is_bestSeller: row.best_seller,
          is_newArrival: row.new_arrival,
          images: [
            row.product_image1,
            row.product_image2,
            row.product_image3,
            row.product_image4,
            row.product_image5,
          ],
        },
        variations: [
          {
            sizeId: filteredSize.id,
            colorId: filteredColor.id,
            price: row.price,
            quantity: row.quantity,
            variation_image: row.variation_image,
          },
        ],
      });
    }
  });
  await Promise.all(
    products.map(async (row) => {
      const validImages = row.productDetails.images.filter((url) => url);
      await prisma.product.create({
        data: {
          name: row.productDetails.name,
          description: row.productDetails.description,
          categoryId: row.productDetails.categoryId,
          is_available: row.productDetails.is_available,
          is_featured: row.productDetails.is_featured,
          is_bestSeller: row.productDetails.is_bestSeller,
          is_newArrival: row.productDetails.is_newArrival,
          images: {
            createMany: {
              data: validImages.map((url) => ({
                url,
                description: `${row.productDetails.name} image`,
              })),
            },
          },
          variations: {
            create: row.variations.map((variation) => {
              console.log("variation");
              console.log(variation);
              return {
                sizeId: variation.sizeId,
                colorId: variation.colorId,
                price: variation.price,
                quantity: variation.quantity,
                images: {
                  create: {
                    url:
                      variation.variation_image ||
                      "https://res.cloudinary.com/dnh3uxlsu/image/upload/v1724837986/Untitled-design-2022-01-26T113456.782_fbl9c2.jpg",
                    description:
                      row.productDetails.product_name + "image description",
                  },
                },
              };
            }),
          },
        },
      });
    })
  );
};
