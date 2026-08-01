"use client";

import { useState } from "react";
import { Lock, RefreshCw, Upload, Trash2, CheckCircle2, ShieldAlert } from "lucide-react";

export default function AdminPage() {
  const [retraining, setRetraining] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleRetrain = async () => {
    setRetraining(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/retrain", { method: "POST" });
      const data = await res.json();
      setStatusMsg(data.message);
    } catch {
      setStatusMsg("Retraining error. Verify FastAPI server.");
    } finally {
      setRetraining(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-white">Admin Management & Model Control</h2>
        <p className="text-xs text-neutral-400 mt-1">Superuser controls for dataset retraining, model retraining, and system logs</p>
      </div>

      <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h3 className="text-sm font-bold text-white font-mono uppercase border-b border-neutral-800 pb-3 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-blue-400" /> Retrain Multi-Model Ensemble
        </h3>

        <p className="text-xs text-neutral-300">
          Triggers a full cross-validation retraining pipeline across all 9 classifiers (Random Forest, XGBoost, CatBoost, LightGBM, SVM, KNN, Logistic Regression).
        </p>

        <button
          onClick={handleRetrain}
          disabled={retraining}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-blue-600/25"
        >
          <RefreshCw className={`w-4 h-4 ${retraining ? "animate-spin" : ""}`} />
          {retraining ? "Retraining Models..." : "Trigger Model Retraining"}
        </button>

        {statusMsg && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {statusMsg}
          </div>
        )}
      </div>

      <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white font-mono uppercase border-b border-neutral-800 pb-3 flex items-center gap-2">
          <Upload className="w-4 h-4 text-blue-400" /> Upload New Sonar Training Dataset
        </h3>

        <div className="border-2 border-dashed border-neutral-700 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer transition">
          <Upload className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <span className="text-xs font-semibold text-white">Click or drag new sonar CSV file to upload</span>
        </div>
      </div>
    </div>
  );
}
