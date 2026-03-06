"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VenuesPage() {
  const [venues, setVenues] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [seats, setSeats] = useState("");

  async function load() {
    try {
      const res = await api.get("/admin/venues");
      setVenues(res.data);
    } catch (err) {
      console.error("Failed to load venues", err);
    }
  }

  async function removeVenue(id: string) {
    await api.delete(`/admin/venue/${id}`);

    load();
  }

  useEffect(() => {
    load();
  }, []);

  async function addVenue() {
    await api.post("/admin/venues", {
      name,
      location,
      total_seats: Number(seats),
    });

    setName("");
    setLocation("");
    setSeats("");

    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Venues</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <Input
          placeholder="Venue name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Input
          placeholder="Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />

        <Button className="cursor-pointer" onClick={addVenue}>
          Add Venue
        </Button>
      </div>

      <table className="w-full border rounded-xl">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Venue</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3">Seats</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {venues.map((v) => (
            <tr key={v._id} className="border-t">
              <td className="p-3">{v.name}</td>

              <td className="p-3">{v.location}</td>

              <td className="p-3 text-center">{v.total_seats}</td>

              <td className="p-3 text-center">
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeVenue(v._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
