-- AlterTable
ALTER TABLE `Ticket` MODIFY `type` ENUM('GENERAL_ADMISSION', 'VIP', 'EARLY_BIRD') NOT NULL DEFAULT 'GENERAL_ADMISSION';
