"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Note: Midnight uses the DApp Connector API standard
  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // In a real environment, the Lace wallet injects into window.midnight.mnLace
      const midnightObj = (window as any).midnight;
      if (midnightObj && midnightObj.mnLace) {
        const api: any = await midnightObj.mnLace.enable();
        // Fallback or real extraction of state depending on API version
        setIsConnected(true);
        setWalletAddress("0xLace...Connected"); 
      } else {
        alert("Lace Wallet with Midnight support not found. Please install the extension.");
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <WalletContext.Provider value={{ isConnected, walletAddress, connectWallet, isConnecting }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
