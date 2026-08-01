"use client";

import { useState } from "react";
import { Play, RotateCcw, Cpu, Sparkles, AlertTriangle, ShieldCheck } from "lucide-react";

interface LiveSlidersProps {
  onPredict: (features: number[]) => void;
  loading: boolean;
  predictionResult: any;
}

export default function LiveSliders({ onPredict, loading, predictionResult }: LiveSlidersProps) {
  // 60 frequency sliders initialized with default sample baseline
  const [features, setFeatures] = useState<number[]>(
    Array.from({ length: 60 }, (_, i) => roundVal(0.02 + (Math.sin(i / 5) + 1) * 0.25))
  );

  function roundVal(v: number) {
    return Math.min(1.0, Math.max(0.0, Math.round(v * 10000) / 10000));
  }

  const handleSliderChange = (index: number, val: number) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const handleRandomize = () => {
    const randomized = Array.from({ length: 60 }, () => roundVal(Math.random()));
    setFeatures(randomized);
    onPredict(randomized);
  };

  return (
    <div className="bg-slate-950/70 border border-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-cyan-500/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Cpu className="text-cyan-400 w-6 h-6" /> Live Frequency Synthesizer
          </h2>
          <p className="text-slate-400 text-sm">Adjust 60 sonar acoustic signal channels in real-time</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRandomize}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-cyan-300 rounded-lg text-sm transition border border-cyan-500/30"
          >
            <RotateCcw className="w-4 h-4" /> Random Frequency
          </button>
          <button
            onClick={() => onPredict(features)}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold rounded-lg text-sm transition shadow-lg shadow-cyan-500/25"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            Analyze Frequencies
          </button>
        </div>
      </div>

      {/* Result Indicator Banner */}
      {predictionResult && (
        <div className={`mb-6 p-4 rounded-xl border flex items-center justify-between ${
          predictionResult.prediction === "Mine" 
            ? "bg-red-950/40 border-red-500/40 text-red-300"
            : "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
        }`}>
          <div className="flex items-center gap-3">
            {predictionResult.prediction === "Mine" ? (
              <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
            ) : (
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            )}
            <div>
              <div className="text-xs uppercase tracking-wider opacity-75">Classification Result</div>
              <div className="text-2xl font-black">{predictionResult.prediction.toUpperCase()}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs uppercase tracking-wider opacity-75">AI Confidence</div>
            <div className="text-2xl font-black">{predictionResult.confidence}%</div>
            <div className="text-xs text-slate-400">Model: {predictionResult.model_used}</div>
          </div>
        </div>
      )}

      {/* 60 Signal Sliders Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {features.map((val, idx) => (
          <div key={idx} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition">
            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1 font-mono">
              <span>S-{idx + 1}</span>
              <span className="text-cyan-300">{val.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={val}
              onChange={(e) => handleSliderChange(idx, parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
