"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TicketPage() {
  const { booking_ref } = useParams();
  const [loading, setLoading] = useState(false);

  const downloadTicket = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/bookings/ticket/${booking_ref}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${booking_ref}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      alert(err.response?.data?.error || "Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-6">
      <Card className="w-full max-w-lg text-center">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-2xl font-bold">🎟 Booking Confirmed</h1>

          <p className="text-muted-foreground">Your booking reference:</p>

          <div className="text-xl font-semibold neon-text text-transparent bg-clip-text">
            {booking_ref}
          </div>

          <Button
            size="lg"
            onClick={downloadTicket}
            disabled={loading}
            className="w-full cursor-pointer"
          >
            {loading ? "Preparing Ticket..." : "Download Ticket PDF"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
