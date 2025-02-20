/*
  Warnings:

  - Added the required column `author_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_id_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
