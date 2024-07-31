import { pgTable, text, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
  username: varchar('username', { length: 256 }),
  password_hash: text('password_hash'),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const project = pgTable('project', {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }),
  name: text('name'),
  data: text("data"),
  description: text('description'),
});

export const projectRelations = relations(project, ({many}) => ({
  user: many(user)
}))