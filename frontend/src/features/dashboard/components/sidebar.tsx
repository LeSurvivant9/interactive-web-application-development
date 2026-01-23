import { LayoutDashboard, Settings, User } from "lucide-react";
import Link from "next/link";
import { GlobalSearch } from "@/components/global-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Vue d'ensemble",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Profil",
    icon: User,
    href: "/profile",
    color: "text-violet-500",
  },
  {
    label: "Paramètres",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
];

export function Sidebar() {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="px-3 py-2 flex-1 flex flex-col">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">MediaTracker</h1>
        </Link>
        <div className="space-y-1 flex-1">
          <GlobalSearch />
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition"
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-auto pb-4 flex justify-center w-full">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
