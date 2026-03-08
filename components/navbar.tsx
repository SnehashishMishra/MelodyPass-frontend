"use client";

import Link from "next/link";
import { Music, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/context/auth-context";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const navClass =
    pathname === "/"
      ? "fixed top-0 w-full z-50 backdrop-blur-lg border-none"
      : "fixed top-0 w-full z-50 backdrop-blur-md bg-background/70 border-b border-border";

  // Disable scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={navClass}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Music className="text-primary" />
            <span className="neon-text">MelodyPass</span>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-6">
            <Link href="/events">Events</Link>

            {user?.role === "admin" && (
              <Link href="/admin/analytics">Admin</Link>
            )}

            {user?.role === "organizer" && (
              <Link href="/organizer/analytics">Organizer</Link>
            )}

            {user?.role === "attendee" && (
              <Link href="/attendee/dashboard">My Dashboard</Link>
            )}

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

          {/* Mobile Hamburger */}

          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu className="cursor-pointer" size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Overlay */}

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />

            {/* Mobile Menu */}

            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.35 }}
              className="fixed top-0 left-0 w-full bg-background border-b border-border z-50"
            >
              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-xl font-bold neon-text">MelodyPass</span>

                <button onClick={() => setOpen(false)}>
                  <X className="cursor-pointer" size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-6 px-6 pb-8 text-lg">
                <Link href="/events" onClick={() => setOpen(false)}>
                  Events
                </Link>

                {user?.role === "admin" && (
                  <Link href="/admin/analytics" onClick={() => setOpen(false)}>
                    Admin
                  </Link>
                )}

                {user?.role === "organizer" && (
                  <Link
                    href="/organizer/analytics"
                    onClick={() => setOpen(false)}
                  >
                    Organizer
                  </Link>
                )}

                {user?.role === "attendee" && (
                  <Link
                    href="/attendee/dashboard"
                    onClick={() => setOpen(false)}
                  >
                    My Dashboard
                  </Link>
                )}

                {user ? (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/auth/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                )}

                <ModeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
