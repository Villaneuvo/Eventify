/*
  Warnings:

  - Made the column `code` on table `Promotion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Promotion` MODIFY `code` VARCHAR(191) NOT NULL;
