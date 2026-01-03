import React, { useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Plus,
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  Star,
  Globe,
  Shield,
  Zap
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";

type Trip = {
  id: number;
  title: string;
  date: string;
  image: string;
  isPublic?: boolean;
  budget?: number;
  rating?: number;
  location?: string;
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  /* ================= STATES ================= */
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  /* ================= MOCK DATA ================= */
  const topRegionalSelections = [
    {
      id: 1,
      title: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
      rating: 4.8
    },
    {
      id: 2,
      title: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800",
      rating: 4.9
    },
    {
      id: 3,
      title: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
      rating: 4.7
    },
    {
      id: 4,
      title: "London, UK",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800",
      rating: 4.6
    },
    {
      id: 5,
      title: "New York, USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800",
      rating: 4.8
    },
  ];

  const trips: Trip[] = [
    {
      id: 1,
      title: "Bali Adventure",
      date: "2023-12-01",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
      isPublic: true,
      budget: 1800,
      rating: 4.9,
      location: "Indonesia"
    },
    {
      id: 2,
      title: "Swiss Alps",
      date: "2023-10-01",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800",
      isPublic: false,
      budget: 3500,
      rating: 5.0,
      location: "Switzerland"
    },
    {
      id: 3,
      title: "Santorini Escape",
      date: "2023-08-01",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800",
      isPublic: true,
      budget: 2500,
      rating: 4.7,
      location: "Greece"
    },
  ];

  /* ================= FILTER + SORT LOGIC ================= */
  const processedTrips = useMemo(() => {
    return trips
      .filter((trip) =>
        trip.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((trip) => {
        if (filter === "public") return trip.isPublic;
        if (filter === "private") return !trip.isPublic;
        if (filter === "budget-low") return (trip.budget ?? 0) < 2000;
        if (filter === "budget-high") return (trip.budget ?? 0) >= 2000;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "date-desc")
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === "date-asc")
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (sortBy === "budget-asc") return (a.budget ?? 0) - (b.budget ?? 0);
        if (sortBy === "budget-desc") return (b.budget ?? 0) - (a.budget ?? 0);
        if (sortBy === "az") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [searchQuery, filter, sortBy, trips]);

  const features = [
    { icon: Globe, title: "Global Reach", desc: "Access destinations worldwide" },
    { icon: Shield, title: "Secure Planning", desc: "Your data is always protected" },
    { icon: Zap, title: "Smart Itineraries", desc: "AI-powered trip suggestions" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[var(--bg-dark)] z-10" />
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]/50 text-sm font-semibold mb-6 backdrop-blur-md">
              Explore the World with AI
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
              Your Journey <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
                Starts Here
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover breathtaking destinations, build personalized itineraries, and travel smarter with our AI-powered planner.
            </p>
          </motion.div>

          {/* Floating Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center shadow-2xl">
              <div className="pl-6 text-gray-300">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 px-4 py-3 text-lg"
              />
              <Button
                onClick={() => navigate("/planner")}
                className="rounded-full px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--bg-dark)] font-bold text-lg transition-all hover:scale-105"
              >
                Plan Now
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-3xl bg-[var(--bg-card)] border border-white/5 hover:bg-[var(--bg-glass)] transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-[var(--text-muted)]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Top Destinations */}
        <div className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Trending Now</h2>
              <p className="text-[var(--text-muted)] text-lg">Most popular destinations this week</p>
            </div>
            <Button variant="ghost" className="hidden md:flex items-center gap-2 text-[var(--primary)]">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {topRegionalSelections.map((selection, index) => (
              <motion.div
                key={selection.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer relative rounded-3xl overflow-hidden aspect-[3/4]"
                onClick={() => navigate("/planner")}
              >
                <img
                  src={selection.image}
                  alt={selection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-1">{selection.title}</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-white">{selection.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Previous Trips / Results */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-4xl font-bold text-white">Your Adventures</h2>

            <div className="flex gap-4">
              <select
                onChange={(e) => setFilter(e.target.value)}
                className="bg-[var(--bg-glass)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)]"
              >
                <option value="" className="text-black">All Types</option>
                <option value="public" className="text-black">Public</option>
                <option value="private" className="text-black">Private</option>
              </select>

              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[var(--bg-glass)] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)]"
              >
                <option value="" className="text-black">Sort By</option>
                <option value="date-desc" className="text-black">Newest</option>
                <option value="budget-asc" className="text-black">Budget</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-0 overflow-hidden bg-[var(--bg-card)] border-white/10 hover:border-[var(--primary)]/50 transition-all duration-300 group h-full flex flex-col">
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                      {trip.isPublic ? "Public" : "Private"}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[var(--primary)] transition-colors">
                          {trip.title}
                        </h3>
                        <div className="flex items-center text-[var(--text-muted)] text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {trip.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-[var(--primary)]/10 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-[var(--primary)] fill-current" />
                        <span className="text-[var(--primary)] font-bold">{trip.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {trip.date}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span className="font-bold text-white">${trip.budget}</span>
                        budget
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                      <Button
                        variant="ghost"
                        className="text-white hover:text-[var(--primary)] p-0"
                      >
                        View Details
                      </Button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--bg-dark)]"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Action Button */}
        <motion.button
          onClick={() => navigate("/planner")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white px-6 py-4 rounded-full shadow-2xl z-50 flex items-center gap-2 font-bold text-lg"
        >
          <Plus className="w-6 h-6" /> Plan Trip
        </motion.button>
      </div>
    </div>
  );
};
