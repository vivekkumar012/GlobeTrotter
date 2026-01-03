import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Map, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Link } from "react-router-dom";

export const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending reset email
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 1500);
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
        {/* Left Side: Brand/Info */}
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
            Reset Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
              Password
            </span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] mb-8">
            No worries! Enter your email address and we'll send you
            instructions to reset your password.
          </p>
        </motion.div>

        {/* Right Side: Reset Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Card className="backdrop-blur-xl bg-white/5 border-white/10">
            {!emailSent ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
                  <p className="text-[var(--text-muted)]">
                    Enter your email to receive reset instructions
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-6">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    icon={<Mail className="w-5 h-5" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    isLoading={isLoading}
                  >
                    Send Reset Link <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  <div className="text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Back to Login
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Check Your Email</h2>
                <p className="text-[var(--text-muted)] mb-6">
                  We've sent a password reset link to <br />
                  <span className="text-[var(--primary)] font-medium">
                    {email}
                  </span>
                </p>
                <p className="text-sm text-[var(--text-muted)] mb-8">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setEmailSent(false)}
                    className="text-[var(--primary)] hover:underline"
                  >
                    try again
                  </button>
                </p>
                <Link to="/login">
                  <Button className="w-full" size="lg">
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back to Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};