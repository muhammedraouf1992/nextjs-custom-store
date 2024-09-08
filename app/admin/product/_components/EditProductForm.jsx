"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { addProductSchema, editProductSchema } from "@/lib/validationSchema";
import Link from "next/link";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { deleteProductImage } from "../actions/deleteProductImage";
import { editProductAction } from "../actions/editProductActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EditProductForm = ({ categories, product }) => {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product.name || "",
      description: product.description || "",
      product_img: [], // Images need special handling
      categoryId: product.categoryId || "",
      is_available: product.is_available || false,
      is_featured: product.is_featured || false,
      is_newArrival: product.is_newArrival || false,
      is_bestSeller: product.is_bestSeller || false,
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("is_available", Boolean(data.is_available));
    formData.append("is_bestSeller", Boolean(data.is_bestSeller));
    formData.append("is_featured", Boolean(data.is_featured));
    formData.append("is_newArrival", Boolean(data.is_newArrival));

    if (Array.isArray(data.product_img)) {
      data.product_img.forEach((file) => {
        formData.append("product_img", file);
      });
    }

    // Proceed with the action or API call
    startTransition(async () => {
      const response = await editProductAction(formData, product.id);

      if (!response?.success) {
        setErrors(response?.error);
        console.log(response?.error);
        toast.error(response?.error || "Failed to update product");
      } else {
        toast.success(
          response?.message || "Product has been updated successfully"
        );
        router.push("/admin/product");
      }
    });
  };
  const handleDelete = (image) => {
    startTransition(async () => {
      await deleteProductImage(image);
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input placeholder="add product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="add product description"
                  {...field}
                  //   {...moreFields}
                  //   value={value || product.description}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image) => (
              <div className="relative  my-5" key={image.id}>
                <Image src={image.url} width={"400"} height={200} alt="" />
                <AlertDialog>
                  <AlertDialogTrigger>
                    <XIcon className="absolute top-2 right-2 cursor-pointer bg-white rounded-full text-red-500" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your image and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(image)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
          <FormField
            control={form.control}
            name="product_img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files) || [];
                      field.onChange(selectedFiles);
                    }}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Category Select */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={product.categoryId}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category.id} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage categories in the{" "}
                <Link href="/admin/category/add-category">category page</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Checkbox Fields */}
        <div className="grid grid-cols-2 gap-10">
          <FormField
            control={form.control}
            name="is_available"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>available</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-10">
          <FormField
            control={form.control}
            name="is_bestSeller"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>best seller</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_newArrival"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>new arrival</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">
          {isPending ? "Updating....." : "Update Product"}
        </Button>
      </form>
    </Form>
  );
};

export default EditProductForm;
