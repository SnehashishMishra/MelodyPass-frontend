"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import SeatMap from "@/components/seat-map";

interface Event {
  _id: string;
  title: string;
  event_date: string;
  venue_name: string;
  ticket_price: number;
  status: string;
}

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await api.get("/events");
        const found = res.data.find((e: Event) => e._id === eventId);
        setEvent(found || null);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!event) return <p className="p-10">Event not found</p>;

  return (
    <>
      <main className="pt-28 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-3xl">{event.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {new Date(event.event_date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p>{event.venue_name}</p>

              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold">
                  ₹ {event.ticket_price}
                </span>

                <Badge>{event.status}</Badge>
              </div>

              <SeatMap eventId={event._id} />
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </>
  );
}
