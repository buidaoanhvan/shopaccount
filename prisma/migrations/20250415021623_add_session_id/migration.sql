/*
  Warnings:

  - Added the required column `session_id` to the `UserSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserSession` ADD COLUMN `session_id` VARCHAR(191) NOT NULL;
