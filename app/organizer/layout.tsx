"use client";

import Sidebar from "@/components/dashboard/sidebar";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    { label: "Analytics", href: "/organizer/analytics" },
    { label: "Events", href: "/organizer/events" },
    { label: "Reviews", href: "/organizer/reviews" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar items={menu} />

      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
