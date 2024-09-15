-- AlterTable
ALTER TABLE `User` ADD COLUMN `referralId` VARCHAR(191) NULL,
    ADD COLUMN `usedReferralCode` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_referralId_fkey` FOREIGN KEY (`referralId`) REFERENCES `Referral`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
