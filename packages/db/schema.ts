import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  value: text().notNull(),
  status: text()
    .notNull()
    .default("new")
    .$type<"new" | "analyzed" | "prepared" | "executed" | "failed">(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});
