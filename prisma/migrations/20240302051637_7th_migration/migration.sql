/*
  Warnings:

  - You are about to drop the column `lastMessageAt` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "lastMessageAt";

-- DropTable
DROP TABLE "Message";
