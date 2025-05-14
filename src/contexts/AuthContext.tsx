"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    caLevel?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const checkAuth = async () => {
            try {
                // TODO: Implement actual auth check with your backend
                const savedUser = localStorage.getItem("user");
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // TODO: Implement actual login with your backend
            const mockUser = {
                id: "1",
                name: email.split("@")[0],
                email,
            };

            setUser(mockUser);
            localStorage.setItem("user", JSON.stringify(mockUser));
            router.push("/profile");
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // TODO: Implement actual logout with your backend
            setUser(null);
            localStorage.removeItem("user");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    };

    const updateProfile = async (data: Partial<User>) => {
        try {
            // TODO: Implement actual profile update with your backend
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Profile update failed:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
