"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Users, Calendar, Ticket, IndianRupee } from "lucide-react";

export default function AdminAnalytics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await api.get("/dashboard/admin");

      setData(res.data);
    }

    load();
  }, []);

  if (!data) return <p className="p-8">Loading analytics...</p>;

  const chartData = [
    { name: "Users", value: data.total_users },
    { name: "Organizers", value: data.total_organizers },
    { name: "Events", value: data.total_events },
    { name: "Bookings", value: data.total_bookings },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}

      <div>
        <h1 className="text-3xl font-bold">Platform Analytics</h1>

        <p className="text-muted-foreground">
          Overview of MelodyPass platform performance
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Users</p>

            <p className="text-2xl font-bold">{data.total_users}</p>
          </div>

          <Users className="text-primary" />
        </div>

        <div className="glass p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Organizers</p>

            <p className="text-2xl font-bold">{data.total_organizers}</p>
          </div>

          <Users className="text-primary" />
        </div>

        <div className="glass p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Events</p>

            <p className="text-2xl font-bold">{data.total_events}</p>
          </div>

          <Calendar className="text-primary" />
        </div>

        <div className="glass p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Revenue</p>

            <p className="text-2xl font-bold">₹{data.total_revenue}</p>
          </div>

          <IndianRupee className="text-primary" />
        </div>
      </div>

      {/* Chart Section */}

      <div className="glass p-8 rounded-xl">
        <h2 className="text-xl font-semibold mb-6">Platform Activity</h2>

        <ResponsiveContainer width="80%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip
              contentStyle={{
                backgroundColor: "#7c3aed",
                color: "#fff",
                borderRadius: "4px",
                border: "1px solid black",
                height: "content-fit",
                textAlign: "center",
                paddingTop: "1px",
              }}
              itemStyle={{ color: "#fff" }}
              cursor={false}
            />

            <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#7c3aed" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Event Status Section */}

      <div className="grid md:grid-cols-1 gap-6">
        <div className="glass p-6 rounded-xl flex items-center justify-around">
          <p className="text-muted-foreground text-sm">Upcoming Events</p>

          <p className="text-3xl font-bold">{data.upcoming_events}</p>
        </div>

        {/* <div className="glass p-6 rounded-xl">
          <p className="text-muted-foreground text-sm">Completed Events</p>

          <p className="text-3xl font-bold">{data.completed_events}</p>
        </div> */}
      </div>
    </div>
  );
}
