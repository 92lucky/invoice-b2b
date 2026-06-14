/*
  Warnings:

  - The primary key for the `AppProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `AppProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `AppProfile` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `AppProfile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `AppProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppProfile" DROP CONSTRAINT "AppProfile_pkey",
DROP COLUMN "email",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "AppProfile_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "AppProfile_userId_key" ON "AppProfile"("userId");

-- AddForeignKey
ALTER TABLE "AppProfile" ADD CONSTRAINT "AppProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
