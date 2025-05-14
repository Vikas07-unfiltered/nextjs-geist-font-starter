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

interface Doubt {
  id: string;
  title: string;
  description: string;
  created_at: string;
  votes: number;
}

export default function DoubtPage() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoubts();
  }, []);

  const fetchDoubts = async () => {
    try {
      const { data, error } = await supabase
        .from("doubts")
        .select("*")
        .order("votes", { ascending: false });

      if (error) throw error;
      setDoubts(data || []);
    } catch (error) {
      console.error("Error fetching doubts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("doubts").insert([
        {
          title,
          description,
          votes: 0,
        },
      ]);

      if (error) throw error;

      setTitle("");
      setDescription("");
      fetchDoubts();
    } catch (error) {
      console.error("Error posting doubt:", error);
    }
  };

  const handleVote = async (id: string, currentVotes: number) => {
    try {
      const { error } = await supabase
        .from("doubts")
        .update({ votes: currentVotes + 1 })
        .eq("id", id);

      if (error) throw error;
      fetchDoubts();
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Post a Doubt</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter your doubt title"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Describe your doubt in detail"
              />
            </div>
            <Button type="submit" className="w-full">
              Post Doubt
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {loading ? (
          <p>Loading doubts...</p>
        ) : (
          doubts.map((doubt) => (
            <Card key={doubt.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleVote(doubt.id, doubt.votes)}
                      className="p-2 hover:bg-gray-100 rounded transition"
                    >
                      ▲
                    </button>
                    <span className="font-medium">{doubt.votes}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">{doubt.title}</h3>
                    <p className="text-gray-600 mb-4">{doubt.description}</p>
                    <p className="text-sm text-gray-500">
                      Posted on {new Date(doubt.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
