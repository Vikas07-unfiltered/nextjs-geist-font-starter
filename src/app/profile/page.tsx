"use client";

import { useState, useEffect } from "react";
import { NotionCard, NotionCardHeader, NotionCardTitle, NotionCardContent } from "@/components/ui/notion-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CA_LEVELS = [
    { value: "foundation", label: "Foundation" },
    { value: "inter", label: "Inter" },
    { value: "final", label: "Final" },
];

export default function ProfilePage() {
    // Mock user data - in real app, fetch from auth context or API
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "",
        caLevel: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // TODO: Save profile data to backend or auth provider
        alert("Profile saved!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <NotionCard className="w-full max-w-md p-8">
                <NotionCardHeader>
                    <NotionCardTitle className="text-2xl font-bold mb-6">User Profile</NotionCardTitle>
                </NotionCardHeader>
                <NotionCardContent>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <Input type="text" value={user.name} disabled />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input type="email" value={user.email} disabled />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter phone number"
                                value={user.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="caLevel" className="block text-sm font-medium text-gray-700 mb-1">CA Level</label>
                            <select
                                id="caLevel"
                                name="caLevel"
                                value={user.caLevel}
                                onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Select CA Level</option>
                                {CA_LEVELS.map((level) => (
                                    <option key={level.value} value={level.value}>
                                        {level.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button onClick={handleSave} className="w-full mt-6">
                            Save Profile
                        </Button>
                    </div>
                </NotionCardContent>
            </NotionCard>
        </div>
    );
}
