import { sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  varchar,
  timestamp,
  uuid,
  primaryKey,
  pgEnum,
  integer,
  bigint,
} from 'drizzle-orm/pg-core';

export const taskProgressEnum = pgEnum('progress', ['pending', 'inprogress', 'done']);
export const taskPriorityEnum = pgEnum('priority', ['low', 'medium', 'high', 'urgent']);

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
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  name: text('name'),
  data: text('data'),
  description: text('description'),
  ownerId: text('owner_id')
    .notNull()
    .references(() => user.id),
});

export const task = pgTable('task', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  name: text('name'),
  data: text('data'),
  description: text('description'),
  ownerId: text('owner_id'),
  projectId: uuid('id'),
  progress: taskProgressEnum('progress').notNull().default('pending'),
  priority: taskPriorityEnum('priority').notNull().default('low'),
  estimatedTime: bigint('estimated_time', { mode: 'number' }).notNull().default(3600),
  spentTime: bigint('spent_time', { mode: 'number' }).notNull().default(0),
  percent: integer('percent').notNull().default(0),
});

export const usersInProject = pgTable(
  'users_in_project',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    projectId: uuid('id')
      .notNull()
      .references(() => project.id),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.userId, t.projectId],
    }),
  })
);

export const message = pgTable('message', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  text: text('text'),
  x: integer('x').notNull(),
  y: integer('y').notNull(),
  author: text('author').notNull(),
  color: text('color').notNull().default('white'),
});

// export const userRelations = relations(user, ({ one, many }) => ({
//   owner: one(user, {
//     fields: [project.ownerId],
//     references: [user.id],
//   }),
//   usersInProjects: many(usersInProject),
//   task: many(task),
// }));

// export const projectRelations = relations(project, ({ many }) => ({
//   usersInProject: many(usersInProject),
// }));

// export const usersInProjectRelations = relations(usersInProject, ({ one, many }) => ({
//   project: one(project, {
//     fields: [usersInProject.projectId],
//     references: [project.id],
//   }),
//   user: one(user, {
//     fields: [usersInProject.userId],
//     references: [user.id],
//   }),
//   task: many(task),
// }));

// export const taskRelations = relations(task, ({ one }) => ({
//   owner: one(usersInProject, {
//     fields: [task.ownerId],
//     references: [usersInProject.userId],
//   }),
//   project: one(project, {
//     fields: [task.projectId],
//     references: [project.id],
//   }),
// }));
