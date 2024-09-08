/*
  Warnings:

  - You are about to drop the column `name` on the `productvariation` table. All the data in the column will be lost.
  - Added the required column `colorId` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeId` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` ADD COLUMN `productVariationId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `is_bestSeller` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `is_featured` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `is_newArrival` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `is_available` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `productvariation` DROP COLUMN `name`,
    ADD COLUMN `colorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `sizeId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Size` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Color` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductVariation` ADD CONSTRAINT `ProductVariation_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `Size`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariation` ADD CONSTRAINT `ProductVariation_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_productVariationId_fkey` FOREIGN KEY (`productVariationId`) REFERENCES `ProductVariation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
