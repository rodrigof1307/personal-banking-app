/*
  Warnings:

  - The values [COMPLETED] on the enum `TransactionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `firstName` on the `UserAccount` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `UserAccount` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `UserAccount` table. All the data in the column will be lost.
  - Added the required column `name` to the `UserAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `UserAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `UserAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
ALTER TABLE "Transaction" ALTER COLUMN "status" TYPE "TransactionStatus_new" USING ("status"::text::"TransactionStatus_new");
ALTER TYPE "TransactionStatus" RENAME TO "TransactionStatus_old";
ALTER TYPE "TransactionStatus_new" RENAME TO "TransactionStatus";
DROP TYPE "TransactionStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "UserAccount" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "password",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
