"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  label: string;
  href: string;
  icon?: any;
}

export default function Sidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();
  return (
    <aside className="w-64 mt-4 border-r border-border min-h-screen p-4">
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                pathname === item.href
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-muted"
              }`}
            >
              {Icon && <Icon size={18} />}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
