/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `pointsEarned` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `pointsRedeemed` on the `Referral` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Referral` DROP COLUMN `expiresAt`,
    DROP COLUMN `pointsEarned`,
    DROP COLUMN `pointsRedeemed`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `pointsEarned` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pointsExpiry` DATETIME(3) NULL,
    ADD COLUMN `pointsRedeemed` INTEGER NOT NULL DEFAULT 0;
