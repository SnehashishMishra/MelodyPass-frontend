"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function AttendeeBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/attendee/bookings");

        setBookings(res.data.reverse());
      } catch (err) {
        console.error("Booking fetch error", err);
      }
    }

    load();
  }, []);

  function resetForm() {
    setSelected(null);
    setRating(0);
    setComment("");
  }

  async function submitReview() {
    try {
      await api.post("/attendee/review", {
        event_id: selected.event_id,
        rating,
        comment,
      });

      alert("Review submitted");

      setBookings((prev) =>
        prev.map((b) =>
          b.booking_ref === selected.booking_ref ? { ...b, reviewed: true } : b,
        ),
      );

      resetForm();
    } catch (err: any) {
      alert(err.response?.data?.error || "Review failed");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <div className="overflow-x-auto rounded-xl border border-foreground/20">
        <table className="w-full border rounded-xl">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Review</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.booking_ref} className="border-t">
                <td className="p-3">{b.event_title}</td>

                <td className="p-3">
                  {new Date(b.event_date).toLocaleDateString()}
                </td>

                <td className="p-3 text-center">{b.seats}</td>

                <td className="p-3 text-center">₹{b.amount}</td>

                <td className="p-3 text-center">
                  {b.reviewed ? (
                    <span className="text-green-600 font-semibold">
                      Reviewed
                    </span>
                  ) : (
                    <Button
                      className="cursor-pointer"
                      size="sm"
                      onClick={() => setSelected(b)}
                    >
                      Leave Review
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Review Modal */}

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-background p-6 rounded-xl w-105 space-y-4">
            <h2 className="text-lg font-semibold">
              Review {selected.event_title}
            </h2>

            {/* Star Rating */}

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className={`cursor-pointer ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <textarea
              className="w-full border rounded-lg p-2"
              placeholder="Write your review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <Button
                className="cursor-pointer"
                variant="secondary"
                onClick={resetForm}
              >
                Cancel
              </Button>

              <Button
                className="cursor-pointer"
                onClick={submitReview}
                disabled={rating === 0}
              >
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
