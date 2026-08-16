"use client";
import React, { createContext, useContext, useState } from "react";

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

function getWalletConnector(): any {
  if (typeof window === "undefined") return null;

  const globalWindow = window as any;

  return (
    globalWindow?.midnight?.mnLace ??
    globalWindow?.midnight?.connector ??
    globalWindow?.lace ??
    globalWindow?.midnight ??
    null
  );
}

async function resolveWalletAddress(api: any): Promise<string | null> {
  if (!api) return null;

  try {
    const usedAddresses = api.getUsedAddresses ? await api.getUsedAddresses() : null;
    if (Array.isArray(usedAddresses) && usedAddresses.length > 0) {
      return usedAddresses[0];
    }

    const unusedAddresses = api.getUnusedAddresses ? await api.getUnusedAddresses() : null;
    if (Array.isArray(unusedAddresses) && unusedAddresses.length > 0) {
      return unusedAddresses[0];
    }

    const address = api.address ?? api.wallet?.address ?? api.account?.address ?? null;
    if (address) return String(address);
  } catch (error) {
    console.warn("Unable to read wallet address from connector:", error);
  }

  return null;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);

    try {
      const connector = getWalletConnector();

      if (connector) {
        const api = typeof connector.enable === "function" ? await connector.enable() : connector;
        const resolvedAddress = await resolveWalletAddress(api);

        setIsConnected(true);
        setWalletAddress(resolvedAddress ?? "0xLace...Connected");
        return;
      }

      const useMock = window.confirm(
        "Midnight Lace Wallet extension not detected.\n\nSince this is a demo environment, would you like to proceed using a Test Wallet to explore the application?"
      );

      if (useMock) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsConnected(true);
        setWalletAddress("0xMock...B7a2");
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
      window.alert(
        "The Lace extension was detected but could not be enabled. Please reload the page and approve wallet access in Lace."
      );
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
