"use client";
import { useState } from "react";
import { MockMidnightSDK } from "@/lib/midnightMock";

export default function Claim() {
  const [vaultId, setVaultId] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClaim = async () => {
    setIsProcessing(true);
    setStatus("Verifying time-lock and generating ZK Heir Identity Proof...");
    const result = await MockMidnightSDK.generateClaimProof(vaultId);
    setStatus(result.message);
    setIsProcessing(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-2 text-center">Claim Portal</h2>
        <p className="text-gray-400 text-sm mb-8 text-center">
          Provide the Vault ID and generate a ZK proof of heir identity to unlock shielded funds.
        </p>
        
        {status && (
          <div className={`px-4 py-3 rounded-lg mb-6 text-sm ${
            status.includes("Valid") 
              ? "bg-green-900/30 border border-green-800 text-green-300" 
              : "bg-blue-900/30 border border-blue-800 text-blue-300 animate-pulse"
          }`}>
            {status}
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Vault ID</label>
            <input 
              type="text" 
              value={vaultId}
              onChange={(e) => setVaultId(e.target.value)}
              placeholder="e.g. 0x8f...3b9a" 
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>
        
        <button 
          onClick={handleClaim}
          disabled={isProcessing || !vaultId}
          className="w-full bg-white text-black py-4 rounded-lg font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Verify & Claim
        </button>
        
        <div className="mt-6 p-4 bg-black border border-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>How it works:</strong> The Midnight smart contract will verify if the interval has lapsed. If true, your browser will generate a zero-knowledge proof that you are the designated heir without revealing your identity to the network.
          </p>
        </div>
      </div>
    </div>
  );
}
