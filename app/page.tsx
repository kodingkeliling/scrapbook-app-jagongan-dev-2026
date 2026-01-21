"use client";

import { useState } from "react";
import MemoryForm from "@/components/features/memory-form";
import MemoryList from "@/components/features/memory-list";
import { useAuthStore } from "@/stores/use-auth-store";
import CyberButton from "@/components/shared/cyber-button";
import { LogOut, User } from "lucide-react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { user, logout, accessToken } = useAuthStore();

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase glitch-text tracking-tighter mb-2">
            Kenangan
            <span className="block text-primary non-italic">Jago NganDev</span>
          </h1>
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
            [ Neural Scrapbook v1.0.4 ]
          </p>
        </div>

        <div className="flex items-center gap-4">
          {accessToken && user && (
            <div className="hidden md:flex items-center gap-3 bg-zinc-900/80 p-2 pr-4 border-l-4 border-secondary border-y border-zinc-800 clip-path-cyber">
              <img
                src={user.picture}
                alt={user.name}
                className="w-10 h-10 rounded-none border border-secondary"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-[10px] text-secondary uppercase font-bold tracking-tighter">Connected Account</span>
                <span className="text-xs text-white font-mono">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="ml-2 p-2 hover:bg-accent hover:text-white transition-colors text-zinc-500"
                title="Disconnect Neural Link"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
          <MemoryForm onSuccess={handleRefresh} />
        </div>
      </header>

      {/* Main Content */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] flex-grow bg-gradient-to-r from-primary to-transparent"></div>
          <h2 className="text-2xl font-bold uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="w-3 h-3 bg-primary animate-pulse"></span>
            Memory Feed
          </h2>
          <div className="h-[2px] flex-grow bg-gradient-to-l from-primary to-transparent"></div>
        </div>

        <MemoryList refreshKey={refreshKey} />
      </section>

      {/* Footer Decor */}
      <footer className="mt-32 pt-8 border-t border-zinc-800 text-center">
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
          &copy; 2026 Night City Development Lab // All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
