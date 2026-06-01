import React from 'react';

const OverviewTerminal = ({ activeScan, setActiveScan }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
      
      {/* TACTICAL INSPECTION BOX (LEFT SIDE) */}
      <div className="bg-white/3 border border-white/5 border-t-white/20 border-l-white/10 p-6 rounded-xl flex flex-col justify-between backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_40px_0_rgba(0,0,0,0.8)]">
        <div>
          <div className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase mb-1 font-bold drop-shadow-md">TACTICAL METRICS</div>
          <h2 className="text-xl font-black tracking-tight uppercase text-slate-100 mb-4 drop-shadow-md">Core Telemetry</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-6 drop-shadow-md">
            Interact with the mapped sensor tracking coordinates on the active coordinate screen grid to extract localized node alerts.
          </p>
        </div>

        {/* Inner Data Box cut into the glass */}
        <div className="bg-black/60 border border-white/5 border-b-white/10 rounded-lg p-4 font-mono text-xs shadow-[inset_0_4px_15px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <div className="text-[10px] text-gray-400 mb-2 border-b border-white/5 pb-1 uppercase tracking-wider">📡 Intercept Feed Output</div>
          <div className="text-cyan-400 font-bold uppercase mb-1 drop-shadow-md">{activeScan.title}</div>
          <div className="text-slate-200 leading-normal mb-3 text-xs">{activeScan.details}</div>
          <div className="text-emerald-400 text-[11px] bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded inline-block font-bold">
            {activeScan.status} // {activeScan.metric}
          </div>
        </div>
      </div>

      {/* CENTRAL RADAR HUD */}
      <div className="lg:col-span-2 bg-white/3 border border-white/5 border-t-white/20 border-l-white/10 rounded-xl p-8 flex flex-col items-center justify-center relative min-h-100 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_40px_0_rgba(0,0,0,0.8)]">
        
        {/* Concentric Sensor Matrix Lines */}
        <div className="relative flex items-center justify-center w-72 h-72 rounded-full border border-white/10 border-dashed animate-[spin_160s_linear_infinite] shadow-lg">
          <div className="flex items-center justify-center w-52 h-52 rounded-full border border-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-center w-32 h-32 rounded-full border border-white/10 border-dashed">
              <div className="w-4 h-4 rounded-full bg-black/80 border border-white/30 flex items-center justify-center backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_#22d3ee]"></div>
              </div>
            </div>
          </div>

          {/* RADAR SWEEP LINES */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 shadow-[0_0_5px_rgba(255,255,255,0.5)]"></div>
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20 shadow-[0_0_5px_rgba(255,255,255,0.5)]"></div>

          {/* RADAR TARGET INTERCEPT BUTTON TARGETS */}
          <button 
            onClick={() => setActiveScan({
              title: "Anomalous Vector Delta",
              status: "STAGE ALERT",
              details: "Fragments clustered within gravitational Lagrange zone L4. Kinetic speed metrics spike detected.",
              metric: "3 Safe Barriers Crossed"
            })}
            className="absolute top-14 left-14 h-4 w-4 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400 shadow-[0_0_15px_#22d3ee] cursor-pointer hover:scale-125 transition-transform"
          ></button>

          <button 
            onClick={() => setActiveScan({
              title: "Spacetime Rupture Node",
              status: "CRITICAL COLLAPSE",
              details: "Deep sky stellar array registers high metric frame metric dragging distortion. Binary system collapse probable.",
              metric: "14.2 mHz Mass Lock"
            })}
            className="absolute bottom-20 right-12 h-4 w-4 rounded-full bg-black/80 backdrop-blur-md border border-purple-400 shadow-[0_0_15px_#c084fc] cursor-pointer hover:scale-125 transition-transform"
          ></button>

          <button 
            onClick={() => setActiveScan({
              title: "Zenith Tracker Node 03",
              status: "STABLE FEED",
              details: "Sector cleared. Primary handshakes with local MySQL server context running with 0 telemetry dropouts.",
              metric: "Uptime Sync Locked"
            })}
            className="absolute top-20 right-20 h-3 w-3 rounded-full bg-black/80 backdrop-blur-md border border-white/50 cursor-pointer hover:scale-125 transition-transform shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          ></button>
        </div>

        <div className="mt-6 font-mono text-[10px] text-gray-400 drop-shadow-md tracking-widest text-center uppercase">
          [ Toggle Active Tracking Coordinate Nodes on Map Grid Above ]
        </div>
      </div>

    </div>
  );
};

export default OverviewTerminal;