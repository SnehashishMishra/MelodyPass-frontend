"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function OrganizersPage() {
  const [organizers, setOrganizers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await api.get("/admin/organizers/all");

      setOrganizers(res.data);
      setLoading(false);
    }

    load();
  }, []);

  async function approve(id: string) {
    await api.put(`/admin/approve/${id}`);

    setOrganizers((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status: "approved" } : o)),
    );
  }

  async function remove(id: string) {
    await api.delete(`/admin/user/${id}`);

    setOrganizers((prev) => prev.filter((o) => o._id !== id));
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Organizer Management</h1>

      <table className="w-full border rounded-xl">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3  text-left">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {organizers.map((org) => (
            <tr key={org._id} className="border-t">
              <td className="p-3">{org.name}</td>

              <td className="p-3">{org.email}</td>

              <td className="p-3 pr-10">
                {org.status === "approved" ? (
                  <span className="text-green-500 font-medium">Approved</span>
                ) : (
                  <span className="text-yellow-500 font-medium">Pending</span>
                )}
              </td>

              <td className="p-3 flex gap-2 justify-end">
                {org.status === "pending" && (
                  <Button
                    className="cursor-pointer"
                    size="sm"
                    onClick={() => approve(org._id)}
                  >
                    Approve
                  </Button>
                )}

                <Button
                  className="cursor-pointer"
                  size="sm"
                  variant="destructive"
                  onClick={() => remove(org._id)}
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
