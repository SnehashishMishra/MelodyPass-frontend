"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { Ticket, IndianRupee, Star, Calendar } from "lucide-react";

const COLORS = ["#f97316", "#22c55e", "#3b82f6", "#ef4444", "#7c3aed"];

export default function AttendeeDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await api.get("/attendee/dashboard");
      const reverseEvents = res.data.event_stats.slice().reverse();
      res.data.event_stats = reverseEvents;
      setData(res.data);
    }

    load();
  }, []);

  if (!data) return <p className="p-8">Loading dashboard...</p>;

  return (
    <div className="space-y-10">
      {/* Title */}

      <div>
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <p className="text-muted-foreground">Overview of your event activity</p>
      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="glass">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Events Attended</p>
              <p className="text-2xl font-bold">{data.events_attended}</p>
            </div>
            <Calendar className="text-primary" />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Tickets Purchased</p>
              <p className="text-2xl font-bold">{data.tickets_purchased}</p>
            </div>
            <Ticket className="text-primary" />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Total Spent</p>
              <p className="text-2xl font-bold">₹{data.total_spent}</p>
            </div>
            <IndianRupee className="text-primary" />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm">Reviews Given</p>
              <p className="text-2xl font-bold">{data.reviews_given}</p>
            </div>
            <Star className="text-primary" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Tickets per Event */}

        <div className="glass p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Tickets Per Event</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.event_stats}>
              <XAxis dataKey="event_title" />

              <YAxis />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#7c3aed",
                  color: "#fff",
                  borderRadius: "6px",
                  border: "none",
                }}
                itemStyle={{ color: "#fff" }}
                cursor={false}
              />

              <Bar dataKey="tickets" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Spending Distribution */}

        <div className="glass p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Spending Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.event_stats}
                dataKey="amount"
                nameKey="event_title"
                outerRadius={100}
                label
              >
                {data.event_stats.map((_: any, index: number) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#7c3aed",
                  color: "#fff",
                  borderRadius: "6px",
                  border: "none",
                }}
                itemStyle={{ color: "#fff" }}
                cursor={false}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Events */}

      <div className="glass p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Your Events</h2>

        <div className="space-y-3">
          {data.event_stats.map((event: any, index: number) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2 text-sm"
            >
              <span className="text-muted-foreground">{event.event_title}</span>

              <span className="font-medium">
                {event.tickets} tickets | ₹{event.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
