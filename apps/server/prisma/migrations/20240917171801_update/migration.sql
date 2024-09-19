/*
  Warnings:

  - You are about to drop the column `promotionId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_promotionId_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `promotionId`,
    ADD COLUMN `promotionCode` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_promotionCode_fkey` FOREIGN KEY (`promotionCode`) REFERENCES `Promotion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
