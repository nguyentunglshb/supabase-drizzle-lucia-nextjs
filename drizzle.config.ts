import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  schema: './src/lib/database/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    // host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    // database: 'postgres',
    // user: 'postgres.efdkccgaruywurjastaj',
    // password: 'Bapisthebest@811',
    // port: 6543,
  },
});
