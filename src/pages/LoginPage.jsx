// src/pages/LoginPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =================================================================
    //  THIS IS THE FINAL, GUARANTEED FIX TO PREVENT THE WHITE PAGE
    // =================================================================
    try {
      // We call the login function which might succeed, fail gracefully, or crash.
      const result = await login(email, password);

      // Case 1: Login was successful (result is truthy and has a success property)
      if (result && result.success) {
        toast({ title: "Login Successful", description: `Welcome back!` });
        const role = result.data?.role || "user";
        navigate(role === "admin" || role === "helper" ? "/admin" : "/");
      }
      // Case 2: Login failed (result has a message to display)
      else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          // The result.message will have the friendly error from the context
          // (e.g., "Cannot connect to the server." or "Invalid credentials.")
          // We add a fallback just in case `result` is null or has no message.
          description:
            result?.message || "An unknown error occurred. Please try again.",
        });
      }
    } catch (err) {
      // THIS IS THE CRITICAL SAFETY NET.
      // It catches any error that the `login` function itself might throw,
      // preventing the entire application from crashing to a white page.
      console.error("A critical error occurred in the login process:", err);
      toast({
        variant: "destructive",
        title: "Application Error",
        description:
          "Could not process the login request. Please contact support or try again later.",
      });
    }
    // =================================================================
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Contributor Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
