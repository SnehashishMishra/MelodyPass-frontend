"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([]);

  async function load() {
    const res = await api.get("/admin/events");

    setEvents(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    await api.delete(`/admin/event/${id}`);

    setEvents((prev) => prev.filter((e) => e._id !== id));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Events</h1>

      <table className="w-full border rounded-xl overflow-hidden">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Event</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Venue</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event._id} className="border-t">
              <td className="p-3">{event.title}</td>

              <td className="p-3">{event.category}</td>

              <td className="p-3">{event.venue}</td>

              <td className="p-3">
                {new Date(event.event_date).toLocaleDateString()}
              </td>

              <td className="p-3 text-center">
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(event._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
