/*
  Warnings:

  - You are about to drop the column `occupation` on the `UserAccount` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `UserAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAccount" DROP COLUMN "occupation",
DROP COLUMN "phone";
