import { AiTaskSidebar } from "@/components/ai-task-sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import { ToDoList } from "@/components/todo-list";
import { ToDoListSubbar } from "@/components/todo-list-subbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider defaultOpen={false}>
      <SidebarInset className="max-h-screen">
        <header className="flex h-14 z-10 shrink-0 absolute left-0 right-0 top-0 items-center gap-2 backdrop-blur-sm bg-white/50">
          <div className="flex flex-1 items-center gap-2 px-3">
            {/* <SidebarTrigger /> */}
            {/* <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            /> */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Your To-Do List
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>

        <div className="flex flex-1 flex-col-reverse gap-4 px-4 pb-6 pt-20 overflow-auto">
          <ToDoListSubbar />
          <ToDoList />
        </div>
      </SidebarInset>

      <AiTaskSidebar side="right" />
    </SidebarProvider>
  );
}
