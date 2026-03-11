"use client";

import Sidebar from "@/components/dashboard/sidebar";
import { LayoutDashboard, BookOpen, Star, Ticket } from "lucide-react";

export default function AttendeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    { label: "Dashboard", href: "/attendee/dashboard", icon: LayoutDashboard },
    { label: "Bookings", href: "/attendee/bookings", icon: BookOpen },
    { label: "Reviews", href: "/attendee/reviews", icon: Star },
    { label: "Tickets", href: "/attendee/tickets", icon: Ticket },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar items={menu} />

      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
