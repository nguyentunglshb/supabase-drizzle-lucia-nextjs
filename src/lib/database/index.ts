import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

const client = postgres(connectionString!, { prepare: false });
const db = drizzle(client, {
  schema,
});

export { db };
