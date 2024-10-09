/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,name]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SubCategory_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_categoryId_name_key" ON "SubCategory"("categoryId", "name");
