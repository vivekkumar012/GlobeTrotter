import React, { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Camera,
  Edit2,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";

export const Profile: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const preplannedTrips = [
    { id: 1, title: "Paris Adventure", date: "Mar 2024" },
    { id: 2, title: "Tokyo Exploration", date: "Jun 2024" },
    { id: 3, title: "Bali Retreat", date: "Sep 2024" },
  ];

  const previousTrips = [
    { id: 1, title: "London Trip", date: "Dec 2023" },
    { id: 2, title: "New York City", date: "Oct 2023" },
    { id: 3, title: "Dubai Vacation", date: "Aug 2023" },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-dark)]">
      <div className="container mx-auto px-4 pb-24 mt-6">
        {/* User Profile Section */}
        <Card className="p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="profile-image" className="cursor-pointer block">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white relative overflow-hidden ring-4 ring-[var(--bg-dark)] shadow-2xl">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl font-bold">Upload</span>
                    )}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <p className="text-center text-xs text-[var(--text-muted)] mt-2">
                    Image of the User
                  </p>
                </label>
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">User Details</h2>
                  <p className="text-[var(--text-muted)]">
                    with appropriate option to edit those information....
                  </p>
                </div>
                <Button
                  variant={isEditing ? "outline" : "primary"}
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  value={firstName}
                  icon={<User className="w-5 h-5" />}
                  disabled={!isEditing}
                />
                <Input
                  label="Last Name"
                  value={lastName}
                  icon={<User className="w-5 h-5" />}
                  disabled={!isEditing}
                />
                <Input
                  label="Email Address"
                  value={email}
                  type="email"
                  icon={<Mail className="w-5 h-5" />}
                  disabled={!isEditing}
                />
                <Input
                  label="Phone Number"
                  value={phoneNumber}
                  type="tel"
                  icon={<Phone className="w-5 h-5" />}
                  disabled={!isEditing}
                />
                <Input
                  label="City"
                  value={city}
                  icon={<MapPin className="w-5 h-5" />}
                  disabled={!isEditing}
                />
                <Input
                  label="Join Date"
                  defaultValue={new Date().toLocaleDateString()}
                  icon={<Calendar className="w-5 h-5" />}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end gap-4">
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="px-8 shadow-lg shadow-[var(--primary)]/20"
                    onClick={() => setIsEditing(false)}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Preplanned Trips */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Preplanned Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {preplannedTrips.map((trip) => (
              <Card
                key={trip.id}
                className="p-6 hover:border-[var(--primary)]/50 transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-lg mb-4 flex items-center justify-center border border-white/10">
                  <MapPin className="w-12 h-12 text-[var(--text-muted)]" />
                </div>
                <h3 className="font-bold mb-2">{trip.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  {trip.date}
                </p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-[var(--primary)] group-hover:text-[var(--bg-dark)] group-hover:border-[var(--primary)] transition-all"
                >
                  View
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Previous Trips */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Previous Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previousTrips.map((trip) => (
              <Card
                key={trip.id}
                className="p-6 hover:border-[var(--primary)]/50 transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-4 flex items-center justify-center border border-white/10">
                  <MapPin className="w-12 h-12 text-[var(--text-muted)]" />
                </div>
                <h3 className="font-bold mb-2">{trip.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  {trip.date}
                </p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-[var(--primary)] group-hover:text-[var(--bg-dark)] group-hover:border-[var(--primary)] transition-all"
                >
                  View
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
