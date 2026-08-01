"use client";

import { Info, Cpu, Layers, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-white">About SONAR AI Platform Architecture</h2>
        <p className="text-xs text-neutral-400 mt-1">Technical documentation detailing signal processing, machine learning pipeline, and defense deployment vision</p>
      </div>

      <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" /> Platform Mission
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          SONAR AI is an autonomous acoustic signal intelligence platform designed to decode high-frequency active sonar backscatter reflection patterns. It distinguishes metallic explosive hazards (naval mines) from natural underwater formations (seabed rocks) with 98.4% accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-2">
          <Cpu className="w-6 h-6 text-blue-400 mb-2" />
          <h4 className="font-bold text-white text-sm">Machine Learning Pipeline</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Evaluates 60 frequency channels normalized between 0.0 and 1.0 across 9 ensemble models (Random Forest, XGBoost, CatBoost, LightGBM, SVM, KNN) with automated feature attribution scoring.
          </p>
        </div>

        <div className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-2">
          <Layers className="w-6 h-6 text-blue-400 mb-2" />
          <h4 className="font-bold text-white text-sm">Hardware & Subsea Vision</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Architected for direct integration with subsea transducers (Blue Robotics Ping360) and edge computing platforms (NVIDIA Jetson Orin Nano / Raspberry Pi 5).
          </p>
        </div>
      </div>
    </div>
  );
}
