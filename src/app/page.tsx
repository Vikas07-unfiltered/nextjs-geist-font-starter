"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NotionCard,
  NotionCardHeader,
  NotionCardTitle,
  NotionCardDescription,
  NotionCardContent,
} from "@/components/ui/notion-card";

export default function HomePage() {
  const features = [
    {
      title: "Pomodoro Timer",
      description: "Stay focused with customizable study intervals",
      href: "/study-room",
    },
    {
      title: "Study Rooms",
      description: "Join or create virtual study rooms with voice chat and file sharing",
      href: "/study-room",
    },
    {
      title: "Study Planner",
      description: "Track and analyze your study progress across subjects",
      href: "/planner",
    },
    {
      title: "Doubt Section",
      description: "Get help from peers by posting and discussing doubts",
      href: "/doubt",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-24 relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] animate-[pulse_4s_ease-in-out_infinite] opacity-70"></div>
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <NotionCard className="max-w-4xl mx-auto bg-transparent border-none shadow-none hover:shadow-none">
          <NotionCardHeader className="text-center space-y-8">
            <NotionCardTitle className="text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Welcome to Unfiltered CA
            </NotionCardTitle>
            <NotionCardDescription className="text-xl leading-relaxed">
              This project, developed by CA Vikas and CA Ravi, is dedicated to supporting students in their academic journey. It aims to help them study in a more effective and efficient manner through structured tools, collaborative features, and focused learning environments.
            </NotionCardDescription>
          </NotionCardHeader>
          <NotionCardContent>
            <div className="flex items-center justify-center gap-6 pt-8 animate-fade-in">
              <Button
                variant="outline"
                size="lg"
                className="bg-white hover:bg-gray-50 border-gray-200 text-gray-900 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-6 text-lg"
                asChild
              >
                <Link href="/study-room">Join Study Room →</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white hover:bg-gray-50 border-gray-200 text-gray-600 shadow-sm hover:shadow-md transition-all duration-200 px-8 py-6 text-lg"
                asChild
              >
                <Link href="/resources">Browse Resources →</Link>
              </Button>
            </div>
          </NotionCardContent>
        </NotionCard>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <NotionCard key={feature.title}>
              <NotionCardHeader>
                <NotionCardTitle>{feature.title}</NotionCardTitle>
                <NotionCardDescription>{feature.description}</NotionCardDescription>
              </NotionCardHeader>
              <NotionCardContent>
                <Button variant="outline" asChild>
                  <Link href={feature.href}>
                    Try Now →
                  </Link>
                </Button>
              </NotionCardContent>
            </NotionCard>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16">
        <NotionCard className="max-w-4xl mx-auto bg-gray-50">
          <NotionCardHeader className="text-center">
            <NotionCardTitle className="text-3xl font-bold mb-4">Study Resources</NotionCardTitle>
            <NotionCardDescription className="text-xl">
              Access a comprehensive collection of study materials, mock tests, and video lectures curated specifically for CA students.
            </NotionCardDescription>
          </NotionCardHeader>
          <NotionCardContent className="flex justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/resources">
                Browse Resources →
              </Link>
            </Button>
          </NotionCardContent>
        </NotionCard>
      </section>

      {/* Call to Action */}
      <section className="py-16 mb-24">
        <NotionCard className="max-w-3xl mx-auto">
          <NotionCardHeader className="text-center">
            <NotionCardTitle className="text-3xl font-bold mb-4">Ready to Start Learning?</NotionCardTitle>
            <NotionCardDescription className="text-xl">
              Join our community of focused learners and achieve your goals together.
            </NotionCardDescription>
          </NotionCardHeader>
          <NotionCardContent className="flex justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/study-room">
                Get Started →
              </Link>
            </Button>
          </NotionCardContent>
        </NotionCard>
      </section>
    </div>
  );
}
