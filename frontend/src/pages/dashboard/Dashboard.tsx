import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
  ArrowUpDown,
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
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const previousTrips = [
    {
      id: 1,
      title: "Bali Adventure",
      date: "Dec 2023",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      title: "Swiss Alps",
      date: "Oct 2023",
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      title: "Santorini Escape",
      date: "Aug 2023",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=400",
    },
  ];

  /* ================= STATES ================= */
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  /* ================= MOCK DATA ================= */
  const topRegionalSelections = [
    {
      id: 1,
      title: "Paris, France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      title: "Tokyo, Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      title: "Dubai, UAE",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 4,
      title: "London, UK",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 5,
      title: "New York, USA",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=400",
    },
  ];

  const trips: Trip[] = [
    {
      id: 1,
      title: "Bali Adventure",
      date: "2023-12-01",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400",
      isPublic: true,
      budget: 1800,
    },
    {
      id: 2,
      title: "Swiss Alps",
      date: "2023-10-01",
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=400",
      isPublic: false,
      budget: 3500,
    },
    {
      id: 3,
      title: "Santorini Escape",
      date: "2023-08-01",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=400",
      isPublic: true,
      budget: 2500,
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

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[var(--bg-dark)]">
      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Banner */}
        <Card className="mb-8 overflow-hidden relative">
          <div className="relative h-64 md:h-80 flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-40" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-4 text-white"
              >
                Plan Your Perfect Trip
              </motion.h2>
              <p className="text-white/80">
                Discover destinations, build itineraries & travel smarter
              </p>
            </div>
          </div>
        </Card>

        {/* Search + Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg-glass)] border border-white/10 rounded-xl pl-12 pr-4 py-3"
            />
          </div>

          <select
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[var(--bg-glass)] border border-white/10 rounded-xl px-4 py-3"
          >
            <option value="" className="text-black">Filter</option>
            <option value="public" className="text-black">Public</option>
            <option value="private" className="text-black">Private</option>
            <option value="budget-low" className="text-black">Budget &lt; $2000</option>
            <option value="budget-high" className="text-black">Budget ≥ $2000</option>
          </select>

          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[var(--bg-glass)] border border-white/10 rounded-xl px-4 py-3"
          >
            <option value="" className="text-black">Sort by</option>
            <option value="date-desc" className="text-black">Date (Newest)</option>
            <option value="date-asc" className="text-black">Date (Oldest)</option>
            <option value="budget-asc" className="text-black">Budget (Low → High)</option>
            <option value="budget-desc" className="text-black">Budget (High → Low)</option>
            <option value="az" className="text-black">Alphabetical</option>
          </select>
        </div>

        {/* Top Regional Selections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Regional Selections</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topRegionalSelections.map((selection) => (
              <Card
                key={selection.id}
                className="p-0 overflow-hidden group cursor-pointer hover:border-[var(--primary)]/50 transition-all"
                onClick={() => navigate("/planner")}
              >
                <div className="aspect-square relative">
                  <img
                    src={selection.image}
                    alt={selection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-medium text-white">
                      {selection.title}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Previous Trips */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Previous Trips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousTrips.map((trip) => (
              <Card
                key={trip.id}
                className="p-0 overflow-hidden group cursor-pointer hover:border-[var(--primary)]/50 transition-all"
              >
                <div className="h-56 relative">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold mb-1">{trip.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-3">
                      {trip.date}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="border border-white/20 hover:bg-white/10"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Floating Button */}
        <motion.button
          onClick={() => navigate("/planner")}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white px-6 py-3 rounded-full shadow-2xl"
        >
          <Plus className="w-5 h-5" /> Plan a trip
        </motion.button>
      </div>
    </div>
  );
};
