"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function OrganizerReviews() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await api.get("/events/reviews");

      setReviews(res.data);
    }

    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Event Reviews</h1>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.review_id} className="glass p-4 rounded-xl">
            <p className="font-semibold">{r.event_title}</p>

            <p className="text-sm text-muted-foreground">by {r.user_name}</p>

            <p className="text-yellow-500">⭐ {r.rating}/5</p>

            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
