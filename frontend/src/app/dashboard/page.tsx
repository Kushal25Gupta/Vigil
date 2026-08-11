export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col items-center p-12">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-2">Owner Dashboard</h2>
        <p className="text-gray-400 mb-8">Manage your shielded inheritance vault and broadcast your proof of life.</p>
        
        {/* Mock Vault Status Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-1">Active Vault</h3>
              <p className="text-sm text-gray-500">ID: 0x8f...3b9a (Shielded)</p>
            </div>
            <div className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-800/50 rounded-full text-sm font-medium">
              Healthy
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-gray-500 text-sm mb-1">Interval</p>
              <p className="text-2xl font-mono">90 Days</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Time until unlock</p>
              <p className="text-2xl font-mono text-white">89d 14h 22m</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="flex-1 bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
              Ping (Proof of Life)
            </button>
            <button className="flex-1 bg-red-900/20 text-red-400 border border-red-900/50 py-3 rounded-lg font-bold hover:bg-red-900/40 transition-colors">
              Cancel Vault
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            * Pinging generates a local ZK proof ensuring your identity remains hidden on-chain.
          </p>
        </div>
      </div>
    </div>
  );
}
