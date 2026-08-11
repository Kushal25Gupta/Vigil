/**
 * Mock Midnight.js SDK integration.
 * Simulates Zero-Knowledge proof generation and shielded state transactions.
 */

export const MockMidnightSDK = {
  connectWallet: async (): Promise<string> => {
    return new Promise((resolve) => setTimeout(() => resolve("0x8fB3...9A1c"), 800));
  },
  generatePingProof: async (): Promise<boolean> => {
    return new Promise((resolve) => setTimeout(() => resolve(true), 2500));
  },
  generateCancelProof: async (): Promise<boolean> => {
    return new Promise((resolve) => setTimeout(() => resolve(true), 3000));
  },
  generateClaimProof: async (vaultId: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!vaultId) resolve({ success: false, message: "Invalid Vault ID" });
        resolve({ success: true, message: "ZK Proof Validated! Funds unshielded." });
      }, 3500);
    });
  }
};
