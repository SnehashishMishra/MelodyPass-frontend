"use client";

import Sidebar from "@/components/dashboard/sidebar";
import {
  BarChart3,
  Users,
  User,
  Tags,
  MapPin,
  CalendarDays,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Organizers", href: "/admin/organizers", icon: Users },
    { label: "Attendees", href: "/admin/attendees", icon: User },
    { label: "Categories", href: "/admin/categories", icon: Tags },
    { label: "Venues", href: "/admin/venues", icon: MapPin },
    { label: "Events", href: "/admin/events", icon: CalendarDays },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar items={menu} />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
