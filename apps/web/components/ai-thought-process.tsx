import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import { LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";

export function AiThoughtProcess({
  labels,
  executing,
}: {
  labels: string[];
  execeting?: boolean;
}) {
  const [active, setActive] = useState(0);
  const sidebar = useSidebar();

  useEffect(() => {
    setTimeout(() => {
      setActive((prev) => (prev + 1) % labels.length);
    }, 2000);
  }, [active]);

  return (
    <div className="flex gap-2">
      <div
        className={clsx(
          "flex flex-wrap gap-1.5 py-0.5 items-center rounded-full",
          executing ? "text-blue-400" : "text-gray-400"
        )}
      >
        <LoaderPinwheel className={clsx("w-4 h-4", "animate-spin")} />

        <span className={clsx("inline-flex text-xs font-medium")}>
          {labels[active]}
        </span>
      </div>
    </div>
  );
}
