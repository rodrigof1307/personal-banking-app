-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_senderID_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "senderID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "UserAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
