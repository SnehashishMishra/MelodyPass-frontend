"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AttendeeReviews() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/attendee/reviews");

        setReviews(res.data);
      } catch (err) {
        console.error("Review fetch error", err);
      }
    }

    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Reviews</h1>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.review_id} className="glass p-5 rounded-xl">
            <p className="font-semibold">{r.event_title}</p>

            <p className="text-yellow-500">⭐ {r.rating}/5</p>

            <p>{r.comment}</p>

            <p className="text-xs text-muted-foreground">
              {new Date(r.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}

        {reviews.length === 0 && (
          <p className="text-muted-foreground">
            You haven't submitted any reviews yet.
          </p>
        )}
      </div>
    </div>
  );
}
