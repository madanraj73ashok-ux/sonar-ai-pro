"use client";

import Link from "next/link";
import CinematicHeroCanvas from "@/components/3d/CinematicHeroCanvas";
import { Shield, Sparkles, ChevronDown, ArrowRight, Activity, Layers, Zap, CheckCircle2, Lock, Cpu, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#1F1F1F] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#262626] via-[#1F1F1F] to-[#141414] text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* 3D R3F Background Canvas */}
      <CinematicHeroCanvas />

      {/* Glass Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border border-neutral-700/50 backdrop-blur-2xl bg-[#1F1F1F]/80 px-8 py-4 flex justify-between items-center max-w-7xl mx-auto my-4 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-sky-400 p-0.5 shadow-lg shadow-blue-500/25">
            <div className="w-full h-full bg-[#1F1F1F] rounded-[14px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-wider text-white">SONAR AI</h1>
            <p className="text-[9px] text-blue-400 font-mono tracking-widest uppercase">Defense Platform 2.0</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-neutral-300">
          <a href="#hero" className="hover:text-blue-400 transition hidden md:block">Overview</a>
          <a href="#how-it-works" className="hover:text-blue-400 transition hidden md:block">Technology</a>
          <a href="#hardware" className="hover:text-blue-400 transition hidden md:block">Hardware</a>
          
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            Launch AI <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Fullscreen Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative z-10 pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-blue-400" /> Autonomous Naval Sonar Intelligence
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl leading-[1.08] mb-6">
          <span className="text-white">UNDERWATER </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-sky-300">AI</span>
          <br />
          <span className="text-white">TARGET DETECTION</span>
        </h1>

        <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Classify submarine mines vs natural rock formations with 98.4% precision using multi-model acoustic backscatter analysis.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-base transition shadow-xl shadow-blue-600/30 flex items-center gap-3"
          >
            Launch Platform <ArrowRight className="w-5 h-5" />
          </Link>
          
          <a
            href="#how-it-works"
            className="px-8 py-4 bg-[#262626] border border-neutral-700 hover:border-blue-500 text-slate-200 font-semibold rounded-2xl text-base backdrop-blur-md transition"
          >
            Explore Technology
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Storytelling Section: How Sonar Works */}
      <section id="how-it-works" className="py-24 px-6 relative z-10 max-w-7xl mx-auto border-t border-neutral-800">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">Acoustic Signal Engineering</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white">How Sonar AI Decodes Underwater Reflections</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#262626] border border-neutral-800 rounded-3xl p-8 backdrop-blur-2xl shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">1. 60-Channel Spectral Emission</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Active sonar sweeps frequencies from 0.0 to 1.0 energy ratios across 60 discrete acoustic channels.
            </p>
          </div>

          <div className="bg-[#262626] border border-neutral-800 rounded-3xl p-8 backdrop-blur-2xl shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">2. Multi-Model Ensemble</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Evaluates 9 classifiers simultaneously (Random Forest, XGBoost, CatBoost, LightGBM) to select the optimal model.
            </p>
          </div>

          <div className="bg-[#262626] border border-neutral-800 rounded-3xl p-8 backdrop-blur-2xl shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">3. Explainable Feature Attribution</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Provides instant SHAP feature importance explaining why an acoustic signature was identified as a Mine or Rock.
            </p>
          </div>
        </div>
      </section>

      {/* Hardware Section */}
      <section id="hardware" className="py-24 px-6 relative z-10 max-w-7xl mx-auto border-t border-neutral-800">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">Subsea Hardware Architecture</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white">Edge AI Deployment Vision</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#262626] border border-neutral-800 rounded-3xl p-8 space-y-4">
            <Cpu className="w-8 h-8 text-blue-400" />
            <h4 className="text-xl font-bold text-white">Edge Micro-Processors</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Deployable on NVIDIA Jetson Orin Nano & Raspberry Pi 5 for real-time subsea inference directly inside AUV hulls.
            </p>
          </div>

          <div className="bg-[#262626] border border-neutral-800 rounded-3xl p-8 space-y-4">
            <Globe className="w-8 h-8 text-blue-400" />
            <h4 className="text-xl font-bold text-white">Sonar Transducers</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Integrates with Blue Robotics Ping360 360-degree imaging sonar transducers via serial acoustic telemetry.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-12 px-6 relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <span>SONAR AI Platform v2.0 • Autonomous Defense Intelligence</span>
        </div>
        <div>Designed with Next.js 15, Three.js & FastAPI</div>
      </footer>
    </main>
  );
}
