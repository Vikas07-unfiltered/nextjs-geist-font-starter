"use client";

import { useState, useEffect } from "react";
import { NotionCard, NotionCardHeader, NotionCardTitle, NotionCardContent } from "@/components/ui/notion-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";

const CA_LEVELS = [
    { value: "foundation", label: "Foundation" },
    { value: "inter", label: "Inter" },
    { value: "final", label: "Final" },
];

export default function ProfilePage() {
    const { user, updateProfile, loading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        caLevel: "",
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login");
        } else if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone || "",
                caLevel: user.caLevel || "",
            });
        }
    }, [user, loading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfile({
                phone: formData.phone,
                caLevel: formData.caLevel,
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <NotionCard className="w-full max-w-md p-8">
                <NotionCardHeader>
                    <NotionCardTitle className="text-2xl font-bold mb-6">User Profile</NotionCardTitle>
                </NotionCardHeader>
                <NotionCardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <Input type="text" value={formData.name} disabled />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input type="email" value={formData.email} disabled />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="caLevel" className="block text-sm font-medium text-gray-700 mb-1">CA Level</label>
                            <select
                                id="caLevel"
                                name="caLevel"
                                value={formData.caLevel}
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
                        <Button type="submit" className="w-full mt-6">
                            Save Profile
                        </Button>
                    </form>
                </NotionCardContent>
            </NotionCard>
        </div>
    );
}
