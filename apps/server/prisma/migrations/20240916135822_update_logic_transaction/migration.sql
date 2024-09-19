/*
  Warnings:

  - You are about to drop the column `ticketId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_ticketId_fkey`;

-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `transactionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `ticketId`;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
