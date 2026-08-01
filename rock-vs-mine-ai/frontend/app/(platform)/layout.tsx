"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Radio,
  PieChartIcon,
  Award,
  Activity,
  History,
  Settings,
  Shield,
  HelpCircle,
  Code2,
  Lock,
  Info,
  ChevronDown
} from "lucide-react";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Live Prediction", href: "/live-prediction", icon: Radio },
    { name: "Dataset Explorer", href: "/dataset", icon: PieChartIcon },
    { name: "Model Comparison", href: "/model-comparison", icon: Award },
    { name: "Performance", href: "/performance", icon: Activity },
    { name: "History", href: "/history", icon: History },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Admin", href: "/admin", icon: Lock },
    { name: "About", href: "/about", icon: Info },
    { name: "Help", href: "/help", icon: HelpCircle },
    { name: "API Docs", href: "/api-docs", icon: Code2 },
  ];

  return (
    <div className="flex h-screen w-screen bg-[#1F1F1F] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#262626] via-[#1F1F1F] to-[#141414] text-slate-200 overflow-hidden font-sans select-none">
      {/* Persistent Active Sidebar */}
      <aside className="w-60 bg-[#161b26] border-r border-neutral-800 flex flex-col justify-between shrink-0 z-20">
        <div>
          {/* Logo Header */}
          <Link href="/" className="p-4 border-b border-neutral-800 flex items-center gap-3 block hover:bg-neutral-900/50 transition">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white tracking-wide">SONAR AI</h1>
              <p className="text-[9px] text-blue-400 font-mono tracking-widest uppercase">Defense Platform 2.0</p>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="p-3 space-y-1 text-xs font-semibold max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                    isActive
                      ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/25"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-neutral-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer System Status */}
        <div className="p-4 border-t border-neutral-800 text-[10px] text-neutral-400 font-mono flex items-center justify-between">
          <span>System Status:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE
          </span>
        </div>
      </aside>

      {/* Main Content View Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
        {/* Page View Viewport */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
