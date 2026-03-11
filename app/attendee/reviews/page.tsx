"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function AttendeeReviews() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/attendee/reviews");
        setReviews(res.data.reverse());
      } catch (err) {
        console.error("Review fetch error", err);
      }
    }

    load();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <MessageSquare className="text-primary" size={28} />
        <h1 className="text-3xl font-bold">My Reviews</h1>
      </div>

      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="glass rounded-2xl p-10 text-center text-muted-foreground">
          You haven't submitted any reviews yet.
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((r, index) => (
          <motion.div
            key={r.review_id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="glass border-border hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="text-lg">{r.event_title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {r.rating}/5
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm leading-relaxed text-foreground/90">
                  {r.comment}
                </p>

                {/* Date */}
                <p className="text-xs text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
