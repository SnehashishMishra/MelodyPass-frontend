"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";

export default function OrganizerEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [venues, setVenues] = useState<any[]>([]);

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [venueId, setVenueId] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    loadEvents();
    loadCategories();
    loadVenues();
  }, []);

  async function loadEvents() {
    const res = await api.get("/events/my-events");
    setEvents(res.data.reverse());
  }

  async function loadCategories() {
    const res = await api.get("/events/categories");
    setCategories(res.data);
  }

  async function loadVenues() {
    const res = await api.get("/events/venues");
    setVenues(res.data);
  }

  async function remove(id: string) {
    await api.delete(`/events/${id}`);
    setEvents((prev) => prev.filter((e) => e._id !== id));
  }

  function validateForm() {
    if (!title.trim()) return "Title required";

    if (!description.trim()) return "Description required";

    if (!categoryId) return "Select category";

    if (!venueId) return "Select venue";

    if (!eventDate) return "Select event date";

    const today = new Date().toISOString().split("T")[0];

    if (eventDate < today) return "Event date cannot be in the past";

    if (!price || Number(price) <= 0) return "Invalid ticket price";

    return null;
  }

  async function createEvent() {
    const error = validateForm();

    if (error) {
      alert(error);
      return;
    }

    await api.post("/events", {
      title,
      description,
      category_id: categoryId,
      venue_id: venueId,
      event_date: eventDate,
      ticket_price: Number(price),
    });

    setOpen(false);

    setTitle("");
    setDescription("");
    setCategoryId("");
    setVenueId("");
    setEventDate("");
    setPrice("");

    loadEvents();
  }

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategoryId("");
    setVenueId("");
    setEventDate("");
    setPrice("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Events</h1>

        {/* Add Event Button */}
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);

            if (!isOpen) {
              clearForm();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="flex gap-2 cursor-pointer">
              <Plus size={16} />
              Add Event
            </Button>
          </DialogTrigger>

          {/* Modal */}
          <DialogContent className="space-y-4 [&>button]:cursor-pointer">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>

            <Input
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Category */}
            <select
              className="w-full border rounded-lg p-2 cursor-pointer"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option className="bg-background" value="">
                Select Category
              </option>

              {categories.map((c) => (
                <option className="bg-background" key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Venue */}
            <select
              className="w-full border rounded-lg p-2 cursor-pointer"
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
            >
              <option className="bg-background" value="">
                Select Venue
              </option>

              {venues.map((v) => (
                <option className="bg-background" key={v._id} value={v._id}>
                  {v.name} ({v.location})
                </option>
              ))}
            </select>

            {/* Date */}
            <Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />

            {/* Ticket Price */}
            <Input
              placeholder="Ticket Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Button onClick={createEvent} className="w-full cursor-pointer">
              Create Event
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events Table */}
      <table className="w-full border rounded-xl">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left">Event</th>
            <th className="p-3 text-center">Date</th>
            <th className="px-8 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map((e) => (
            <tr key={e._id} className="border-t">
              <td className="px-6 py-3">{e.title}</td>

              <td className="p-3 text-center">
                {new Date(e.event_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>

              <td className="px-6 py-3 text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(e._id)}
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
