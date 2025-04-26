import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  value: text().notNull(),
  status: text().notNull().default("new"),
  missingContext: text().array(),
  result: text(),
  completedAt: timestamp("completed_at"),
  doableByAi: boolean("doable_by_ai"),
  createdAt: timestamp("created_at").defaultNow(),
});
