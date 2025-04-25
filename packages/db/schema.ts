import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  value: text().notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});
