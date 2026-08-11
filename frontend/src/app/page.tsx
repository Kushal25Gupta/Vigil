export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold mb-6 tracking-tighter">
        Inheritance, <span className="text-gray-500">Shielded.</span>
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl mb-12">
        Vigil is a trustless dead-man's switch built on the Midnight Blockchain. 
        Secure your assets with Zero-Knowledge proofs. No doxxing, no extortion, absolute privacy.
      </p>
      
      <div className="flex gap-6">
        <a href="/dashboard" className="px-8 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors">
          Initialize Vault
        </a>
        <a href="/claim" className="px-8 py-4 bg-gray-900 border border-gray-800 text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors">
          Claim Inheritance
        </a>
      </div>
    </div>
  );
}
