import { z } from "zod";

const fileSchema = z.instanceof(File).refine((file) => file.size > 0, {
  message: "Each file must have a size greater than 0 bytes",
});

const imageSchema = z.array(fileSchema).nonempty({
  message: "You must select at least one image",
});
const categoryImage = z
  .instanceof(File, { message: "you have to pick an image" })
  .refine((file) => file.size > 0, {
    message: "File size must be greater than 0.",
  });
const excelSheet = z
  .instanceof(File, { message: "you have to pick an excelSheet" })
  .refine((file) => file.size > 0, {
    message: "File size must be greater than 0.",
  });
export const addCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category_img: categoryImage,
});

export const addSubCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  subCategory_img: categoryImage,
});

export const editCategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min().optional(),
  description: z.string().optional(),
  imgUrl: z.any().optional(), // Allowing any file type and making it optional
});

export const editSubCategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min().optional(),
  description: z.string().optional(),
  imgUrl: z.any().optional(), // Allowing any file type and making it optional
  categoryId: z.string().optional(),
});

export const addProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  product_img: imageSchema, // Multiple files
  // Single file or none
  price: z.string().min(1),
  quantity: z.string().min(1),
  categoryId: z.string().min(1, { message: "you have to pick a category" }),
  subCategoryId: z.string().optional(),
  is_available: z.boolean().default(false).optional(),
  is_featured: z.boolean().default(false).optional(),
  is_bestSeller: z.boolean().default(false).optional(),
  is_newArrival: z.boolean().default(false).optional(),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
});
export const editProductSchema = z.object({
  name: z.string().min().optional(),
  description: z.string().min().optional(),
  product_img: z.any().optional(),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  is_available: z.boolean().default(false).optional(),
  is_featured: z.boolean().default(false).optional(),
  is_bestSeller: z.boolean().default(false).optional(),
  is_newArrival: z.boolean().default(false).optional(),
});
export const varitionsSchema = z.object({
  name: z.string().min(1),
});
export const editVariationSchema = z.object({
  price: z.string().min(1).optional(),
  quantity: z.string().min(1).optional(),
  variation_img: z.any().optional(),
});

export const AddNewVariationSchema = z.object({
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  price: z.string().min(1),
  quantity: z.string().min(1),
  variation_img: categoryImage,
});
export const pickVariationSchema = z.object({
  colorId: z.string().min(1, { message: "you have to pick color" }),
  sizeId: z.string().min(1, { message: "you have to pick size" }),
});

export const checkoutSchema = z.object({
  apartment: z.string().min(1),
  floor: z.string().min(1),
  building: z.string().min(1),
  postal_code: z.string().min(1),
  street: z.string().min(1),
  phone_number: z.string().min(1),
  city: z.string().min(1),
  payment_method: z.string().min(1),
});

const editOrderEnum = z.enum([
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
]);
export const editOrderSchema = z.object({
  status: editOrderEnum,
});
export const uploadExcelSheet = z.object({
  file: excelSheet,
});
export const filterSchema = z.object({
  colorId: z.string().optional(),
  sizeId: z.string().optional(),
});
