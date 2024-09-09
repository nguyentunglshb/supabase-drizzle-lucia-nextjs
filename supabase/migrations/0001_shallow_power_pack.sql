CREATE TABLE IF NOT EXISTS "users_in_project" (
	"user_id" text NOT NULL,
	"id" uuid NOT NULL,
	CONSTRAINT "users_in_project_user_id_id_pk" PRIMARY KEY("user_id","id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_in_project" ADD CONSTRAINT "users_in_project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_in_project" ADD CONSTRAINT "users_in_project_id_project_id_fk" FOREIGN KEY ("id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
