"use client";
import { useState } from "react";
import { MockMidnightSDK } from "@/lib/midnightMock";
import { useWallet } from "@/components/WalletProvider";

export default function Dashboard() {
  const [status, setStatus] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, connectWallet, isConnecting } = useWallet();

  const handlePing = async () => {
    setIsProcessing(true);
    setStatus("Generating Zero-Knowledge Proof of Ownership...");
    await MockMidnightSDK.generatePingProof();
    setStatus("Proof Validated! Heartbeat timer reset to 90 Days.");
    setIsProcessing(false);
  };

  const handleCancel = async () => {
    setIsProcessing(true);
    setStatus("Generating ZK Proof to cancel vault...");
    await MockMidnightSDK.generateCancelProof();
    setStatus("Vault Cancelled. Funds unshielded and returned to your wallet.");
    setIsProcessing(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center p-6 md:p-12 pt-32 relative">
      <div className="glow-orb top-0 left-1/3" />
      
      <div className="max-w-4xl w-full z-10">
        <div className="mb-10">
          <h2 className="text-4xl font-black mb-3 tracking-tight">Owner Dashboard</h2>
          <p className="text-gray-400 text-lg">Manage your shielded inheritance vault and broadcast your proof of life.</p>
        </div>
        
        {!isConnected ? (
          <div className="glass-panel rounded-3xl p-12 text-center border border-white/5 shadow-2xl">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Authentication Required</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">In Web3, your wallet is your identity. Please connect your Lace Wallet to access your shielded vault.</p>
            <button 
              onClick={connectWallet}
              disabled={isConnecting}
              className="btn-gradient px-8 py-4 rounded-xl font-bold text-white text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 inline-flex items-center gap-2"
            >
              {isConnecting ? "Connecting..." : "Connect Lace Wallet"}
            </button>
          </div>
        ) : (
          <>
            {status && (
              <div className="glass-panel border-blue-500/50 text-blue-300 px-6 py-4 rounded-xl mb-8 flex items-center gap-3 animate-pulse">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <span className="font-medium">{status}</span>
              </div>
            )}

            <div className="glass-panel rounded-3xl p-8 md:p-10 mb-8 border border-white/5 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-white/10 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Active Vault</h3>
                    <p className="text-sm font-mono text-gray-400">ID: 0x8fB3...9A1c</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm font-bold tracking-wide flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  STATUS: HEALTHY
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-sm font-semibold uppercase tracking-wider">Interval</span>
                  </div>
                  <p className="text-4xl font-black text-white">90 <span className="text-xl text-gray-500 font-medium">Days</span></p>
                </div>
                
                <div className="bg-blue-900/10 rounded-2xl p-6 border border-blue-500/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20">
                    <div className="h-full bg-blue-500 w-[95%]" />
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-sm font-semibold uppercase tracking-wider">Time until unlock</span>
                  </div>
                  <p className="text-4xl font-mono font-black text-white tracking-tight">89<span className="text-xl text-blue-400 mx-1">d</span> 14<span className="text-xl text-blue-400 mx-1">h</span></p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handlePing}
                  disabled={isProcessing}
                  className="flex-1 btn-gradient text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  Ping (Proof of Life)
                </button>
                <button 
                  onClick={handleCancel}
                  disabled={isProcessing}
                  className="flex-1 bg-red-500/10 text-red-400 border border-red-500/20 py-4 rounded-xl font-bold text-lg hover:bg-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel Vault
                </button>
              </div>
              
              <div className="mt-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm text-gray-400 leading-relaxed">
                  <strong>Privacy Preserved:</strong> Pinging generates a local Zero-Knowledge proof. The network only verifies your heartbeat; your identity and wallet balances remain hidden on the Midnight blockchain.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
