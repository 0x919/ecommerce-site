"use client";

import Header from "@/components/Header";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setError(null);

      if (password !== repeatPassword) {
        setError("Passwords do not match");
        return;
      }

      await axios.post("/api/auth/register", {
        email,
        password,
      });
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.error) {
        setError(error.response.data.error || "Something went wrong");
      } else {
        console.log(error);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-base-300 py-[20px] w-[500px] flex flex-col items-center justify-center rounded-xl">
          <h1 className="text-3xl font-semibold mb-8">Register your account</h1>
          <div className="">
            <label htmlFor="email" className="block font-semibold mb-1">
              Your email
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="input mb-5"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input mb-5"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-1">
              Repeat Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input mb-10"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary px-10" onClick={handleRegister}>
            Register
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
