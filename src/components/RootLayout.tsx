"use client";

import Link from "next/link";
import { AuthNav } from "@/components/AuthNav";
import { ReactNode } from "react";
import { Doodles } from "@/components/Doodles";

interface RootLayoutProps {
    navItems: Array<{ label: string; href: string }>;
    children: ReactNode;
}

export function RootLayout({ navItems, children }: RootLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col relative">
            <Doodles />
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
                <div className="max-w-6xl mx-auto px-4">
                    <nav className="flex items-center justify-between h-16">
                        <Link
                            href="/"
                            className="text-xl font-semibold tracking-tight text-gray-900 hover:opacity-80 transition-opacity"
                        >
                            Unfiltered CA
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            <ul className="flex items-center space-x-1">
                                {navItems.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <AuthNav />
                        </div>

                        {/* Mobile Navigation */}
                        <button className="md:hidden px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                            Menu
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-16">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white mt-auto relative z-10">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900">About Us</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Dedicated to supporting CA students in their academic journey through innovative study tools and collaborative features.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
                            <ul className="space-y-3">
                                {navItems.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Have questions? Reach out to us through our feedback form.
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
                        &copy; {new Date().getFullYear()} Unfiltered CA. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
