import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
    Search,
    Filter,
    MoreVertical,
    Shield,
    UserCheck,
    UserX,
    Mail,
    Calendar
} from 'lucide-react';

type User = {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'User' | 'Moderator';
    status: 'Active' | 'Inactive' | 'Banned';
    joinDate: string;
    tripsCount: number;
    avatar: string;
};

const users: User[] = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", role: "User", status: "Active", joinDate: "2023-01-15", tripsCount: 12, avatar: "S" },
    { id: 2, name: "Mike Chen", email: "mike.c@example.com", role: "Admin", status: "Active", joinDate: "2023-02-20", tripsCount: 5, avatar: "M" },
    { id: 3, name: "Emma Wilson", email: "emma.w@example.com", role: "User", status: "Inactive", joinDate: "2023-03-10", tripsCount: 2, avatar: "E" },
    { id: 4, name: "Alex Turner", email: "alex.t@example.com", role: "Moderator", status: "Active", joinDate: "2023-04-05", tripsCount: 8, avatar: "A" },
    { id: 5, name: "David Kim", email: "david.k@example.com", role: "User", status: "Banned", joinDate: "2023-05-12", tripsCount: 0, avatar: "D" },
];

export const UserManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("All");

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === "All" || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                    <p className="text-[var(--text-muted)]">Manage users, roles, and permissions.</p>
                </div>
                <Button className="bg-[var(--primary)] text-white">
                    Add New User
                </Button>
            </div>

            {/* Filters */}
            <Card className="p-4 bg-[var(--bg-card)] border-white/10">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[var(--bg-glass)] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[var(--primary)]"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="bg-[var(--bg-glass)] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[var(--primary)]"
                        >
                            <option value="All" className="text-black">All Roles</option>
                            <option value="Admin" className="text-black">Admin</option>
                            <option value="User" className="text-black">User</option>
                            <option value="Moderator" className="text-black">Moderator</option>
                        </select>
                        <Button variant="ghost" className="border border-white/10">
                            <Filter className="w-4 h-4 mr-2" /> More Filters
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Users Table */}
            <Card className="overflow-hidden bg-[var(--bg-card)] border-white/10">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="text-left p-4 text-[var(--text-muted)] font-medium">User</th>
                                <th className="text-left p-4 text-[var(--text-muted)] font-medium">Role</th>
                                <th className="text-left p-4 text-[var(--text-muted)] font-medium">Status</th>
                                <th className="text-left p-4 text-[var(--text-muted)] font-medium">Joined</th>
                                <th className="text-left p-4 text-[var(--text-muted)] font-medium">Trips</th>
                                <th className="text-right p-4 text-[var(--text-muted)] font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold">
                                                {user.avatar}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{user.name}</p>
                                                <div className="flex items-center text-xs text-[var(--text-muted)]">
                                                    <Mail className="w-3 h-3 mr-1" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${user.role === 'Admin' ? 'bg-purple-500/10 text-purple-500' :
                                                user.role === 'Moderator' ? 'bg-blue-500/10 text-blue-500' :
                                                    'bg-gray-500/10 text-gray-400'}`}>
                                            {user.role === 'Admin' && <Shield className="w-3 h-3 mr-1" />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${user.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                                                user.status === 'Inactive' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    'bg-red-500/10 text-red-500'}`}>
                                            {user.status === 'Active' ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center text-[var(--text-muted)]">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {user.joinDate}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-white font-medium">{user.tripsCount}</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button variant="ghost" size="sm" className="hover:bg-white/10">
                                            <MoreVertical className="w-4 h-4 text-[var(--text-muted)]" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
