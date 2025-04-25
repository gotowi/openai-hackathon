"use client";

import { ToDoListItem } from "@/components/todo-list-item";
import { useQuery } from "@tanstack/react-query";

export type Task = {
  id: string;
  content: string;
  completed: boolean;
  isAiValidating?: boolean;

  doableByAi?: boolean;
};

export function ToDoList() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      return new Promise<Task[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: "1",
              content: "Write a follow-up email to Emily",
              completed: false,
              doableByAi: true,
            },
          ]);
        }, 0);
      });
    },
  });

  return (
    <div className="flex flex-1 w-3xl mx-auto flex-col gap-4 px-4 pb-10">
      {query.data?.map((task) => (
        <ToDoListItem task={task} key={task.id} />
      ))}
    </div>
  );
}
