import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db, schema } from "./lib/db";

const app = new Hono<{ Bindings: Env }>();

app.patch("/update/:todoId", async (c) => {
  const todoId = c.req.param("todoId");
  const body = await c.req.json();

  if (!todoId) {
    return c.json({ error: "todoId is required" }, 400);
  }

  const [todo] = await db
    .update(schema.todos)
    .set(body)
    .where(eq(schema.todos.id, +todoId))
    .returning();

  let id = c.env.WEBSOCKET_SERVER.idFromName("test");
  let stub = c.env.WEBSOCKET_SERVER.get(id);

  await stub.broadcast({ type: "update", todo });

  return c.json(todo);
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
