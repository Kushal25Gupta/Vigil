"use client";
import { useState } from "react";
import { MockMidnightSDK } from "@/lib/midnightMock";
import { useWallet } from "@/components/WalletProvider";

export default function Claim() {
  const [vaultId, setVaultId] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, connectWallet, isConnecting, walletMode } = useWallet();

  const handleClaim = async () => {
    setIsProcessing(true);
    setStatus("Verifying time-lock and generating ZK Heir Identity Proof...");
    const result = await MockMidnightSDK.generateClaimProof(vaultId);
    setStatus(result.message);
    setIsProcessing(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6  relative">
      <div className="glow-orb top-1/4 right-1/4" style={{ background: '#ec4899', animationDelay: '1s' }} />

      <div className="max-w-xl w-full z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-4xl font-black mb-3 text-white">Claim Portal</h2>
          <p className="text-gray-400 text-lg">
            Provide the Vault ID to generate your ZK identity proof and unlock the shielded funds.
          </p>
        </div>
        
        {!isConnected ? (
          <div className="glass-panel p-10 md:p-12 rounded-3xl text-center border border-white/5 shadow-2xl backdrop-blur-xl bg-black/40">
             <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Connect Wallet to Claim</h3>
            <p className="text-gray-400 mb-8">You must connect your Web3 wallet to securely interact with the Midnight blockchain and claim your inheritance.</p>
            <button 
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full btn-gradient py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2 text-white"
            >
              {isConnecting ? "Connecting..." : "Connect Lace Wallet"}
            </button>
          </div>
        ) : (
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-black/40">
            <div className={`mb-8 rounded-xl border px-5 py-4 text-sm ${
              walletMode === "demo"
                ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                : "border-blue-500/30 bg-blue-500/10 text-blue-200"
            }`}>
              {walletMode === "demo" ? (
                <><strong>Demo mode:</strong> no wallet is connected and this claim flow is simulated.</>
              ) : (
                <><strong>Lace connected:</strong> this MVP claim flow is simulated and does not yet submit a Midnight transaction.</>
              )}
            </div>
            {status && (
              <div className={`px-6 py-4 rounded-xl mb-8 flex items-center gap-3 ${
                status.includes("Valid") 
                  ? "bg-green-500/10 border border-green-500/30 text-green-400" 
                  : "bg-blue-500/10 border border-blue-500/30 text-blue-400 animate-pulse"
              }`}>
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {status.includes("Valid") 
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  }
                </svg>
                <span className="font-medium">{status}</span>
              </div>
            )}

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Secure Vault ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <input 
                    type="text" 
                    value={vaultId}
                    onChange={(e) => setVaultId(e.target.value)}
                    placeholder="e.g. 0x8fB3...9A1c" 
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-4 text-white text-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleClaim}
              disabled={isProcessing || !vaultId}
              className="w-full btn-gradient text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Simulate Claim Verification
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  The smart contract enforces a strict time-lock. If the interval has lapsed, this portal generates a Zero-Knowledge proof of your identity on your local device. The Midnight network validates the proof without exposing your wallet address or the inherited amount.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
