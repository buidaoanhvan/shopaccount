-- CreateTable
CREATE TABLE `Service` (
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

-- CreateTable
CREATE TABLE `ServicePricing` (
    `id` VARCHAR(191) NOT NULL,
    `service_id` VARCHAR(191) NOT NULL,
    `option_name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `duration` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'show',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
