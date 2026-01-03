import React, { useState } from "react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ChangeEvent } from "react";
import {
  Mail,
  ArrowRight,
  Map,
  User,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg shadow-orange-500/20",
    ghost: "bg-transparent hover:bg-white/5 text-white",
  };
  const sizes = {
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, icon, className = "", ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 ${icon ? "pl-11" : ""
            } text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`rounded-2xl p-8 shadow-2xl ${className}`}>{children}</div>
  );
};

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    additionalInfo: "",
  });

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Account created successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden ">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[var(--bg-dark)]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-50" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--secondary)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--bg-darker)] to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 py-12">
        {/* Left Side: Brand/Welcome */}
        <div className="text-center md:text-left max-w-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 mb-6 shadow-lg shadow-orange-500/20">
            <Map className="w-8 h-8 text-[var(--bg-dark)]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Start Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
              Journey Today
            </span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Create your account and unlock personalized travel experiences.
            Plan, budget, and explore the world with GlobeTrotter.
          </p>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full max-w-2xl">
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-white">
                Create Account
              </h2>
              <p className="text-gray-400">
                Fill in your details to get started
              </p>
            </div>

            <div className="space-y-6">
              {/* Photo Upload */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo"
                    className="flex items-center justify-center w-32 h-32 rounded-full border-2 border-white/20 bg-white/5 cursor-pointer hover:border-orange-500/50 transition-all overflow-hidden"
                  >
                    {photo ? (
                      <img
                        src={photo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <span className="text-xs text-gray-400">Photo</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  icon={<User className="w-5 h-5" />}
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  icon={<User className="w-5 h-5" />}
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  icon={<Mail className="w-5 h-5" />}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  icon={<Phone className="w-5 h-5" />}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              {/* City and Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="City"
                  type="text"
                  name="city"
                  placeholder="City"
                  icon={<MapPin className="w-5 h-5" />}
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <Input
                  label="Country"
                  type="text"
                  name="country"
                  placeholder="Country"
                  icon={<Globe className="w-5 h-5" />}
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  placeholder="Additional Information ...."
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all resize-none"
                />
              </div>

              {/* Register Button */}
              <Button
                onClick={handleSignup}
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                Register <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-center text-sm text-gray-400 mt-6">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-orange-500 font-medium hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
