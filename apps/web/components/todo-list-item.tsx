"use client";

import { useUpdateToDoMutation } from "@/app/dashboard/mutations";
import { AiThoughtProcess } from "@/components/ai-thought-process";
import { Task } from "@/components/todo-list";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export function ToDoListItem({ task }: { task: Task }) {
  const queryClient = useQueryClient();

  const updateToDoMutation = useUpdateToDoMutation();

  const debouncedUpdateToDoMutate = useDebouncedCallback(
    updateToDoMutation.mutate,
    5000
  );

  useEffect(() => {
    if (task.status === "new") {
      setTimeout(() => {
        queryClient.setQueryData(["todos"], (old: Task[]) => {
          const newTask = {
            ...task,
            status: "analyzed",
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

      <div className="flex flex-col grow gap-2 items-start">
        <div
          contentEditable="plaintext-only"
          suppressContentEditableWarning
          className={clsx(
            "outline-0 w-full",
            task.status === "new" &&
              "bg-gradient-to-r from-black from-30% via-blue-500 to-70% to-black text-transparent bg-[length:200%] bg-clip-text animate-text-gradient"
          )}
          onInput={(event) => {
            debouncedUpdateToDoMutate({
              id: task.id,
              value: (event.target as HTMLDivElement).innerText,
            });
          }}
          onBlur={() => {
            debouncedUpdateToDoMutate.flush();
          }}
        >
          {task.value}
        </div>

        {task.doableByAi && (
          <AiThoughtProcess
            labels={[
              "Validating with AI",
              "Checking if it's doable",
              "AI is on it!",
              "AI is thinking...",
            ]}
          />
        )}
      </div>
    </div>
  );
}
