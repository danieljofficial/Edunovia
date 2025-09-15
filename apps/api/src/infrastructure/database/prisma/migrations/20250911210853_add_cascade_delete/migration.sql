-- DropForeignKey
ALTER TABLE "public"."academic_terms" DROP CONSTRAINT "academic_terms_sessionId_fkey";

-- AddForeignKey
ALTER TABLE "public"."academic_terms" ADD CONSTRAINT "academic_terms_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."academic_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
