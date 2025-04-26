import { Task } from "@/components/todo-list";
import { useQuery } from "@tanstack/react-query";

export function useTodosQuery() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      return fetch("/api/todos").then((res) => res.json()) as Promise<Task[]>;
    },
  });
}
