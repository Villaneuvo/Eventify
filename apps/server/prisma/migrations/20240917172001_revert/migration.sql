/*
  Warnings:

  - You are about to drop the column `promotionCode` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_promotionCode_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `promotionCode`,
    ADD COLUMN `promotionId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
