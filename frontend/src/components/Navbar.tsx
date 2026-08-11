"use client";
import { useWallet } from "./WalletProvider";

export default function Navbar() {
  const { isConnected, connectWallet, isConnecting, walletAddress } = useWallet();

  return (
    <nav className="w-full border-b border-gray-800 bg-black text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-wider">VIGIL</span>
        <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Midnight ZK</span>
      </div>
      
      <div className="flex items-center gap-6 text-sm font-medium">
        <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
        <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Owner Dashboard</a>
        <a href="/claim" className="text-gray-400 hover:text-white transition-colors">Claim Portal</a>
        
        <button 
          onClick={connectWallet}
          disabled={isConnected || isConnecting}
          className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect Lace Wallet"}
        </button>
      </div>
    </nav>
  );
}
