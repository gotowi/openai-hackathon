import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/neon-http";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
// TODO: figure out linking
// import { schema } from "@openai-hackathon/db";

export const schema = {
  todos: pgTable("todos", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    value: text().notNull(),
    status: text().notNull().default("new"),
    // .$type<"new" | "analyzed" | "prepared" | "executed" | "failed">(),
    // completedAt: timestamp("completed_at"),
    missingContext: text().array(),
    result: text(),
    completedAt: timestamp("completed_at"),
    doableByAi: boolean("doable_by_ai"),
    createdAt: timestamp("created_at").defaultNow(),
  }),
};

export const db = drizzle(env.DATABASE_URL, { schema });
