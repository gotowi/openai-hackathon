"use client";

import { ToDoListItem } from "@/components/todo-list-item";
import { useTodosQuery } from "@/app/dashboard/queries";
import { useWebSocketContext } from "@/contexts/websocket-context";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

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

  const queryClient = useQueryClient();
  const { sendMessage, subscribe, unsubscribe } = useWebSocketContext();

  useEffect(() => {
    const subscriberId = subscribe((data: any) => {
      console.log(data);

      if (data.type === "update") {
        queryClient.setQueryData<Task[]>(["todos"], (old: Task[]) => {
          const newTask = {
            ...data.todo,
          };

          return old.map((t) => (t.id === data.task.id ? newTask : t));
        });
      }
    });

    return () => {
      unsubscribe(subscriberId);
    };
  }, []);

  return (
    <div className="flex flex-1 w-3xl mx-auto flex-col gap-4 px-4 pb-20">
      {query.data?.map((task) => (
        <ToDoListItem task={task} key={task.id} />
      ))}
    </div>
  );
}
