DO $$ BEGIN
 CREATE TYPE "public"."task_priority" AS ENUM('low', 'medium', 'high', 'urgent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."task_progress" AS ENUM('pending', 'inprogress', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "progress" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "progress" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "priority" SET DEFAULT 'low';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "priority" SET NOT NULL;