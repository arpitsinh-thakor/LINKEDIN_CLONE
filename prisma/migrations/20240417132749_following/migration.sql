/*
  Warnings:

  - You are about to drop the `Followers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[followerId,followingId]` on the table `Following` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followingId` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Followers" DROP CONSTRAINT "Followers_followingId_fkey";

-- AlterTable
ALTER TABLE "Following" ADD COLUMN     "followingId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Followers";

-- CreateIndex
CREATE UNIQUE INDEX "Following_followerId_followingId_key" ON "Following"("followerId", "followingId");

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
