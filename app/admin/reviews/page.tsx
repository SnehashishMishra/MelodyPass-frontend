"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await api.get("/admin/reviews");

      setReviews(res.data);
    }

    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Platform Reviews</h1>

      <table className="w-full border rounded-xl">
        <thead className="bg-muted">
          <tr>
            <th className="p-3">Event</th>
            <th className="p-3">User</th>
            <th className="p-3">Rating</th>
            <th className="p-3">Comment</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((r) => (
            <tr key={r.review_id} className="border-t">
              <td className="p-3">{r.event_title}</td>
              <td className="p-3">{r.user_name}</td>
              <td className="p-3">⭐ {r.rating}</td>
              <td className="p-3">{r.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
