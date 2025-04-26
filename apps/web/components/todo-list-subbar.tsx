"use client";

import { Task } from "@/components/todo-list";
import { useSidebar } from "@/components/ui/sidebar";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "motion/react";
import { useCreateToDoMutation } from "@/app/dashboard/mutations";

export function ToDoListSubbar() {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const sidebar = useSidebar();

  const createToDoMutation = useCreateToDoMutation();

  return (
    <motion.div
      className="flex fixed justify-center bottom-6 w-3xl left-1/2 -translate-x-1/2 bg-background focus-within:outline-2 outline-cyan-500/30 rounded-full z-[100]"
      animate={
        sidebar.open
          ? {
              right: "-14rem",
              left: "unset",
              width: "32rem",
            }
          : {}
      }
    >
      <div className="items-center bg-gradient-to-br from-cyan-500 to-blue-500 p-1 w-full rounded-full">
        <div className="items-center gap-2 px-4 py-2 bg-white/95 rounded-full">
          <input
            value={value}
            autoFocus
            onChange={(event) => setValue(event.target.value)}
            className="w-full h-full outline-0"
            placeholder={
              sidebar.open
                ? "Ask about this task..."
                : "Your next task goes here.."
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();

                const newTask = {
                  ...(value.trim() === ""
                    ? {
                        value: [
                          "Write a follow-up email to Emily",
                          "Pay yearly taxes",
                          "Book a flight to New York",
                          "Get a haircut",
                          "Buy groceries",
                          "Go to the gym",
                          "Read a book",
                          "Finish the project report",
                          "Call mom",
                          "Plan a weekend trip",
                          "Organize the closet",
                          "Clean the house",
                          "Prepare for the presentation",
                          "Schedule a dentist appointment",
                          "Take the dog for a walk",
                          "Watch a movie",
                          "Learn a new recipe",
                          "Practice coding",
                          "Attend a workshop",
                          "Visit a museum",
                        ][Math.floor(Math.random() * 10)],
                      }
                    : {
                        value: value,
                      }),
                };

                createToDoMutation.mutate(newTask);

                setValue("");
              }
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
