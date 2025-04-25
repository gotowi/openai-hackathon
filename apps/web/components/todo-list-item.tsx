"use client";

import { Task } from "@/components/todo-list";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect } from "react";

export function ToDoListItem({ task }: { task: Task }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (task.isAiValidating) {
      setTimeout(() => {
        queryClient.setQueryData(["todos"], (old: Task[]) => {
          const newTask = {
            ...task,
            isAiValidating: false,
            doableByAi: Math.random() > 0.5,
          };

          return old.map((t) => (t.id === task.id ? newTask : t));
        });
      }, 3000);
    }
  }, [task]);

  return (
    <div className="flex gap-2">
      <div
        tabIndex={0}
        className={clsx(
          "w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center rounded-full text-white",
          task.doableByAi
            ? "bg-gradient-to-br from-cyan-500 to-blue-500"
            : "bg-gray-400"
        )}
      >
        <div className="w-4 h-4 rounded-full bg-white"></div>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <div
          contentEditable
          suppressContentEditableWarning
          className={clsx(
            "outline-0",
            task.isAiValidating &&
              "bg-gradient-to-r from-black from-30% via-blue-500 to-70% to-black text-transparent bg-[length:200%] bg-clip-text animate-text-gradient"
          )}
        >
          {task.content}
        </div>

        {task.doableByAi && (
          <button className="text-sm font-semibold text-white cursor-pointer rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 px-2 py-0.5 bg-white/50 hover:bg-white/80 transition-all animate-fade-in">
            Do it
          </button>
        )}
      </div>
    </div>
  );
}
