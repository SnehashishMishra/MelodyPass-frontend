"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";

export default function VerifyTicket() {
  const params = useParams();
  const booking_ref = params.booking_ref as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/bookings/verify/${booking_ref}`);

        setData(res.data);
      } catch (err) {
        setData({ valid: false });
      }

      setLoading(false);
    }

    if (booking_ref) {
      load();
    }
  }, [booking_ref]);

  if (loading) return <p className="p-10 text-center">Verifying ticket...</p>;

  if (!data?.valid) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-red-500">Invalid Ticket</h1>

        <p className="text-muted-foreground">
          This ticket does not exist in the database.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="glass p-10 rounded-xl space-y-4 text-center">
        <h1 className="text-3xl font-bold text-green-500">Ticket Verified</h1>

        <p>
          <strong>Event:</strong> {data.event}
        </p>
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Seats:</strong> {data.seats.join(", ")}
        </p>
        <p>
          <strong>Amount:</strong> ₹{data.amount}
        </p>
        <p>
          <strong>Booking Ref:</strong> {data.booking_ref}
        </p>
      </div>
    </div>
  );
}
