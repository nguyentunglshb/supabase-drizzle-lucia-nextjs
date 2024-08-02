CREATE TABLE IF NOT EXISTS "task" (
	"id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text,
	"data" text,
	"description" text,
	"owner_id" text,
	"progress" "task_progress" DEFAULT 'pending' NOT NULL,
	"priority" "task_priority" DEFAULT 'low' NOT NULL,
	"estimated_time" bigint DEFAULT 3600 NOT NULL,
	"spent_time" bigint DEFAULT 0 NOT NULL,
	"percent" integer DEFAULT 0 NOT NULL
);
