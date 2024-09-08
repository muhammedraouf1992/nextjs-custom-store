import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import prisma from "@/prismaClient";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteCategory from "./DeleteCategory";
import { Button } from "@/components/ui/button";

const CategoryTable = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      {categories.length > 0 ? (
        <Table>
          <TableCaption>A list of categories</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell capitalize">
                Id
              </TableHead>
              <TableHead className="">name</TableHead>
              <TableHead className="hidden md:table-cell">
                description
              </TableHead>
              <TableHead className="hidden md:table-cell">image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium capitalize hidden md:table-cell">
                  {category.id}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {category.name}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {category.description}
                </TableCell>

                <TableCell className="text-right hidden md:table-cell">
                  <Image
                    src={category.imgUrl}
                    height={100}
                    width={100}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-10 items-center flex-col lg:flex-row">
                    <Button asChild variant="outline">
                      <Link
                        href={`/admin/category/edit-category/${category.id}`}
                      >
                        Edit Category
                      </Link>
                    </Button>
                    <DeleteCategory categoryId={category.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="uppercase text-center mt-20">
          there are no categories to show
        </p>
      )}
    </>
  );
};

export default CategoryTable;
