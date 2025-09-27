/*
  Warnings:

  - You are about to drop the `_ClassArmToGrade` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[gradeId,name]` on the table `ClassArm` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."_ClassArmToGrade" DROP CONSTRAINT "_ClassArmToGrade_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ClassArmToGrade" DROP CONSTRAINT "_ClassArmToGrade_B_fkey";

-- DropTable
DROP TABLE "public"."_ClassArmToGrade";

-- CreateIndex
CREATE UNIQUE INDEX "ClassArm_gradeId_name_key" ON "public"."ClassArm"("gradeId", "name");

-- AddForeignKey
ALTER TABLE "public"."ClassArm" ADD CONSTRAINT "ClassArm_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "public"."Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
