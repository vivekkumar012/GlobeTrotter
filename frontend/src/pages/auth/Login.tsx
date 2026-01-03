import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Map } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Sigin Successfull", response.data);
      alert("Login Successfully");
      // Simulate login
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.log("Error in Login", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[var(--bg-dark)]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-50" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--secondary)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--bg-darker)] to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
        {/* Left Side: Brand/Welcome */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left max-w-lg"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary)] mb-6 shadow-lg shadow-orange-500/20">
            <Map className="w-8 h-8 text-[var(--bg-dark)]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
              Next Adventure
            </span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] mb-8">
            Join thousands of travelers planning their dream trips with
            GlobeTrotter. Personalized itineraries, budget tracking, and more.
          </p>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Card className="backdrop-blur-xl bg-white/5 border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-[var(--text-muted)]">
                Enter your details to access your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="w-5 h-5" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  icon={<Lock className="w-5 h-5" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex justify-end">
                  <a
                    href="/forget-password"
                    className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                Sign In <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-center text-sm text-[var(--text-muted)] mt-6">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[var(--primary)] font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
