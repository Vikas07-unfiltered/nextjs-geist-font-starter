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

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "video" | "mock_test";
  url: string;
  created_at: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isAdmin, setIsAdmin] = useState(false); // In a real app, this would be determined by auth
  const [loading, setLoading] = useState(true);
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "pdf" as Resource["type"],
    url: "",
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("resources").insert([
        {
          ...newResource,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setNewResource({
        title: "",
        description: "",
        type: "pdf",
        url: "",
      });
      fetchResources();
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const isYouTubeVideo = resource.type === "video" && resource.url.includes("youtube.com");

    return (
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2">{resource.title}</h3>
          <p className="text-gray-600 mb-4">{resource.description}</p>
          
          {isYouTubeVideo ? (
            <div className="aspect-video mb-4">
              <iframe
                width="100%"
                height="100%"
                src={resource.url.replace("watch?v=", "embed/")}
                title={resource.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <Button asChild className="w-full">
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                {resource.type === "pdf" ? "Download PDF" : "Take Mock Test"}
              </a>
            </Button>
          )}
          
          <p className="text-sm text-gray-500 mt-4">
            Added on {new Date(resource.created_at).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Add Resource</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) =>
                    setNewResource({ ...newResource, title: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter resource title"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Description</label>
                <textarea
                  value={newResource.description}
                  onChange={(e) =>
                    setNewResource({ ...newResource, description: e.target.value })
                  }
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter resource description"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Type</label>
                <select
                  value={newResource.type}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      type: e.target.value as Resource["type"],
                    })
                  }
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="pdf">PDF</option>
                  <option value="video">Video</option>
                  <option value="mock_test">Mock Test</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">URL</label>
                <input
                  type="url"
                  value={newResource.url}
                  onChange={(e) =>
                    setNewResource({ ...newResource, url: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter resource URL"
                />
              </div>
              <Button type="submit" className="w-full">
                Add Resource
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Study Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <p>Loading resources...</p>
              ) : (
                resources
                  .filter((r) => r.type === "pdf")
                  .map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Lectures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <p>Loading resources...</p>
              ) : (
                resources
                  .filter((r) => r.type === "video")
                  .map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mock Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <p>Loading resources...</p>
              ) : (
                resources
                  .filter((r) => r.type === "mock_test")
                  .map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
