"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");

  async function load() {
    const res = await api.get("/admin/categories");

    setCategories(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function addCategory() {
    await api.post("/admin/categories", { name });

    setName("");

    load();
  }

  async function remove(id: string) {
    await api.delete(`/admin/category/${id}`);

    load();
  }

  return (
    <div className="space-y-6 w-4/5 mx-auto">
      <h1 className="text-2xl font-bold">Categories</h1>

      <div className="flex gap-4">
        <Input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button className="cursor-pointer" onClick={addCategory}>
          Add
        </Button>
      </div>
      <div className="overflow-x-auto mr-20 rounded-xl border border-foreground/20">
        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-muted">
            <tr>
              <th className="pl-6 py-3 text-left">Category</th>
              <th className="pr-8 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="px-6 py-3">{c.name}</td>

                <td className="px-6 py-3 text-right">
                  <Button
                    className="cursor-pointer"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(c._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
