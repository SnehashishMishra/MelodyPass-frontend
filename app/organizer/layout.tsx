"use client";

import Sidebar from "@/components/dashboard/sidebar";
import { BarChart3, CalendarDays, Star } from "lucide-react";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    { label: "Analytics", href: "/organizer/analytics", icon: BarChart3 },
    { label: "Events", href: "/organizer/events", icon: CalendarDays },
    { label: "Reviews", href: "/organizer/reviews", icon: Star },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar items={menu} />

      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
