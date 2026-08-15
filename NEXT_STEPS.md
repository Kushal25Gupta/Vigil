# 🏁 Finishing the Vigil MVP (Personal Machine Handoff)

This document outlines exactly what is needed to complete the Vigil project on an unrestricted personal network. It tracks our current progress and the exact steps required to replace the mock frontend with the real Midnight Blockchain integration.

## 🎯 The Goal
To finalize **Vigil**, a Zero-Knowledge (ZK) Proof-of-Life inheritance protocol. The final deliverable must connect a user's wallet, generate ZK proofs locally, and interact with a deployed `Compact` smart contract on the Midnight DevNet/Testnet.

## ✅ What We Have Completed
We have successfully built the entire Web2/UI infrastructure:
* **Production Frontend:** A Next.js (v15+) React frontend styled with Tailwind v4 (glassmorphism, gradients, animations).
* **Dockerized Environment:** The frontend is fully containerized and runs with a single `./run.sh` script.
* **UI Logic & Guards:** The Dashboard and Claim portals are protected by wallet connection guards.
* **Mock Architecture:** We built `MockMidnightSDK` to simulate the network delay, ZK proof generation, and wallet connections so the UI can be tested entirely offline.

## ❌ What We Are Missing
Because of network package restrictions on the previous development machine, we could not download the official Midnight CLI tools or compiler. We are currently missing:
1. **The Compact Compiler:** The tool used to compile `.compact` smart contract files.
2. **The Deployed Contract:** The actual smart contract deployed to the Midnight network.
3. **The Real SDK Wiring:** Replacing `MockMidnightSDK` with real transactions via `@midnight-ntwrk/midnight-js`.

---

## 🛠️ Action Plan (Execute on Personal Laptop)

### Step 1: Install the Required Wallet Extension
To interact with the Midnight network, you need the specialized Lace Wallet.
* **Extension:** Lace Wallet (Midnight Network Edition)
* **Resource:** Follow the official Midnight Developer Portal or [Lace.io](https://www.lace.io/) to install the specific build that supports the Midnight DevNet.

### Step 2: Acquire Test Tokens (Faucet)
You will need tDUST (or the current Midnight test token) to deploy the contract and test transactions.
* **Resource:** Visit the official [Midnight Faucet](https://faucet.midnight.network/) or check the Midnight Discord for the active faucet URL.

### Step 3: Install the Midnight Compact Compiler
On your unrestricted network, install the compiler and the DApp connector tools.
* **Command:** `npm install -g @midnight-ntwrk/compactc` (Check official docs for the exact package name if it has been updated for the hackathon).
* **Resource:** [Midnight Official Documentation](https://docs.midnight.network/)

### Step 4: Compile and Deploy the Smart Contract
1. Write the inheritance logic in a file named `vigil.compact`.
2. Compile it using the CLI: `compactc vigil.compact`
3. Deploy the compiled contract to the network and save the **Contract Address**.

### Step 5: Replace the Mock SDK
Once the contract is live, swap out our mock logic.
1. Open `frontend/src/lib/midnightMock.ts` and `frontend/src/components/WalletProvider.tsx`.
2. Remove the mock `setTimeout` delays.
3. Import the real `@midnight-ntwrk/midnight-js` SDK and pass your deployed Contract Address to route the frontend buttons (Ping, Cancel, Claim) to the actual blockchain.

### Important Links & Resources for Validation
* **Midnight Docs:** [https://docs.midnight.network/](https://docs.midnight.network/) (Use this to validate the exact compiler commands and contract syntax).
* **Midnight Block Explorer:** Use the testnet explorer provided in the docs to validate that your contract deployment and Ping transactions actually went through.
