"use client";
import Link from "next/link";
import { useWallet } from "./WalletProvider";

export default function Navbar() {
  const { isConnected, connectWallet, disconnectWallet, isConnecting, walletAddress } = useWallet();

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-widest text-white">VIGIL</span>
            <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-[0.2em] leading-none">Midnight ZK</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-8 text-sm font-medium">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-purple-500 hover:after:w-full after:transition-all">Dashboard</Link>
            <Link href="/claim" className="text-gray-400 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all">Claim Portal</Link>
          </div>
          
          <div className="flex items-center gap-2">
            {!isConnected ? (
              <button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 btn-gradient text-white border border-white/10 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="px-5 py-2 rounded-full font-bold transition-all flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>{walletAddress ?? "Lace connected"}</span>
                </div>
                <button
                  onClick={disconnectWallet}
                  title="Disconnect Wallet"
                  className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all text-xs"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
