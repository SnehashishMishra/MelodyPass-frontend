"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function AttendeeTickets() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await api.get("/attendee/tickets");

      setTickets(res.data.reverse());
    }

    load();
  }, []);

  async function downloadTicket(ref: string) {
    const res = await api.get(`/bookings/ticket/${ref}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `${ref}.pdf`);

    document.body.appendChild(link);

    link.click();

    link.remove();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Tickets</h1>

      <table className="w-full border rounded-xl">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Event</th>
            <th className="p-3 text-left">Venue</th>
            <th className="p-3">Date</th>
            <th className="p-3">Seats</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t) => (
            <tr key={t.booking_ref} className="border-t">
              <td className="p-3">{t.event_title}</td>

              <td className="p-3">{t.venue}</td>

              <td className="p-3 text-center">
                {new Date(t.event_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>

              <td className="p-3 text-center">{t.seats}</td>

              <td className="p-3 text-center">₹{t.amount}</td>

              <td className="p-3 text-center">
                <Button
                  className="cursor-pointer"
                  size="sm"
                  onClick={() => downloadTicket(t.booking_ref)}
                >
                  Download Ticket
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
