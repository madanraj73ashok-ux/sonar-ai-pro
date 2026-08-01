"use client";

import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface AIAssistantProps {
  lastPrediction: any;
}

export default function AIAssistant({ lastPrediction }: AIAssistantProps) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Greetings! I am **SONAR AI Defense Assistant**. Ask me about acoustic frequency channels, classification confidence, or feature importance.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, last_prediction: lastPrediction }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Unable to connect to backend server. Please check FastAPI status." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#2A2A2A]/80 border border-slate-700/60 backdrop-blur-2xl rounded-3xl p-5 shadow-xl flex flex-col h-[400px]">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-700/60">
        <Bot className="w-5 h-5 text-blue-400" />
        <h3 className="font-bold text-white text-sm">SONAR AI Defense Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.sender === "bot" && (
              <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-blue-400" />
              </div>
            )}
            <div
              className={`p-3 rounded-2xl max-w-[85%] ${
                m.sender === "user"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none"
                  : "bg-[#1A1A1A] border border-slate-700/60 text-slate-300 rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
            {m.sender === "user" && (
              <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-sky-400" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-blue-400 text-xs">
            <Sparkles className="w-4 h-4 animate-spin" /> Processing acoustic context...
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="mt-3 flex gap-2 pt-3 border-t border-slate-700/60">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask why object was classified as Mine/Rock..."
          className="flex-1 bg-[#1A1A1A] border border-slate-700/60 focus:border-blue-500/50 rounded-xl px-3 py-2 text-xs text-white outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-xl font-bold transition flex items-center justify-center"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
