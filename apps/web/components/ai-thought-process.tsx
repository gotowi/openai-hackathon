import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import { LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";

export function AiThoughtProcess({ labels }: { labels: string[] }) {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(false);
  const sidebar = useSidebar();

  useEffect(() => {
    if (active < labels.length) {
      setTimeout(() => {
        setActive((prev) => prev + 1);
      }, 1000);
    } else {
      setDone(true);
    }
  }, [active]);

  return (
    <div className="flex gap-2">
      <div
        className={clsx(
          "flex flex-wrap gap-1.5 py-0.5 items-center rounded-full",
          done ? "text-gray-800" : "text-gray-400"
        )}
      >
        <LoaderPinwheel
          className={clsx("w-4 h-4", done ? "" : "animate-spin")}
        />

        <span className={clsx("inline-flex text-xs font-medium")}>
          {done ? "Action required:" : labels[active]}
        </span>
      </div>

      {done && (
        <button
          onClick={() => sidebar.setOpen(true)}
          className="text-xs cursor-pointer text-blue-500 bg-blue-100 px-1.5 rounded-sm py-0.5 font-medium hover:bg-blue-200 transition-colors duration-200 ease-in-out"
        >
          Review email draft
        </button>
      )}
    </div>
  );
}
