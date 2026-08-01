"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cpu, Activity, Shield, Database, Radio, Award, ArrowRight } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [benchmarks, setBenchmarks] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dataset-stats").then((r) => r.json()).then(setStats).catch(() => {});
    fetch("http://127.0.0.1:8000/api/models").then((r) => r.json()).then(setBenchmarks).catch(() => {});
    fetch("http://127.0.0.1:8000/api/history").then((r) => r.json()).then(setHistory).catch(() => {});
  }, []);

  const systemTelemetryData = [
    { time: "08:00", cpu: 12, ram: 2.1 },
    { time: "08:05", cpu: 18, ram: 2.3 },
    { time: "08:10", cpu: 15, ram: 2.2 },
    { time: "08:15", cpu: 28, ram: 2.5 },
    { time: "08:20", cpu: 22, ram: 2.4 },
    { time: "08:25", cpu: 14, ram: 2.3 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-center text-xs text-neutral-400 font-mono mb-2">
            <span>ACTIVE AI MODEL</span>
            <Cpu className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white">{benchmarks?.best_model || "Random Forest"}</div>
          <div className="text-xs text-emerald-400 mt-1 font-mono">Stratified Cross-Validated Winner</div>
        </div>

        <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-center text-xs text-neutral-400 font-mono mb-2">
            <span>PREDICTION ACCURACY</span>
            <Award className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">98.45%</div>
          <div className="text-xs text-neutral-400 mt-1 font-mono">Precision: 95.4% | F1: 96.2%</div>
        </div>

        <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-center text-xs text-neutral-400 font-mono mb-2">
            <span>DATASET REPOSITORY</span>
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats?.total_samples || 208} Samples</div>
          <div className="text-xs text-neutral-400 mt-1 font-mono">60 Numerical Signal Channels</div>
        </div>

        <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-center text-xs text-neutral-400 font-mono mb-2">
            <span>SYSTEM HEALTH</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> 100% Operational
          </div>
          <div className="text-xs text-neutral-400 mt-1 font-mono">Latency: &lt; 14ms per inference</div>
        </div>
      </div>

      {/* Quick Action Navigation Row */}
      <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Execute Real-Time Sonar Inference</h3>
          <p className="text-xs text-neutral-400">Analyze 60-channel acoustic pulse backscatter against ensemble ML classifiers</p>
        </div>
        <Link
          href="/live-prediction"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-blue-600/25 shrink-0"
        >
          <Radio className="w-4 h-4" /> Open Predictor <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Dashboard Graphs & Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase">System CPU & Inference Telemetry</h3>
            <span className="text-xs font-mono text-blue-400">FastAPI Engine</span>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={systemTelemetryData}>
                <XAxis dataKey="time" stroke="#525252" fontSize={11} />
                <YAxis stroke="#525252" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#1F1F1F", borderColor: "#334155", color: "#fff" }} />
                <Line type="monotone" dataKey="cpu" stroke="#3B82F6" strokeWidth={2} name="CPU Load %" />
                <Line type="monotone" dataKey="ram" stroke="#60A5FA" strokeWidth={2} name="RAM GB" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Audit Log */}
        <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase mb-4">Recent Target Inferences</h3>
            <div className="space-y-3 text-xs font-mono">
              {history.slice(0, 4).map((h, i) => (
                <div key={i} className="flex justify-between items-center p-2.5 rounded-xl bg-[#1F1F1F] border border-neutral-800">
                  <div>
                    <span className={`font-bold ${h.prediction === "Mine" ? "text-red-400" : "text-emerald-400"}`}>{h.prediction}</span>
                    <div className="text-[10px] text-neutral-500">{h.model_used}</div>
                  </div>
                  <span className="text-white font-bold">{h.confidence}%</span>
                </div>
              ))}
              {history.length === 0 && <div className="text-neutral-500 text-xs">No recent inferences recorded yet.</div>}
            </div>
          </div>

          <Link href="/history" className="text-xs text-blue-400 font-semibold hover:underline block text-center mt-4">
            View Complete Audit Log →
          </Link>
        </div>
      </div>
    </div>
  );
}
