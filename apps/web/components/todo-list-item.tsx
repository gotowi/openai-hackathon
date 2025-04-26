"use client";

import {
  useDeleteToDoMutation,
  useUpdateToDoMutation,
} from "@/app/dashboard/mutations";
import { AiMissingContext } from "@/components/ai-missing-context";
import { AiTaskDone } from "@/components/ai-task-done";
import { AiThoughtProcess } from "@/components/ai-thought-process";
import { Task } from "@/components/todo-list";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export function ToDoListItem({ task }: { task: Task }) {
  const queryClient = useQueryClient();

  const updateToDoMutation = useUpdateToDoMutation();
  const deleteToDoMutation = useDeleteToDoMutation();

  const debouncedUpdateToDoMutate = useDebouncedCallback(
    updateToDoMutation.mutate,
    2000
  );

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
        <div
          className={clsx(
            "w-4 h-4 rounded-full flex items-center justify-center",
            task.status === "done"
              ? "bg-gradient-to-br from-cyan-500 to-blue-500"
              : "bg-white"
          )}
        >
          <Check strokeWidth={4} className="w-3 h-3 text-white" />
        </div>
      </div>

      <div className="flex flex-col grow gap-2 items-start">
        <div
          contentEditable="plaintext-only"
          suppressContentEditableWarning
          className={clsx(
            "outline-0 w-full",
            task.status === "analyzing" &&
              "bg-gradient-to-r from-black from-30% via-blue-500 to-70% to-black text-transparent bg-[length:200%] bg-clip-text animate-text-gradient"
          )}
          onInput={(event) => {
            if ((event.target as HTMLDivElement).textContent?.length === 0) {
              deleteToDoMutation.mutate(task.id);
              debouncedUpdateToDoMutate.cancel();
            } else {
              debouncedUpdateToDoMutate({
                id: task.id,
                value: (event.target as HTMLDivElement).innerText,
              });
            }
          }}
          onBlur={() => {
            debouncedUpdateToDoMutate.flush();
          }}
        >
          {task.value}
        </div>

        {task.status === "preparing" && (
          <AiThoughtProcess
            labels={[
              "AI is preparing",
              "AI is getting ready",
              "AI is thinking",
              "AI is analyzing",
            ]}
          />
        )}

        {task.status === "executing" && (
          <AiThoughtProcess
            labels={[
              "AI is executing",
              "AI is working on it",
              "AI is doing the task",
              "AI is on it!",
            ]}
            executing
          />
        )}

        {task.status === "missing_context" && <AiMissingContext task={task} />}
        {task.status === "done" && <AiTaskDone task={task} />}
      </div>
    </div>
  );
}
