"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Explore Events</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event._id}
            className={`cursor-pointer transition hover:scale-[1.02] ${
              event.status !== "upcoming" ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (event.status === "upcoming") {
                router.push(`/events/${event._id}`);
              }
            }}
          >
            <CardContent className="px-9 py-2 space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">{event.title}</h2>

                <p className="text-sm text-muted-foreground">
                  📍 {event.venue}
                </p>
              </div>
              <div className="flex justify-between items-start">
                <p className="text-sm text-muted-foreground">
                  🎵 {event.category}
                </p>

                <p className="text-sm">
                  🗓{" "}
                  {new Date(event.event_date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p className="font-semibold">₹{event.ticket_price}</p>

              <div className="pt-2">
                {event.status === "upcoming" && (
                  <Badge className="bg-green-500">Booking Open</Badge>
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
        ))}
      </div>
    </div>
  );
}
