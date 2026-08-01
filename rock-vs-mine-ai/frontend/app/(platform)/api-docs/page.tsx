"use client";

import { Code2, Server } from "lucide-react";

export default function ApiDocsPage() {
  const endpoints = [
    { method: "GET", path: "/api/health", desc: "System operational status, CPU, RAM, and model counts" },
    { method: "GET", path: "/api/models", desc: "Benchmark matrix and cross-validation accuracy metrics" },
    { method: "GET", path: "/api/dataset-stats", desc: "Dataset sample counts, feature profiles, and class balances" },
    { method: "POST", path: "/api/predict", desc: "Classifies 60-feature vector with target ML model" },
    { method: "POST", path: "/api/retrain", desc: "Triggers full cross-validation retraining pipeline" },
    { method: "POST", path: "/api/report", desc: "Generates downloadable defense PDF inspection report" },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-white">Interactive REST API Documentation</h2>
        <p className="text-xs text-neutral-400 mt-1">SONAR AI FastAPI backend endpoints schema specification</p>
      </div>

      <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white font-mono uppercase border-b border-neutral-800 pb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-400" /> Endpoints Specification
        </h3>

        <div className="space-y-3 font-mono text-xs">
          {endpoints.map((ep, idx) => (
            <div key={idx} className="p-3 bg-[#1F1F1F] border border-neutral-800 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ep.method === "GET" ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30" : "bg-blue-950 text-blue-400 border border-blue-500/30"}`}>
                  {ep.method}
                </span>
                <span className="text-white font-bold">{ep.path}</span>
              </div>
              <span className="text-neutral-400 text-[11px] font-sans">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
