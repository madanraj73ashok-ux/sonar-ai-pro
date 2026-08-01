"use client";

import { useState, useEffect } from "react";
import { Download, Search, History, Trash2, FileText } from "lucide-react";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/history")
      .then((res) => res.json())
      .then(setHistory)
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Prediction Audit Log & History</h2>
          <p className="text-xs text-neutral-400 mt-1">Audit log of all processed sonar target classifications stored in SQLite database</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-[#262626] border border-neutral-700 hover:border-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition">
            <Download className="w-4 h-4 text-blue-400" /> Export Audit CSV
          </button>
        </div>
      </div>

      <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-sm">Classification Log Records</h3>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search history by model..."
              className="w-full bg-[#1F1F1F] border border-neutral-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="py-2.5 px-3">Log ID</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Classification</th>
                <th className="py-2.5 px-3">Confidence Score</th>
                <th className="py-2.5 px-3">Model Evaluated</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-800/40 transition">
                  <td className="py-2.5 px-3 text-neutral-400">#{item.id}</td>
                  <td className="py-2.5 px-3 text-slate-300">{item.timestamp}</td>
                  <td className={`py-2.5 px-3 font-bold ${item.prediction === "Mine" ? "text-red-400" : "text-emerald-400"}`}>
                    {item.prediction.toUpperCase()}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-white">{item.confidence}%</td>
                  <td className="py-2.5 px-3 text-blue-400">{item.model_used}</td>
                  <td className="py-2.5 px-3 text-right flex items-center justify-end gap-2">
                    <button className="p-1 text-slate-400 hover:text-white transition">
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-neutral-500 text-xs">
                    No classification logs recorded yet. Execute a prediction from Live Prediction page.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
