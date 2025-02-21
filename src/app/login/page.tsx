"use client";

import Header from "@/components/Header";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCartInfo } from "@/lib/utils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError(null);

      await axios.post("/api/auth/login", {
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
      <Header cartInfo={getCartInfo()} />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-base-300 py-[20px] w-[500px] flex flex-col items-center justify-center rounded-xl">
          <h1 className="text-3xl font-semibold mb-8">Login to your account</h1>
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
              className="input mb-10"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary px-10" onClick={handleLogin}>
            Login
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
