"use client";

import { Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ModelComparisonProps {
  benchmarks: any;
  selectedModel: string;
  onSelectModel: (name: string) => void;
}

export default function ModelComparison({ benchmarks, selectedModel, onSelectModel }: ModelComparisonProps) {
  if (!benchmarks || !benchmarks.metrics) return null;

  const modelList = Object.keys(benchmarks.metrics).map((name) => ({
    name,
    accuracy: benchmarks.metrics[name].accuracy,
    precision: benchmarks.metrics[name].precision,
    recall: benchmarks.metrics[name].recall,
    f1: benchmarks.metrics[name].f1,
    roc_auc: benchmarks.metrics[name].roc_auc,
  }));

  return (
    <div className="bg-[#2A2A2A]/80 border border-slate-700/60 backdrop-blur-2xl rounded-3xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="text-blue-400 w-6 h-6" /> Multi-Model AI Ensemble Comparison
          </h3>
          <p className="text-slate-400 text-sm">Evaluating 9 Classifier Architectures on Stratified Cross-Validation</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs px-4 py-1.5 rounded-full font-mono">
          Winner: <span className="font-bold">{benchmarks.best_model}</span>
        </div>
      </div>

      {/* Accuracy Comparison Chart */}
      <div className="h-[220px] w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={modelList} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} angle={-25} textAnchor="end" />
            <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: "#1A1A1A", borderColor: "#334155", color: "#fff" }} />
            <Bar dataKey="accuracy" name="Accuracy %" radius={[6, 6, 0, 0]}>
              {modelList.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.name === benchmarks.best_model ? "#3B82F6" : entry.name === selectedModel ? "#60A5FA" : "#475569"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Model Selection Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-700/60 text-slate-400 font-mono">
              <th className="py-3 px-4">Model</th>
              <th className="py-3 px-4">Accuracy</th>
              <th className="py-3 px-4">Precision</th>
              <th className="py-3 px-4">Recall</th>
              <th className="py-3 px-4">F1 Score</th>
              <th className="py-3 px-4">ROC-AUC</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {modelList.map((m) => {
              const isBest = m.name === benchmarks.best_model;
              const isSelected = m.name === selectedModel;
              return (
                <tr
                  key={m.name}
                  className={`hover:bg-slate-800/50 transition ${isSelected ? "bg-blue-950/30" : ""}`}
                >
                  <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                    {m.name}
                    {isBest && <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2.5 py-0.5 rounded-full border border-blue-500/30 font-normal">Best</span>}
                  </td>
                  <td className="py-3 px-4 font-mono text-blue-400 font-bold">{m.accuracy}%</td>
                  <td className="py-3 px-4 font-mono text-purple-400">{m.precision}%</td>
                  <td className="py-3 px-4 font-mono text-amber-400">{m.recall}%</td>
                  <td className="py-3 px-4 font-mono text-white font-bold">{m.f1}%</td>
                  <td className="py-3 px-4 font-mono text-blue-300">{m.roc_auc}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectModel(m.name)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                        isSelected
                          ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {isSelected ? "Active" : "Use Model"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
