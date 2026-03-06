"use client";

import Sidebar from "@/components/dashboard/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    { label: "Analytics", href: "/admin/analytics" },
    { label: "Organizers", href: "/admin/organizers" },
    { label: "Attendees", href: "/admin/attendees" },
    { label: "Categories", href: "/admin/categories" },
    { label: "Venues", href: "/admin/venues" },
    { label: "Events", href: "/admin/events" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar items={menu} />

      {/* Page Content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
