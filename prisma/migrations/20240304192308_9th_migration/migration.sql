/*
  Warnings:

  - You are about to drop the column `name` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "name",
ADD COLUMN     "gname" TEXT;
