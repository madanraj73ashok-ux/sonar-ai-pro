"use client";

import { useState } from "react";
import { Settings, Sliders, Bell, Globe, Shield, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const [apiUrl, setApiUrl] = useState("http://127.0.0.1:8000");
  const [threshold, setThreshold] = useState(0.5);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-white">Platform Settings & Threshold Controls</h2>
        <p className="text-xs text-neutral-400 mt-1">Configure backend API connectivity, prediction classification bounds, and defense parameters</p>
      </div>

      <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h3 className="text-sm font-bold text-white font-mono uppercase border-b border-neutral-800 pb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-400" /> Backend API Endpoint Configuration
        </h3>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-300">FastAPI REST Server URL</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="flex-1 bg-[#1F1F1F] border border-neutral-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
            />
            <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition">
              Save Connection
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h3 className="text-sm font-bold text-white font-mono uppercase border-b border-neutral-800 pb-3 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-400" /> Binary Classification Decision Threshold
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-300">Mine vs Rock Threshold Cutoff</span>
            <span className="font-mono text-blue-400 font-bold">{threshold}</span>
          </div>

          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full h-2 bg-[#1F1F1F] rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <p className="text-[11px] text-neutral-500">Values above {threshold} are classified as hazardous Mines (M).</p>
        </div>
      </div>
    </div>
  );
}
