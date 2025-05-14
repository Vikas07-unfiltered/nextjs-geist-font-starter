"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function AuthNav() {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="ml-4 flex items-center space-x-1">
                <Link
                    href="/auth/login"
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Login
                </Link>
            </div>
        );
    }

    return (
        <div className="ml-4 flex items-center space-x-2">
            <Link
                href="/auth/profile"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
            >
                Profile
            </Link>
            <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
                Logout
            </Button>
        </div>
    );
}
