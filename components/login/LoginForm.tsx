"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppInput from "@/components/AppInput/AppInput";
import AppButton from "@/components/AppButton/AppButton";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "This field is required";
    }

    if (!password.trim()) {
      newErrors.password = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // TODO: Implement login logic
    console.log("Login attempt:", { email, password, rememberMe });
    
    // Navigate to timesheets page after successful login
    router.push("/timesheets");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Clear error when user starts typing
    if (errors.password) {
      setErrors({ ...errors, password: undefined });
    }
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
            onChange={handleEmailChange}
            error={errors.email}
          />

          <AppInput
            title="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={errors.password}
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
};

export default LoginForm;
