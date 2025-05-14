"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

interface StudySession {
  id: string;
  subject: string;
  duration: number;
  date: string;
}

export default function PlannerPage() {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from("study_sessions")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("study_sessions").insert([
        {
          subject,
          duration: parseInt(duration),
          date: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setSubject("");
      setDuration("");
      fetchSessions();
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  const getAnalytics = () => {
    const subjectTotals = sessions.reduce((acc: { [key: string]: number }, session) => {
      acc[session.subject] = (acc[session.subject] || 0) + session.duration;
      return acc;
    }, {});

    const sortedSubjects = Object.entries(subjectTotals).sort((a, b) => b[1] - a[1]);
    return {
      highest: sortedSubjects[0],
      lowest: sortedSubjects[sortedSubjects.length - 1],
    };
  };

  const { highest, lowest } = getAnalytics();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Study Session</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter subject name"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Duration (minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                min="1"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter duration in minutes"
              />
            </div>
            <Button type="submit" className="w-full">
              Add Session
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Study Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          {highest && (
            <p className="mb-2">
              Most studied subject: <strong>{highest[0]}</strong> ({highest[1]} minutes)
            </p>
          )}
          {lowest && (
            <p>
              Least studied subject: <strong>{lowest[0]}</strong> ({lowest[1]} minutes)
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Study Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading sessions...</p>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{session.subject}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-medium">{session.duration} minutes</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
