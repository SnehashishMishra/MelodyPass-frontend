"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState("attendee");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors: any = {};

    if (name.length < 3) newErrors.name = "Name must be at least 3 characters";

    if (username.length < 4)
      newErrors.username = "Username must be at least 4 characters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    )
      newErrors.password =
        "Password must be 6+ chars, include 1 uppercase & 1 number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await api.post("/auth/register", {
        name,
        username,
        password,
        email,
        role,
      });

      alert(
        role === "organizer"
          ? "Organizer registered! Await admin approval."
          : "Registration successful!",
      );

      router.push("/auth/login");
    } catch (err: any) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
      <Card className="w-96">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-bold text-center">Create Account</h2>

          <select
            className="w-full border p-2 rounded bg-background cursor-pointer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
          </select>

          <div>
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <Button onClick={handleRegister} className="w-full cursor-pointer">
            Register
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
