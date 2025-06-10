"use client";

import { useState } from "react";

export default function ChatComponent() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="w-full p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">💬 Chat with Friends</h2>

      {/* Chat Messages */}
      <div className="h-48 md:h-60 overflow-y-auto bg-gray-800 p-3 rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className="text-gray-200 p-2">{msg}</div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex mt-4 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 rounded-lg bg-gray-700 text-white"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
