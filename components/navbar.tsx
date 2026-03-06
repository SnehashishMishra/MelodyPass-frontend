"use client";

import Link from "next/link";
import { Music } from "lucide-react";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/context/auth-context";
import { Button } from "./ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/70 border-b border-border"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Music className="text-primary" />

          <span className="neon-text">MelodyPass</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/events">Events</Link>

          {/* Admin */}

          {user?.role === "admin" && <Link href="/admin/analytics">Admin</Link>}

          {/* Organizer */}

          {user?.role === "organizer" && (
            <Link href="/organizer/analytics">Organizer</Link>
          )}

          {/* Attendee */}

          {user?.role === "attendee" && (
            <Link href="/attendee/dashboard">My Dashboard</Link>
          )}

          {/* Login / Logout */}

          {user ? (
            <Button
              variant="secondary"
              className="cursor-pointer hover:text-foreground/50 hover:bg-transparent"
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <Link href="/auth/login">Login</Link>
          )}

          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
