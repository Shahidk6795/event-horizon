import React from 'react';

const Header = ({ view, loading, syncing, handleSync }) => {
  return (
    <header className="mb-10 pt-4 bg-white/3 p-5 rounded-2xl border border-white/5 border-t-white/20 border-l-white/10 backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_0_rgba(0,0,0,0.8)]">
      <div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">
          Event Horizon
        </h1>
        <p className="text-gray-400 text-xs font-mono tracking-widest uppercase mt-2 drop-shadow-md">
          {loading ? 'Siphoning Deep Array Link...' : 'Deep Space Planetary Surveillance Deck'}
        </p>
      </div>

      {view !== 'overview' && (
        <button 
          onClick={handleSync}
          disabled={syncing}
          className="text-xs font-mono border border-cyan-500/50 text-cyan-400 px-5 py-2.5 rounded-xl bg-black/40 backdrop-blur-md hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 font-bold"
        >
          {syncing ? 'DECODING DATASTREAM...' : 'RE-SYNC WITH NASA/LIGO'}
        </button>
      )}
    </header>
  );
};

export default Header;