"use client";

import { Task } from "@/components/todo-list";
import { useSidebar } from "@/components/ui/sidebar";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function AiTaskSubbar() {
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
            placeholder="Chat with AI agent about this task..."
          />
        </div>
      </div>
    </div>
  );
}
