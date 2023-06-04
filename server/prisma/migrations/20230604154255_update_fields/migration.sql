/*
  Warnings:

  - You are about to drop the column `recipientIban` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recipientId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userAccountId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `senderID` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userAccountId_fkey";

-- DropIndex
DROP INDEX "Transaction_userAccountId_idx";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "recipientIban",
DROP COLUMN "recipientId",
DROP COLUMN "userAccountId",
ADD COLUMN     "receiverIBAN" TEXT,
ADD COLUMN     "receiverID" INTEGER,
ADD COLUMN     "senderID" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Transaction_senderID_idx" ON "Transaction"("senderID");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiverID_fkey" FOREIGN KEY ("receiverID") REFERENCES "UserAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
