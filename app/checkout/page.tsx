"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();

  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const pricePerTicket = 500;

  useEffect(() => {
    const data = localStorage.getItem("checkout_data");

    if (!data) {
      router.push("/events");
      return;
    }

    setCheckoutData(JSON.parse(data));

    // unlock seats when user leaves checkout
    return () => {
      const saved = localStorage.getItem("checkout_data");

      if (saved) {
        const parsed = JSON.parse(saved);

        api.post("/bookings/unlock", {
          seats: parsed.seats.map((s: any) => s.id),
        });
      }
    };
  }, []);

  if (!checkoutData) return null;

  const totalAmount = checkoutData.seats.length * checkoutData.ticket_price;

  // ----------------------
  // CARD NAME FORMAT
  // ----------------------

  const handleNameChange = (e: any) => {
    const value = e.target.value.toUpperCase();
    setCardName(value);
  };

  // ----------------------
  // CARD NUMBER FORMAT
  // xxxx xxxx xxxx xxxx
  // ----------------------

  const handleCardNumber = (e: any) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 16) return;

    let formatted = value.match(/.{1,4}/g)?.join(" ") || "";

    setCardNumber(formatted);
  };

  // ----------------------
  // EXPIRY FORMAT
  // MM/YY
  // ----------------------

  const handleExpiry = (e: any) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 4) return;

    let formatted = value;

    if (value.length >= 3) {
      formatted = value.slice(0, 2) + "/" + value.slice(2);
    }

    setExpiry(formatted);
  };

  // ----------------------
  // CVV
  // ----------------------

  const handleCVV = (e: any) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 3) return;

    setCvv(value);
  };

  // ----------------------
  // VALIDATION
  // ----------------------

  const validateCard = () => {
    if (cardName.length < 3) return "Invalid card holder name";

    if (cardNumber.replace(/\s/g, "").length !== 16)
      return "Card number must be 16 digits";

    if (expiry.length !== 5) return "Invalid expiry date";

    const [mm, yy] = expiry.split("/");

    if (Number(mm) > 12 || Number(mm) < 1) return "Invalid month";

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (Number(yy) < currentYear) return "Card expired";

    if (Number(yy) === currentYear && Number(mm) < currentMonth)
      return "Card expired";

    if (cvv.length !== 3) return "Invalid CVV";

    return null;
  };

  // ----------------------
  // PAYMENT
  // ----------------------

  const handlePayment = async () => {
    const error = validateCard();

    if (error) {
      alert(error);
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/bookings/", {
        event_id: checkoutData.event_id,
        seats: checkoutData.seats.map((s: any) => s.id),
      });

      setSuccess(true);

      localStorage.removeItem("checkout_data");

      setTimeout(() => {
        router.push(`/ticket/${res.data.booking_ref}`);
      }, 2000);
    } catch (err: any) {
      alert(err.response?.data?.error || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-6">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">Secure Payment</h1>

          {/* SEAT SUMMARY */}

          <div className="glass p-4 rounded-xl">
            <p className="font-semibold mb-2">Selected Seats</p>

            <div className="flex flex-wrap gap-2">
              {checkoutData.seats.map((s: any, index: number) => (
                <span
                  key={s.id || index}
                  className="px-2 border border-black rounded-lg bg-border"
                >
                  Gate: {s.gate} - Row: {s.row} - Seat: {s.seat}
                </span>
              ))}
            </div>

            <div className="mt-4 font-semibold">Total: ₹{totalAmount}</div>
          </div>
          {/* CARD NAME */}

          <Input
            placeholder="Card Holder Name"
            value={cardName}
            onChange={handleNameChange}
          />

          {/* CARD NUMBER */}

          <Input
            placeholder="Card Number"
            value={cardNumber}
            onChange={handleCardNumber}
            maxLength={19}
          />

          <div className="flex gap-4">
            <Input
              placeholder="MM/YY"
              value={expiry}
              onChange={handleExpiry}
              maxLength={5}
            />

            <Input
              placeholder="CVV"
              value={cvv}
              onChange={handleCVV}
              maxLength={3}
            />
          </div>

          <Button
            size="lg"
            className="w-full neon-gradient cursor-pointer"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ₹${totalAmount}`}
          </Button>

          {success && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center text-green-500 font-semibold"
            >
              Payment Successful 🎉
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
