"use client";

import { useState, useEffect } from "react";
import ModelComparison from "@/components/dashboard/ModelComparison";

export default function ModelComparisonPage() {
  const [benchmarks, setBenchmarks] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState<string>("Random Forest");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/models")
      .then((res) => res.json())
      .then((data) => {
        setBenchmarks(data);
        if (data.best_model) setSelectedModel(data.best_model);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">Multi-Model AI Benchmark Matrix</h2>
        <p className="text-xs text-neutral-400 mt-1">Cross-validation benchmarks comparing 9 machine learning classification algorithms</p>
      </div>

      <ModelComparison
        benchmarks={benchmarks}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
      />
    </div>
  );
}
