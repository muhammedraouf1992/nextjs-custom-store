-- AlterTable
ALTER TABLE `order` ADD COLUMN `Trnx_ID` VARCHAR(191) NULL,
    ADD COLUMN `paymentStatus` ENUM('NOTPAID', 'PAID') NOT NULL DEFAULT 'NOTPAID',
    MODIFY `apartment` VARCHAR(191) NULL,
    MODIFY `building` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `floor` VARCHAR(191) NULL,
    MODIFY `phone_number` VARCHAR(191) NULL,
    MODIFY `postal_code` VARCHAR(191) NULL,
    MODIFY `street` VARCHAR(191) NULL;
