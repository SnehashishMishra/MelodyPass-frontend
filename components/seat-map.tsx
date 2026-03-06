"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

interface Seat {
  _id: string;
  gate: string;
  row: number;
  seat_number: number;
  status: "available" | "booked";
}

export default function SeatMap({ eventId }: { eventId: string }) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchSeats() {
      try {
        const res = await api.get(`/events/${eventId}/seats`);
        setSeats(res.data);
      } catch (err) {
        console.error("Failed to load seats", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSeats();
  }, [eventId]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "booked") return;

    setSelectedSeats((prev) =>
      prev.includes(seat._id)
        ? prev.filter((id) => id !== seat._id)
        : [...prev, seat._id],
    );
  };

  if (loading) return <p>Loading seats...</p>;
  if (!user) {
    return (
      <div className="text-center mt-12">
        <p className="mb-4">Please login to view seats.</p>
        <Button onClick={() => router.push("/auth/login")}>Go to Login</Button>
      </div>
    );
  }

  // Group seats by gate → then by row
  const grouped = seats.reduce((acc: any, seat) => {
    if (!acc[seat.gate]) acc[seat.gate] = {};
    if (!acc[seat.gate][seat.row]) acc[seat.gate][seat.row] = [];
    acc[seat.gate][seat.row].push(seat);
    return acc;
  }, {});

  return (
    <div className="space-y-12 mt-8">
      {/* 🎭 Stage Indicator */}
      <div className="text-center mb-6">
        <div className="mx-auto w-64 h-10 bg-muted rounded-full flex items-center justify-center text-sm font-semibold tracking-wide">
          STAGE
        </div>
      </div>

      {/* 🎟 Seat Legend */}
      <div className="flex justify-center gap-6 text-sm mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-card border border-border rounded"></div>
          Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          Selected
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          Booked
        </div>
      </div>

      {/* 🎫 Gates */}
      {Object.keys(grouped).map((gate) => (
        <div key={gate} className="space-y-4 pr-9 md:pr-14">
          <h2 className="text-xl font-bold text-center">Gate {gate}</h2>

          {Object.keys(grouped[gate])
            .sort((a, b) => Number(a) - Number(b))
            .map((row) => (
              <div key={row} className="flex items-center justify-center gap-3">
                {/* Row Label */}
                <div className="w-12 text-right text-xs text-muted-foreground">
                  Row {row}
                </div>

                {/* Seats */}
                <div className="flex gap-2 flex-wrap max-w-3xl justify-center">
                  {grouped[gate][row]
                    .sort((a: Seat, b: Seat) => a.seat_number - b.seat_number)
                    .map((seat: Seat) => {
                      const isSelected = selectedSeats.includes(seat._id);

                      return (
                        <motion.button
                          key={seat._id}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleSeat(seat)}
                          className={`
                            w-9 h-9 text-[10px] font-medium rounded-md transition cursor-pointer
                            ${
                              seat.status === "booked"
                                ? "bg-red-500 cursor-not-allowed"
                                : isSelected
                                  ? "bg-primary text-white"
                                  : "bg-card border border-border hover:bg-accent"
                            }
                          `}
                        >
                          {seat.seat_number}
                        </motion.button>
                      );
                    })}
                </div>
              </div>
            ))}
        </div>
      ))}

      {/* Lock Seats Button */}
      {!locked && (
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            className="px-10 flex items-center gap-2 cursor-pointer "
            onClick={async () => {
              try {
                await api.post("/bookings/lock", {
                  event_id: eventId,
                  seats: selectedSeats,
                });

                setLocked(true);
              } catch (err: any) {
                alert(
                  err.response?.data?.error ||
                    "Seats already locked by another user",
                );
              }
            }}
          >
            <Lock size={18} />
            Lock Seats
          </Button>
        </div>
      )}

      {/* 💳 Booking Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-8 text-center space-y-4">
          <p className="text-lg font-semibold">
            Selected Seats: {selectedSeats.length}
          </p>

          {user?.role === "attendee" ? (
            <Button
              size="lg"
              className="px-12 cursor-pointer"
              onClick={async () => {
                try {
                  localStorage.setItem(
                    "checkout_data",
                    JSON.stringify({
                      event_id: eventId,
                      seats: selectedSeats.map((seatId) => {
                        const seat = seats.find((s) => s._id === seatId);

                        return {
                          id: seat?._id,
                          gate: seat?.gate,
                          row: seat?.row,
                          seat: seat?.seat_number,
                        };
                      }),
                    }),
                  );

                  router.push("/checkout");
                } catch (err: any) {
                  alert(err.response?.data?.error || "Booking failed");
                }
              }}
            >
              Proceed to Payment
            </Button>
          ) : (
            <Button
              size="lg"
              className="px-12"
              onClick={() => router.push("/auth/login")}
            >
              Login as Attendee to Book
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
