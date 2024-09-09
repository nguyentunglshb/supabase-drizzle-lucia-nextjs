DO $$ BEGIN
 CREATE TYPE "public"."priority" AS ENUM('low', 'medium', 'high', 'urgent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."progress" AS ENUM('pending', 'inprogress', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text,
	"data" text,
	"description" text,
	"owner_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text,
	"data" text,
	"description" text,
	"owner_id" text,
	"progress" "progress" DEFAULT 'pending' NOT NULL,
	"priority" "priority" DEFAULT 'low' NOT NULL,
	"estimated_time" bigint DEFAULT 3600 NOT NULL,
	"spent_time" bigint DEFAULT 0 NOT NULL,
	"percent" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text,
	"phone" varchar(256),
	"username" varchar(256),
	"password_hash" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
