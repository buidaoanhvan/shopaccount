/*
  Warnings:

  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Service`;

-- CreateTable
CREATE TABLE `ServiceAccount` (
    `id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `service_image` VARCHAR(191) NULL,
    `service_name` VARCHAR(191) NOT NULL,
    `service_description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
