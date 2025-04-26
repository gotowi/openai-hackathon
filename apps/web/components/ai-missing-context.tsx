import { Task } from "@/components/todo-list";
import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import { LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";

export function AiMissingContext({ task }: { task: Task }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <div
        className={clsx(
          "flex flex-wrap gap-1.5 py-0.5 items-center rounded-full",
          "text-gray-800"
        )}
      >
        <LoaderPinwheel className={clsx("w-4 h-4")} />

        <span className={clsx("inline-flex text-xs font-medium")}>
          We{"'"}re missing some data:
        </span>
      </div>

      {task.missingContext?.map((label, index) => (
        <span
          key={index}
          className="text-xs cursor-pointer text-blue-500 bg-blue-100 px-1.5 rounded-sm py-0.5 font-medium hover:bg-blue-200 transition-colors duration-200 ease-in-out"
        >
          {label}
        </span>
      ))}
    </div>
  );
}
