"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import { PieChartIcon, Activity } from "lucide-react";

interface DatasetExplorerProps {
  stats: any;
}

export default function DatasetExplorer({ stats }: DatasetExplorerProps) {
  if (!stats) return null;

  const pieData = [
    { name: "Rock (Natural)", value: stats.num_rocks, color: "#3B82F6" },
    { name: "Mine (Hazard)", value: stats.num_mines, color: "#EF4444" },
  ];

  const frequencyProfileData = (stats.rock_means || []).slice(0, 20).map((rVal: number, idx: number) => ({
    channel: `S${idx + 1}`,
    Rock: rVal,
    Mine: (stats.mine_means || [])[idx] || 0.0,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Target Distribution Card */}
      <div className="bg-[#2A2A2A]/80 border border-slate-700/60 backdrop-blur-2xl rounded-3xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
            <PieChartIcon className="text-blue-400 w-5 h-5" /> Target Class Balance
          </h3>
          <p className="text-slate-400 text-xs mb-4">Binary sonar distribution (208 dataset samples)</p>
        </div>

        <div className="h-[220px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1A1A1A", borderColor: "#334155", color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center border-t border-slate-700/60 pt-4">
          <div className="bg-[#1A1A1A] p-2.5 rounded-2xl border border-blue-500/20">
            <div className="text-xs text-slate-400">Rocks (R)</div>
            <div className="text-xl font-bold text-blue-400">{stats.num_rocks}</div>
          </div>
          <div className="bg-[#1A1A1A] p-2.5 rounded-2xl border border-red-500/20">
            <div className="text-xs text-slate-400">Mines (M)</div>
            <div className="text-xl font-bold text-red-400">{stats.num_mines}</div>
          </div>
        </div>
      </div>

      {/* Signal Backscatter Profile Comparison */}
      <div className="lg:col-span-2 bg-[#2A2A2A]/80 border border-slate-700/60 backdrop-blur-2xl rounded-3xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="text-blue-400 w-5 h-5" /> Mean Frequency Backscatter
            </h3>
            <p className="text-slate-400 text-xs">Comparing acoustic energy absorption between Rock & Mine (Channels 1-20)</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-blue-400"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span> Rock</span>
            <span className="flex items-center gap-1.5 text-red-400"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> Mine</span>
          </div>
        </div>

        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={frequencyProfileData}>
              <XAxis dataKey="channel" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "#1A1A1A", borderColor: "#334155", color: "#fff" }} />
              <Line type="monotone" dataKey="Rock" stroke="#3B82F6" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="Mine" stroke="#EF4444" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
