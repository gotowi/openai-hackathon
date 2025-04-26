import { Task } from "@/components/todo-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateToDoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: Pick<Task, "value">) => {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    },
    onMutate: async (newTask) => {
      const previousTodos = await queryClient.getQueryData<Task[]>(["todos"]);

      queryClient.setQueryData<Task[]>(["todos"], (old) => {
        return [
          ...(old || []),
          {
            ...newTask,
            id: new Date().getTime(),
            status: "new",
            createdAt: new Date().toISOString(),
          },
        ];
      });

      return { previousTodos };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["todos"]);
    },
  });
}

export function useUpdateToDoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: Pick<Task, "id" | "value">) => {
      const res = await fetch("/api/todos", {
        method: "PATCH",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    },
    onMutate: async ({ id, value }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (old: Task[]) => {
        return old.map((item) => ({
          ...(item.id === id
            ? {
                ...item,
                value,
              }
            : item),
        }));
      });

      return { previousTodos };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos as Task[]);
    },
    onSuccess: (task, { id }) => {
      // queryClient.setQueryData(["todos"], (old: Task[]) => {
      //   return old.map((item) => (item.id === id ? task : item));
      // });
    },
  });
}
