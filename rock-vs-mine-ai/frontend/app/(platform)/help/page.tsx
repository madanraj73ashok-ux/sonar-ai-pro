"use client";

import { HelpCircle, ChevronDown } from "lucide-react";

export default function HelpPage() {
  const faqs = [
    {
      q: "How does the AI classify Rocks vs Mines?",
      a: "Active sonar emits acoustic sound waves. Metallic mine hulls create sharp, high-intensity backscatter reflection spikes, whereas natural rocks absorb and diffuse frequencies unevenly across the 60 channels."
    },
    {
      q: "How do I upload custom CSV datasets?",
      a: "Navigate to Live Prediction or Dataset Explorer, click 'Upload CSV', and select your file. The CSV must contain 60 numerical frequency columns."
    },
    {
      q: "Which model is recommended for inference?",
      a: "Random Forest, KNN, and CatBoost typically achieve the highest ROC-AUC scores (over 0.95) on sonar backscatter profiles."
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-white">Help & Frequently Asked Questions</h2>
        <p className="text-xs text-neutral-400 mt-1">Documentation guide on sonar physics, model interpretation, and dataset formatting</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-[#262626] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-2">
            <h3 className="font-bold text-white text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-400" /> {faq.q}
              </span>
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed pt-1">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
