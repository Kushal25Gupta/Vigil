import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden ">
      <div className="glow-orb top-1/4 left-1/4" />
      <div className="glow-orb bottom-1/4 right-1/4" style={{ background: '#3b82f6', animationDelay: '2s' }} />
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10 min-h-[80vh]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Live on Midnight DevNet
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight max-w-5xl">
          Zero-Knowledge Inheritance.<br/>
          <span className="gradient-text">Trustless Proof-of-Life.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          The ultimate dead-man's switch. Secure your crypto assets with cryptographic certainty. No doxxing, no extortion, absolute privacy for your heirs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/dashboard" className="px-8 py-4 btn-gradient text-white rounded-xl font-bold text-lg text-center flex items-center justify-center gap-2">
            Initialize Vault
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
          <Link href="/claim" className="px-8 py-4 glass-panel text-white hover:bg-white/5 border border-white/10 rounded-xl font-bold text-lg text-center transition-all">
            Claim Inheritance
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-6 relative z-10">
        <div className="glass-panel p-8 rounded-2xl">
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Shielded Identity</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Your heirs remain completely anonymous. Their wallet addresses are hashed and validated via ZK proofs, preventing targeted extortion.</p>
        </div>
        <div className="glass-panel p-8 rounded-2xl border-purple-500/20">
          <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Time-Locked Escrow</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Smart contracts enforce strict temporal intervals. If you fail to ping the vault, the funds are automatically unlocked for your beneficiaries.</p>
        </div>
        <div className="glass-panel p-8 rounded-2xl">
          <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Non-Custodial</h3>
          <p className="text-gray-400 text-sm leading-relaxed">You remain in absolute control of your assets. Cancel the vault at any time with a single cryptographic signature before the timer expires.</p>
        </div>
      </div>
    </div>
  );
}
