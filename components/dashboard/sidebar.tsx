"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ items }: { items: any[] }) {
  const path = usePathname();

  return (
    <div className="w-64 min-h-screen border-r p-6 space-y-4">
      <h2 className="text-xl font-bold">Dashboard</h2>

      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block p-2 rounded-lg ${
            path === item.href ? "bg-primary text-white" : "hover:bg-muted"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
