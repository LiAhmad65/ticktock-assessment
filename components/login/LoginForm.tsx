"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppInput from "@/components/AppInput/AppInput";
import AppButton from "@/components/AppButton/AppButton";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (res?.error) {
        const errorMessage = "Invalid email or password";
        setErrors({
          email: errorMessage,
          password: errorMessage,
        });
        toast.error(errorMessage);
        return;
      }
      
      // Navigate to timesheets page after successful login
      if (res?.ok) {
        toast.success("Login successful!");
        router.push("/timesheets");
      }
    } catch (error) {
      const errorMessage = "An error occurred. Please try again.";
      setErrors({
        email: errorMessage,
        password: errorMessage,
      });
      toast.error(errorMessage);
    } finally{
      setIsLoading(false);
    }
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

          <AppButton type="submit" isLoading={isLoading}>
            Sign in
          </AppButton>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
