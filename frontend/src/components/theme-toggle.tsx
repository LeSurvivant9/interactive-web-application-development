"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center space-x-2 scale-150 p-2">
      <div className="relative inline-flex items-center">
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          className="data-[state=checked]:bg-slate-700 cursor-pointer"
        />
        <div className="pointer-events-none absolute left-0.5 flex h-4 w-4 items-center justify-center transition-all">
          <Sun
            className={`h-3 w-2.5 text-yellow-500 transition-opacity ${isDark ? "opacity-0" : "opacity-100"}`}
          />
        </div>
        <div className="pointer-events-none absolute right-0.5 flex h-4 w-4 items-center justify-center transition-all">
          <Moon
            className={`h-3 w-2.5 text-slate-200 transition-opacity ${isDark ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>
    </div>
  );
}
