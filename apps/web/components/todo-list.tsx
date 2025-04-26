"use client";

import { ToDoListItem } from "@/components/todo-list-item";
import { useTodosQuery } from "@/app/dashboard/queries";

export type Task = {
  id: number;
  value: string;
  status: string;
  completedAt?: string;
  doableByAi?: boolean;
  createdAt: string;
};

export function ToDoList() {
  const query = useTodosQuery();

  return (
    <div className="flex flex-1 w-3xl mx-auto flex-col gap-4 px-4 pb-20">
      {query.data?.map((task) => (
        <ToDoListItem task={task} key={task.id} />
      ))}
    </div>
  );
}
