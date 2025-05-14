"use client";

import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription } from "./ui/alert";
import { Loader2 } from "lucide-react";

export default function FeedbackForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const { error } = await supabase.from("feedback").insert([{ email, message }]);
      
      if (error) {
        throw error;
      }
      
      setStatus("success");
      setEmail("");
      setMessage("");
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred while submitting feedback");
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-base font-semibold block">
          Email
        </label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full h-12 text-base"
          disabled={status === "loading"}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-base font-semibold block">
          Message
        </label>
        <Textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your thoughts with us..."
          className="w-full min-h-[150px] text-base resize-none"
          disabled={status === "loading"}
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            <span>Submitting...</span>
          </div>
        ) : (
          "Submit Feedback"
        )}
      </Button>

      {status === "success" && (
        <Alert className="bg-green-50 text-green-900 border-green-200">
          <AlertDescription className="text-base">
            Thank you for your feedback! We appreciate your input.
          </AlertDescription>
        </Alert>
      )}

      {status === "error" && (
        <Alert variant="destructive">
          <AlertDescription className="text-base">
            {errorMessage || "There was an error submitting your feedback. Please try again."}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
