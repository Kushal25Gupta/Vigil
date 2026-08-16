"use client";

import React, { createContext, useContext, useState } from "react";

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  walletMode: "lace" | "demo" | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

type MidnightNetwork = "preprod" | "preview";

interface InitialWalletApi {
  name?: string;
  rdns?: string;
  connect: (networkId: MidnightNetwork) => Promise<ConnectedWalletApi>;
}

interface ConnectedWalletApi {
  state?: () => Promise<{ address?: string }>;
  getUnshieldedAddress?: () => Promise<string>;
  getShieldedAddress?: () => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);
const DETECTION_TIMEOUT_MS = 3_000;
const DETECTION_INTERVAL_MS = 150;

function isInitialWalletApi(value: unknown): value is InitialWalletApi {
  return typeof value === "object" && value !== null &&
    typeof (value as InitialWalletApi).connect === "function";
}

function findWallet(): InitialWalletApi | null {
  if (typeof window === "undefined") return null;

  const injectedWallets = Object.values(
    (window as Window & { midnight?: Record<string, unknown> }).midnight ?? {},
  ).filter(isInitialWalletApi);

  // Lace exposes an alias in some versions, but DApp Connector v4 wallets can
  // also be registered under a generated key.
  return injectedWallets.find((wallet) =>
    wallet.name?.toLowerCase().includes("lace") || wallet.rdns?.toLowerCase().includes("lace"),
  ) ?? injectedWallets[0] ?? null;
}

async function waitForWallet(): Promise<InitialWalletApi | null> {
  const immediatelyAvailable = findWallet();
  if (immediatelyAvailable) return immediatelyAvailable;

  return new Promise((resolve) => {
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      const wallet = findWallet();
      if (wallet || Date.now() - startedAt >= DETECTION_TIMEOUT_MS) {
        window.clearInterval(interval);
        resolve(wallet);
      }
    }, DETECTION_INTERVAL_MS);
  });
}

async function resolveWalletAddress(api: ConnectedWalletApi): Promise<string | null> {
  try {
    if (api.getUnshieldedAddress) return api.getUnshieldedAddress();
    if (api.getShieldedAddress) return api.getShieldedAddress();

    const state = api.state ? await api.state() : null;
    return state?.address ?? null;
  } catch (error) {
    // A connected API is still valid if this optional display field differs
    // between connector versions.
    console.warn("Could not read the wallet address:", error);
    return null;
  }
}

function configuredNetwork(): MidnightNetwork {
  return process.env.NEXT_PUBLIC_MIDNIGHT_NETWORK === "preview" ? "preview" : "preprod";
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletMode, setWalletMode] = useState<"lace" | "demo" | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);

    try {
      const wallet = await waitForWallet();
      if (!wallet) {
        const useDemoWallet = window.confirm(
          "No Midnight-compatible Lace wallet was detected.\n\nUse a demo wallet to explore simulated flows? This does not connect a wallet or submit blockchain transactions.",
        );

        if (useDemoWallet) {
          await new Promise((resolve) => window.setTimeout(resolve, 400));
          setIsConnected(true);
          setWalletAddress("Demo wallet");
          setWalletMode("demo");
        }
        return;
      }

      // DApp Connector API v4: connect(), not the legacy enable() method.
      // This opens Lace's authorization prompt for the selected network.
      const api = await wallet.connect(configuredNetwork());
      const address = await resolveWalletAddress(api);

      const finalAddress = address ?? "Lace connected";
      setIsConnected(true);
      setWalletAddress(finalAddress);
      setWalletMode("lace");
    } catch (error) {
      console.error("Wallet connection failed:", error);
      const reason = error instanceof Error ? error.message : "Unknown wallet error";
      window.alert(`Lace could not connect: ${reason}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setWalletMode(null);
  };

  return (
    <WalletContext.Provider value={{ isConnected, walletAddress, walletMode, connectWallet, disconnectWallet, isConnecting }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within a WalletProvider");
  return context;
}
