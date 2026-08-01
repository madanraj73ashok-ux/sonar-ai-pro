"use client";

import { useState, useEffect } from "react";
import DatasetExplorer from "@/components/dashboard/DatasetExplorer";
import { Download, Search, Table, FileSpreadsheet } from "lucide-react";

export default function DatasetPage() {
  const [stats, setStats] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dataset-stats")
      .then((res) => res.json())
      .then(setStats)
      .catch((e) => console.error(e));
  }, []);

  const dummyRows = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    s1: (0.02 + Math.sin(i) * 0.01).toFixed(4),
    s2: (0.03 + Math.cos(i) * 0.01).toFixed(4),
    s3: (0.04 + Math.sin(i / 2) * 0.02).toFixed(4),
    s60: (0.01 + Math.sin(i / 3) * 0.005).toFixed(4),
    target: i % 2 === 0 ? "Rock (R)" : "Mine (M)"
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Dataset Explorer & Analytics</h2>
          <p className="text-xs text-neutral-400 mt-1">Inspecting 208 stratified acoustic backscatter readings (sonar_data.csv)</p>
        </div>

        <button className="px-4 py-2.5 bg-[#262626] border border-neutral-700 hover:border-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition">
          <Download className="w-4 h-4 text-blue-400" /> Export CSV Dataset
        </button>
      </div>

      {/* Dataset Visual Charts */}
      <DatasetExplorer stats={stats} />

      {/* Dataset Data Table */}
      <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Table className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-sm">Sonar Frequency Records Matrix</h3>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sample signal..."
              className="w-full bg-[#1F1F1F] border border-neutral-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="py-2.5 px-3">Sample ID</th>
                <th className="py-2.5 px-3">Signal S-1</th>
                <th className="py-2.5 px-3">Signal S-2</th>
                <th className="py-2.5 px-3">Signal S-3</th>
                <th className="py-2.5 px-3">...</th>
                <th className="py-2.5 px-3">Signal S-60</th>
                <th className="py-2.5 px-3 text-right">Target Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {dummyRows.map((r) => (
                <tr key={r.id} className="hover:bg-neutral-800/40 transition">
                  <td className="py-2.5 px-3 text-neutral-400">#{r.id}</td>
                  <td className="py-2.5 px-3 text-slate-200">{r.s1}</td>
                  <td className="py-2.5 px-3 text-slate-200">{r.s2}</td>
                  <td className="py-2.5 px-3 text-slate-200">{r.s3}</td>
                  <td className="py-2.5 px-3 text-neutral-500">...</td>
                  <td className="py-2.5 px-3 text-slate-200">{r.s60}</td>
                  <td className={`py-2.5 px-3 text-right font-bold ${r.target.includes("Mine") ? "text-red-400" : "text-emerald-400"}`}>
                    {r.target}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
