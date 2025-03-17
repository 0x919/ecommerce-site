-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('UNPAYED', 'PAYED', 'DELIVERED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'UNPAYED';
