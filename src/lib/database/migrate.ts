import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

require("dotenv").config({
  path: ".env.local",
});

const pushMigration = async () => {
  const migrationClient = postgres(process.env.DATABASE_URL!, {
    max: 1,
  });

  const migrationDB = drizzle(migrationClient);

  await migrate(migrationDB, {
    migrationsFolder: "./supabase/migrations",
  });

  await migrationClient.end();
};

pushMigration();
