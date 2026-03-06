"use client";

import Sidebar from "@/components/dashboard/sidebar";

export default function AttendeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    { label: "Dashboard", href: "/attendee/dashboard" },
    { label: "Bookings", href: "/attendee/bookings" },
    { label: "Reviews", href: "/attendee/reviews" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar items={menu} />

      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
