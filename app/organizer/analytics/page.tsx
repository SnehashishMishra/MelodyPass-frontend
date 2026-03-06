"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

import { Ticket, IndianRupee, Calendar } from "lucide-react";

const COLORS = ["#7c3aed", "#22c55e", "#ef4444", "#eab308", "#3b82f6"];

export default function OrganizerAnalytics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await api.get("/dashboard/organizer");
      setData(res.data);
    }

    load();
  }, []);

  if (!data) return <p className="p-8">Loading analytics...</p>;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">Organizer Analytics</h1>

        <p className="text-muted-foreground">
          Performance overview of your events
        </p>
      </div>

      {/* KPI CARDS */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">My Events</p>

            <p className="text-2xl font-bold">{data.my_events}</p>
          </div>

          <Calendar className="text-primary" />
        </div>

        <div className="glass p-6 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Tickets Sold</p>

            <p className="text-2xl font-bold">{data.total_tickets_sold}</p>
          </div>

          <Ticket className="text-primary" />
        </div>

        <div className="glass p-6 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>

            <p className="text-2xl font-bold">₹{data.total_revenue}</p>
          </div>

          <IndianRupee className="text-primary" />
        </div>
      </div>

      {/* CHART SECTION */}

      <div className="glass p-8 rounded-xl">
        <h2 className="text-xl font-semibold mb-6">
          Ticket Distribution Per Event
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data.event_breakdown}
              dataKey="tickets_sold"
              nameKey="event_title"
              outerRadius={120}
              label
            >
              {data.event_breakdown.map((event: any, index: number) => (
                <Cell
                  key={event.event_id}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#7c3aed",
                color: "#fff",
                borderRadius: "4px",
                border: "1px solid black",
                textAlign: "center",
                paddingTop: "1px",
              }}
              itemStyle={{ color: "#fff" }}
              cursor={false}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* EVENT BREAKDOWN LIST */}

      <div className="glass p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Event Performance</h2>

        <div className="space-y-3">
          {data.event_breakdown.map((event: any) => (
            <div
              key={event.event_id}
              className="flex justify-between border-b pb-2 text-sm"
            >
              <span className="text-muted-foreground">
                Event ID: {event.event_title}
              </span>

              <span className="font-medium">
                {event.tickets_sold} tickets | ₹{event.revenue}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
