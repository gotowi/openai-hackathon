"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Markdown from "react-markdown";

export function AiTaskSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebar();

  const task = sidebar.activeTask;

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarContent className="flex flex-col">
        <div className="flex flex-col p-5 gap-3 flex-1 rounded-lg bg-white">
          {task?.value}
          <div className="p-3 rounded-lg text-sm bg-gray-100 border border-border flex flex-col gap-2">
            <Markdown>{task?.result}</Markdown>
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
