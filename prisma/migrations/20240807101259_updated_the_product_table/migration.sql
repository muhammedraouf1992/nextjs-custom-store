-- AlterTable
ALTER TABLE `product` ADD COLUMN `is_bestSeller` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `is_featured` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `is_newArrival` BOOLEAN NOT NULL DEFAULT true;
