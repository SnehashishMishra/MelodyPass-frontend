"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function AttendeesPage() {
  const [attendees, setAttendees] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await api.get("/admin/attendees");

      setAttendees(res.data);
    }

    load();
  }, []);

  async function remove(id: string) {
    await api.delete(`/admin/user/${id}`);

    setAttendees((prev) => prev.filter((a) => a._id !== id));
  }

  return (
    <div className="space-y-6 w-4/5 mx-auto">
      <h1 className="text-2xl font-bold">Attendee Management</h1>

      <table className="w-full border rounded-xl">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-center">Email</th>
            <th className="px-8 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {attendees.map((a) => (
            <tr key={a._id} className="border-t">
              <td className="px-6 py-3">{a.name}</td>

              <td className="px-6 py-3 text-center">{a.email}</td>

              <td className="px-6 py-3 text-right">
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(a._id)}
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
