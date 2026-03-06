"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";

export default function ReviewPage() {
  const { eventId } = useParams();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  async function submit() {
    await api.post("/attendee/review", {
      event_id: eventId,
      rating,
      comment,
    });

    alert("Review submitted");
  }

  return (
    <div className="p-8 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Leave Review</h1>

      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min={1}
        max={5}
      />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-2 w-full"
      />

      <button
        onClick={submit}
        className="px-6 py-2 bg-primary text-white rounded"
      >
        Submit
      </button>
    </div>
  );
}
