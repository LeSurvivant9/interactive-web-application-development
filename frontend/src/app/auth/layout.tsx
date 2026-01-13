import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-6 right-8 z-50">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
