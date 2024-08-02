ALTER TABLE "task" ALTER COLUMN "progress" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "progress" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "priority" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "priority" DROP NOT NULL;