"use client";

import { useState } from "react";
import PredictionDashboard from "@/components/dashboard/PredictionDashboard";
import AIAssistant from "@/components/assistant/AIAssistant";

export default function LivePredictionPage() {
  const [selectedModel, setSelectedModel] = useState<string>("Random Forest");
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (features: number[]) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features, model_name: selectedModel }),
      });
      const data = await res.json();
      setPrediction(data);
    } catch (e) {
      console.error("Prediction error", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!prediction) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: Array.from({ length: 60 }, () => 0.05),
          model_name: selectedModel,
        }),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "SONAR_AI_Defense_Report.pdf";
      a.click();
    } catch (e) {
      console.error("PDF download error", e);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">Live Sonar Signal Synthesizer & Predictor</h2>
        <p className="text-xs text-neutral-400 mt-1">Adjust 60 frequency channels, upload CSV files, or trigger random dataset pulses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PredictionDashboard
            onPredict={handlePredict}
            prediction={prediction}
            loading={loading}
            onDownloadPDF={handleDownloadPDF}
          />
        </div>

        <div>
          <AIAssistant lastPrediction={prediction} />
        </div>
      </div>
    </div>
  );
}
