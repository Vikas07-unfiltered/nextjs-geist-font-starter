"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore } from "../lib/firebaseClient";

interface Message {
  id: string;
  userId: string;
  text: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  createdAt: any;
}

interface StudyRoomChatProps {
  roomId: string;
  userId: string;
}

export default function StudyRoomChat({ roomId, userId }: StudyRoomChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const storage = getStorage();

  useEffect(() => {
    const messagesRef = collection(firestore, "study_room_messages", roomId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        msgs.push({
          id: doc.id,
          userId: data.userId,
          text: data.text,
          fileUrl: data.fileUrl,
          fileName: data.fileName,
          fileType: data.fileType,
          createdAt: data.createdAt,
        });
      });
      setMessages(msgs);
      scrollToBottom();
    });
    return () => unsubscribe();
  }, [roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const fileRef = ref(storage, `study_rooms/${roomId}/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(fileRef);
      return {
        url: downloadUrl,
        name: file.name,
        type: file.type,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !file) return;

    try {
      let fileData = null;
      if (file) {
        fileData = await handleFileUpload(file);
      }

      const messagesRef = collection(firestore, "study_room_messages", roomId, "messages");
      await addDoc(messagesRef, {
        userId,
        text: newMessage.trim(),
        fileUrl: fileData?.url,
        fileName: fileData?.name,
        fileType: fileData?.type,
        createdAt: serverTimestamp(),
      });

      setNewMessage("");
      setFile(null);
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const isImageFile = (type: string) => type.startsWith("image/");
  const isPDFFile = (type: string) => type === "application/pdf";

  return (
    <div className="border border-gray-300 rounded p-4 max-w-4xl mx-auto">
      <div className="h-96 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg ${
              msg.userId === userId ? "bg-black text-white ml-auto" : "bg-gray-100"
            } max-w-[80%]`}
          >
            <p className="text-sm font-semibold mb-1">
              {msg.userId === userId ? "You" : `User: ${msg.userId}`}
            </p>
            {msg.text && <p className="mb-2">{msg.text}</p>}
            {msg.fileUrl && (
              <div className="mt-2">
                {msg.fileType && isImageFile(msg.fileType) ? (
                  <img
                    src={msg.fileUrl}
                    alt={msg.fileName || "Shared image"}
                    className="max-w-full rounded"
                  />
                ) : msg.fileType && isPDFFile(msg.fileType) ? (
                  <a
                    href={msg.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:underline"
                  >
                    <span>📄</span>
                    <span>{msg.fileName || "PDF Document"}</span>
                  </a>
                ) : (
                  <a
                    href={msg.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {msg.fileName || "Shared file"}
                  </a>
                )}
              </div>
            )}
            <p className="text-xs opacity-70 mt-1">
              {msg.createdAt?.toDate().toLocaleTimeString()}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-3 py-2"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 flex items-center justify-center min-w-[40px]"
        >
          📎
        </label>
        <button
          onClick={handleSendMessage}
          disabled={uploading || (!newMessage.trim() && !file)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Sending..." : "Send"}
        </button>
      </div>
      {file && (
        <div className="mt-2 text-sm text-gray-600">
          Selected file: {file.name}
          <button
            onClick={() => setFile(null)}
            className="ml-2 text-red-600 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
