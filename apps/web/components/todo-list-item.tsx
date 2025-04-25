import { Task } from "@/components/todo-list";

export function ToDoListItem({ task }: { task: Task }) {
  return (
    <div className="flex gap-2">
      <div className="w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center rounded-full border-cyan-500 border-2 text-white"></div>

      <div
        contentEditable
        suppressContentEditableWarning
        className="flex-1 outline-0"
      >
        {task.content}
      </div>
    </div>
  );
}
