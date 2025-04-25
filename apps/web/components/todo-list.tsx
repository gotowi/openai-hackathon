"use client";

import { ToDoListItem } from "@/components/todo-list-item";
import { useQuery } from "@tanstack/react-query";

export type Task = {
  id: string;
  content: string;
  completed: boolean;
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
            },
            { id: "2", content: "Pay yearly taxes", completed: false },
            { id: "3", content: "Book a flight to New York", completed: false },
            { id: "4", content: "Get a haircut", completed: false },
            { id: "5", content: "Buy groceries", completed: false },
            { id: "6", content: "Go to the gym", completed: false },
            { id: "7", content: "Read a book", completed: false },
            { id: "8", content: "Finish the project report", completed: false },
            { id: "9", content: "Call mom", completed: false },
            { id: "10", content: "Plan a weekend trip", completed: false },
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
