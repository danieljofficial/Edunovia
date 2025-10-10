-- CreateTable
CREATE TABLE "public"."Grade" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "section" TEXT NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ClassArm" (
    "id" TEXT NOT NULL,
    "gradeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,

    CONSTRAINT "ClassArm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ClassArmToGrade" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassArmToGrade_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClassArmToGrade_B_index" ON "public"."_ClassArmToGrade"("B");

-- AddForeignKey
ALTER TABLE "public"."_ClassArmToGrade" ADD CONSTRAINT "_ClassArmToGrade_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."ClassArm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ClassArmToGrade" ADD CONSTRAINT "_ClassArmToGrade_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
