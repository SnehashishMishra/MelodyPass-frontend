"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Music, CalendarDays, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await api.get("/events");
      setEvents(res.data.reverse());
    }

    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Music className="text-primary" size={28} />
        <h1 className="text-3xl font-bold">Explore Events</h1>
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="glass rounded-2xl p-10 text-center text-muted-foreground">
          No events available right now.
        </div>
      )}

      {/* Events Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className={`glass transition-all hover:shadow-xl hover:scale-[1.02] ${
                event.status !== "upcoming"
                  ? "opacity-60 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (event.status === "upcoming") {
                  router.push(`/events/${event._id}`);
                }
              }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl leading-tight">
                  {event.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Venue */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.venue}
                  </span>

                  <span className="flex items-center gap-2">
                    <Music size={16} />
                    {event.category}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays size={16} />
                  {new Date(event.event_date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-semibold text-lg">
                    <Ticket size={18} className="text-primary" />₹
                    {event.ticket_price}
                  </span>

                  {/* Status */}
                  {event.status === "upcoming" && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      Booking Open
                    </Badge>
                  )}

                  {event.status === "booking_closed" && (
                    <Badge variant="secondary">Booking Closed</Badge>
                  )}

                  {event.status === "completed" && (
                    <Badge variant="destructive">Event Completed</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
