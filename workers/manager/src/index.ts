import { Hono } from "hono";
import { env } from "cloudflare:workers";

const app = new Hono<{ Bindings: Env }>();

import { drizzle } from "drizzle-orm/neon-http";
import { schema } from "@openai-hackathon/db";
import { eq } from "drizzle-orm";

const db = drizzle(env.DATABASE_URL, { schema });

app.get("/update-todo", async (c) => {
  const todoId = c.req.query("todoId");
  const status = c.req.query("status") as
    | "new"
    | "analyzed"
    | "prepared"
    | "executed"
    | "failed";

  if (!todoId || !status) {
    return c.json({ error: "todoId and status are required" }, 400);
  }

  const result = await db
    .update(schema.todos)
    .set({ status })
    .where(eq(schema.todos.id, +todoId));

  let id = c.env.WEBSOCKET_SERVER.idFromName("test");
  let stub = c.env.WEBSOCKET_SERVER.get(id);

  await stub.broadcast({ todoId, status });

  return c.json(result);
});

app.get("/websocket", async (c) => {
  const upgradeHeader = c.req.header("Upgrade");
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return c.text("Durable Object expected Upgrade: websocket", 426);
  }

  let id = c.env.WEBSOCKET_SERVER.idFromName("test");
  let stub = c.env.WEBSOCKET_SERVER.get(id);

  return stub.fetch(c.req.raw);
});

export { WebSocketServer } from "./durable-objects/websocket-server";

export default {
  fetch: app.fetch,
} satisfies ExportedHandler<Env>;
