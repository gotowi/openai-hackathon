"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AiTaskSubbar } from "@/components/ai-task-subbar";

export function AiTaskSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarContent className="flex flex-col">
        <div className="flex flex-col p-5 gap-3 flex-1 rounded-lg bg-white">
          Review AI Agent actions before continuing
          <div className="p-3 rounded-lg text-sm bg-gray-100 border border-border">
            Hey Emily, I just wanted to follow up on our last conversation. I
            hope everything is going well on your end. If you have any updates
            or questions, feel free to reach out. Looking forward to hearing
            from you!
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
