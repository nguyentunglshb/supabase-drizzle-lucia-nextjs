CREATE TABLE IF NOT EXISTS "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone,
	"name" text,
	"data" text,
	"logo" text,
	"description" text
);
