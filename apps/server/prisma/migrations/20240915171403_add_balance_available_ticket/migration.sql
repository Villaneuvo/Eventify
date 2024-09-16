/*
  Warnings:

  - Added the required column `availableTicket` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` ADD COLUMN `availableTicket` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `balance` DOUBLE NOT NULL DEFAULT 0.0;
