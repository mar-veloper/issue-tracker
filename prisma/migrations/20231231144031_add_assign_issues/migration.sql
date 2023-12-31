-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `assisgnedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assisgnedToUserId_fkey` FOREIGN KEY (`assisgnedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
