"use client";

import React, { useState } from "react";
import StudyRoomChat from "../../components/StudyRoomChat";

export default function StudyRoomPage() {
  const [roomId, setRoomId] = useState("");
  const [joinedRoom, setJoinedRoom] = useState<string | null>(null);

  const handleCreateRoom = () => {
    // Generate a random room ID
    const newRoomId = Math.random().toString(36).substring(2, 10);
    setRoomId(newRoomId);
    setJoinedRoom(newRoomId);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      setJoinedRoom(roomId.trim());
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {!joinedRoom ? (
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleCreateRoom}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Create Study Room
          </button>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <button
              onClick={handleJoinRoom}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Room ID: {joinedRoom}</h2>
          <div className="mb-6">
            {/* Jitsi Meet iframe embed */}
            <iframe
              src={`https://meet.jit.si/${joinedRoom}`}
              allow="camera; microphone; fullscreen; display-capture"
              className="w-full h-96 rounded border"
              title="Jitsi Meet"
            />
          </div>
          <div>
            {/* Chat UI with Firebase Firestore integration */}
            <StudyRoomChat roomId={joinedRoom} userId="anonymous" />
          </div>
        </div>
      )}
    </div>
  );
}
