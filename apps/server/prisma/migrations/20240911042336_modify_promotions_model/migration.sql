-- DropForeignKey
ALTER TABLE `Promotion` DROP FOREIGN KEY `Promotion_eventId_fkey`;

-- AlterTable
ALTER TABLE `Event` ADD COLUMN `additionalImages` JSON NOT NULL,
    ADD COLUMN `mainImage` VARCHAR(191) NOT NULL DEFAULT 'event-default.jpg';

-- AlterTable
ALTER TABLE `Promotion` ADD COLUMN `isEventSpecific` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userId` VARCHAR(191) NULL,
    MODIFY `eventId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
