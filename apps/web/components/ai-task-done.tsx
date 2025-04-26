import { Task } from "@/components/todo-list";
import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import { LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";

export function AiTaskDone({ task }: { task: Task }) {
  const sidebar = useSidebar();
  return (
    <div className="flex gap-2 flex-wrap">
      <div
        className={clsx(
          "flex flex-wrap gap-1.5 py-0.5 items-center rounded-full",
          "text-green-600"
        )}
      >
        <LoaderPinwheel className={clsx("w-4 h-4")} />

        <span className={clsx("inline-flex text-xs font-medium")}>
          We{"'"}ve completed the task
        </span>
      </div>

      <button
        onClick={() => {
          sidebar.setActiveTask(task);
          sidebar.setOpen(true);
        }}
        className="text-xs cursor-pointer text-green-500 bg-green-100 px-1.5 rounded-sm py-0.5 font-medium hover:bg-green-200 transition-colors duration-200 ease-in-out"
      >
        Check results
      </button>
    </div>
  );
}
