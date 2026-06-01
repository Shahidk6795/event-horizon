import React from 'react';

const TelemetryTable = ({ data, view }) => {
  
  const formatGPS = (gps) => {
    if (!gps || gps === "0" || gps === "") return "Analyzing...";
    const date = new Date((parseFloat(gps) + 315964800) * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="overflow-hidden bg-white/3 border border-white/5 border-t-white/20 border-l-white/10 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_40px_0_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-fadeIn">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-white/10 text-gray-300 font-mono text-[11px] uppercase tracking-widest shadow-sm">
            <th className="p-5">Identifier</th>
            <th className="p-5">{view === 'asteroids' ? 'Estimated Diameter' : 'Event Type'}</th>
            <th className="p-5">{view === 'asteroids' ? 'Velocity' : 'Total Mass'}</th>
            <th className="p-5">Detection Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((item, index) => {
            const isHazard = view === 'asteroids' && item.hazardous;
            return (
              <tr key={index} className="hover:bg-white/10 transition-colors group">
                <td className={`p-5 font-mono font-bold drop-shadow-md ${isHazard ? 'text-red-400 animate-pulse' : view === 'asteroids' ? 'text-cyan-400' : 'text-purple-400'}`}>
                  {view === 'asteroids' ? item.name : (item.commonName || item.eventId)}
                  {isHazard && <span className="ml-2 text-[9px] font-mono bg-red-900/50 backdrop-blur-md border border-red-500/50 px-1.5 py-0.5 rounded text-red-400 font-bold shadow-xs">HAZARD</span>}
                </td>
                
                <td className="p-5 text-gray-100 font-sans text-sm font-medium drop-shadow-md">
                  {view === 'asteroids' ? `${(item.diameterMeters || 0).toFixed(2)} m` : (item.eventType || "Binary Merger")}
                </td>

                <td className="p-5 text-gray-100 font-sans text-sm font-medium drop-shadow-md">
                  {view === 'asteroids' ? `${(item.velocityKmph || 0).toLocaleString()} km/h` : `${item.totalMass || 0} M☉`}
                </td>

                <td className="p-5 text-gray-300 font-mono text-xs drop-shadow-md">
                  {view === 'asteroids' ? (item.approachDate || "N/A") : formatGPS(item.gpsTime)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TelemetryTable;