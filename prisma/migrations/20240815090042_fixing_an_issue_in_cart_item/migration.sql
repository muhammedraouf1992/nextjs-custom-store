/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productVariationId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CartItem_cartId_productVariationId_key` ON `CartItem`(`cartId`, `productVariationId`);
