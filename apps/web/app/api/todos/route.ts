import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await db.query.todos.findMany({
    orderBy: (todos) => [todos.createdAt],
  });

  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const todo = await db.insert(schema.todos).values(body).returning();
  return NextResponse.json(todo);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const todo = await db
    .update(schema.todos)
    .set({ value: body.value })
    .where(eq(schema.todos.id, body.id));
  return NextResponse.json(todo);
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const todo = await db
    .delete(schema.todos)
    .where(eq(schema.todos.id, body.id))
    .returning();
  return NextResponse.json(todo);
}
