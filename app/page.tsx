"use client";

import { useAuth } from "@/context/auth-context";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();

  useEffect(() => {
    document.body.classList.add("home-gradient");

    return () => {
      document.body.classList.remove("home-gradient");
    };
  }, []);

  return (
    <main className="min-h-[calc(100vh-120px)] flex items-center justify-center px-6">
      <section className="text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          Experience Live Music Like Never Before
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-muted-foreground text-lg"
        >
          Discover concerts, choose your seats, and book instantly with secure
          QR-based tickets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/events"
            className="px-8 py-3 rounded-2xl neon-gradient text-white font-semibold hover:scale-105 transition"
          >
            Browse Events
          </Link>

          {!user && (
            <Link
              href="/auth/register"
              className="px-8 py-3 rounded-2xl border border-border hover:bg-primary/20 transition"
            >
              Create Account
            </Link>
          )}
        </motion.div>
      </section>
    </main>
  );
}
