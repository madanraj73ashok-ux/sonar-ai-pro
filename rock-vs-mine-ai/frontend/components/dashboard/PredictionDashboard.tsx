"use client";

import { useState } from "react";
import { Upload, RefreshCw, AlertTriangle, ShieldCheck, FileText, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

interface PredictionDashboardProps {
  onPredict: (features: number[]) => void;
  prediction: any;
  loading: boolean;
  onDownloadPDF: () => void;
}

export default function PredictionDashboard({ onPredict, prediction, loading, onDownloadPDF }: PredictionDashboardProps) {
  const [activeTab, setActiveTab] = useState<"preset" | "csv" | "sliders">("preset");
  const [showSliders, setShowSliders] = useState(false);
  const [features, setFeatures] = useState<number[]>(
    Array.from({ length: 60 }, (_, i) => Math.min(1.0, Math.max(0.0, Math.round((0.03 + (Math.sin(i / 4) + 1) * 0.22) * 10000) / 10000)))
  );

  const handleRandomize = () => {
    const randomized = Array.from({ length: 60 }, () => Math.round(Math.random() * 10000) / 10000);
    setFeatures(randomized);
    onPredict(randomized);
  };

  const handleSliderChange = (idx: number, val: number) => {
    const updated = [...features];
    updated[idx] = val;
    setFeatures(updated);
  };

  return (
    <div className="space-y-8">
      {/* Input Mode Selector Card */}
      <div className="bg-[#2A2A2A]/80 border border-slate-700/60 rounded-3xl p-6 backdrop-blur-2xl shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Signal Acquisition</h3>
            <p className="text-slate-400 text-xs mt-0.5">Select acoustic sonar input vector for classification</p>
          </div>

          <div className="flex bg-[#1A1A1A] p-1.5 rounded-2xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab("preset")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === "preset" ? "bg-blue-600 text-white shadow-md shadow-blue-500/25" : "text-slate-400 hover:text-white"
              }`}
            >
              Preset Samples
            </button>
            <button
              onClick={() => setActiveTab("csv")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === "csv" ? "bg-blue-600 text-white shadow-md shadow-blue-500/25" : "text-slate-400 hover:text-white"
              }`}
            >
              Upload CSV
            </button>
            <button
              onClick={() => setActiveTab("sliders")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === "sliders" ? "bg-blue-600 text-white shadow-md shadow-blue-500/25" : "text-slate-400 hover:text-white"
              }`}
            >
              Custom Frequencies
            </button>
          </div>
        </div>

        {activeTab === "preset" && (
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={handleRandomize}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white font-bold rounded-2xl text-sm transition flex items-center gap-2.5 shadow-lg shadow-blue-500/30"
            >
              <RefreshCw className="w-4 h-4" /> Load Random Sonar Pulse & Classify
            </button>
          </div>
        )}

        {activeTab === "csv" && (
          <div className="border-2 border-dashed border-slate-700 hover:border-blue-500/50 rounded-2xl p-8 text-center bg-[#1A1A1A]/50 transition">
            <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white">Drop your sonar CSV file here or click to browse</p>
            <p className="text-xs text-slate-400 mt-1">Supports standard 60-channel acoustic readings (.csv)</p>
          </div>
        )}

        {activeTab === "sliders" && (
          <div>
            <button
              onClick={() => setShowSliders(!showSliders)}
              className="w-full py-3 px-4 bg-[#1A1A1A] border border-slate-700 rounded-2xl text-xs font-mono text-blue-400 flex items-center justify-between hover:bg-slate-800 transition"
            >
              <span>{showSliders ? "Hide" : "Expand"} 60-Channel Frequency Synthesizer Grid</span>
              {showSliders ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showSliders && (
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-10 gap-2 mt-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {features.map((val, idx) => (
                  <div key={idx} className="bg-[#1A1A1A] p-2 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
                      <span>S{idx + 1}</span>
                      <span className="text-blue-300">{val.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={val}
                      onChange={(e) => handleSliderChange(idx, parseFloat(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Focus AI Prediction Card */}
      {prediction && (
        <div className={`rounded-3xl p-8 border backdrop-blur-2xl relative overflow-hidden transition-all shadow-2xl ${
          prediction.prediction === "Mine"
            ? "bg-gradient-to-br from-red-950/40 via-[#2A2A2A] to-[#1A1A1A] border-red-500/40 shadow-red-500/10"
            : "bg-gradient-to-br from-blue-950/40 via-[#2A2A2A] to-[#1A1A1A] border-blue-500/40 shadow-blue-500/10"
        }`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
            <div className="flex items-center gap-6">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border shadow-xl ${
                prediction.prediction === "Mine"
                  ? "bg-red-500/10 border-red-500/40 text-red-400"
                  : "bg-blue-500/10 border-blue-500/40 text-blue-400"
              }`}>
                {prediction.prediction === "Mine" ? (
                  <AlertTriangle className="w-10 h-10 animate-pulse" />
                ) : (
                  <ShieldCheck className="w-10 h-10" />
                )}
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">AI Classification Target</div>
                <div className={`text-5xl font-black tracking-tight ${
                  prediction.prediction === "Mine" ? "text-red-400" : "text-blue-400"
                }`}>
                  {prediction.prediction.toUpperCase()}
                </div>
                <div className="text-xs text-slate-400 mt-1">Evaluated by Model: <span className="text-blue-300 font-semibold">{prediction.model_used}</span></div>
              </div>
            </div>

            {/* Confidence Score Display */}
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">Confidence Score</div>
                <div className="text-4xl font-black text-white">{prediction.confidence}%</div>
                <div className="text-xs text-blue-400 flex items-center justify-end gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Signal Certainty
                </div>
              </div>

              <button
                onClick={onDownloadPDF}
                className="px-6 py-4 bg-slate-900 border border-slate-700 hover:border-blue-400 text-white rounded-2xl font-semibold text-xs flex items-center gap-2 transition shadow-lg"
              >
                <FileText className="w-4 h-4 text-blue-400" /> Export PDF
              </button>
            </div>
          </div>

          {/* Top Feature Attributions (XAI) */}
          <div className="mt-8 pt-6 border-t border-slate-700/60">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Top Feature Attributions (Explainable AI)</h4>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {(prediction.top_features || []).map((item: any, idx: number) => (
                <div key={idx} className="bg-[#1A1A1A] p-3 rounded-2xl border border-slate-700/60">
                  <div className="text-[11px] text-slate-400 font-mono">{item.feature}</div>
                  <div className="text-lg font-bold text-blue-400 font-mono">{item.importance}%</div>
                  <div className="text-[10px] text-slate-400">Value: {item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
