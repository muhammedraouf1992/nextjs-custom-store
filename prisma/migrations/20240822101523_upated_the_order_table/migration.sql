/*
  Warnings:

  - You are about to drop the column `shippingAddress` on the `order` table. All the data in the column will be lost.
  - Added the required column `apartment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `building` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `shippingAddress`,
    ADD COLUMN `apartment` VARCHAR(191) NOT NULL,
    ADD COLUMN `building` VARCHAR(191) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `floor` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `postal_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL;
