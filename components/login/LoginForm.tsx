"use client";

import { useState } from "react";
import AppInput from "@/components/AppInput";
import AppButton from "@/components/AppButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <div className="bg-white w-full h-full flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-gray-900 font-bold text-3xl mb-8">
          Welcome back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AppInput
            title="Email"
            placeholder="name@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <AppInput
            title="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-700 focus:ring-primary-700"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <AppButton type="submit">
            Sign in
          </AppButton>
        </form>
      </div>
    </div>
  );
}
