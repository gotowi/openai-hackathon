"use client";

import { Task } from "@/components/todo-list";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function ToDoListSubbar() {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");

  return (
    <div className="flex sticky justify-center bottom-6 w-3xl mx-auto bg-background focus-within:outline-2 outline-cyan-500/30 rounded-full">
      <div className="items-center bg-gradient-to-br from-cyan-500 to-blue-500 p-1 w-full rounded-full">
        <div className="items-center gap-2 px-4 py-2 bg-white/95 rounded-full">
          <input
            value={value}
            autoFocus
            onChange={(event) => setValue(event.target.value)}
            className="w-full h-full outline-0"
            placeholder="Your next task goes here.."
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();

                queryClient.setQueryData(["todos"], (old: Task[]) => {
                  const newTask = {
                    id: String(Date.now()),
                    ...(value.trim() === ""
                      ? {
                          content: [
                            "Write a follow-up email to Emily",
                            "Pay yearly taxes",
                            "Book a flight to New York",
                            "Get a haircut",
                            "Buy groceries",
                            "Go to the gym",
                            "Read a book",
                            "Finish the project report",
                            "Call mom",
                            "Plan a weekend trip",
                          ][Math.floor(Math.random() * 10)],
                        }
                      : {
                          content: value,
                        }),
                    completed: false,
                    isAiValidating: true,
                  };

                  return [...old, newTask];
                });

                setValue("");
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
