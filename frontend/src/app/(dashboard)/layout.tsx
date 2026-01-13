import { redirect } from "next/navigation";
import type React from "react";
import { auth } from "@/auth";
import { Sidebar } from "@/features/dashboard/components/sidebar";
import { UserNav } from "@/features/dashboard/components/user-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <div className="flex items-center justify-end p-4 border-b">
          <UserNav />
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
