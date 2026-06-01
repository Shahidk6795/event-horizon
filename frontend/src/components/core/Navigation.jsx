import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ currentPath }) => {
  const navigate = useNavigate();

  const tabs = [
    { 
      id: 'overview', 
      title: 'Terminal', 
      desc: 'Tactical overview interface.', 
      icon: '▩', 
      borderColor: 'hover:border-slate-400', 
      activeStyle: 'bg-white/10 border-white/20 border-t-white/30 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_32px_0_rgba(0,0,0,0.6)]' 
    },
    { 
      id: 'asteroids', 
      title: 'Sensors', 
      desc: 'Tracking threat telemetry.', 
      icon: '☄️', 
      borderColor: 'hover:border-cyan-500', 
      activeStyle: 'bg-cyan-950/40 border-cyan-500/50 border-t-cyan-400/80 text-cyan-400 shadow-[inset_0_1px_1px_rgba(34,211,238,0.3),0_8px_32px_0_rgba(0,0,0,0.6)]' 
    },
    { 
      id: 'ligo', 
      title: 'Ripples', 
      desc: 'Gravitational wave analysis.', 
      icon: '🕳️', 
      borderColor: 'hover:border-purple-500', 
      activeStyle: 'bg-purple-950/40 border-purple-500/50 border-t-purple-400/80 text-purple-400 shadow-[inset_0_1px_1px_rgba(168,85,247,0.3),0_8px_32px_0_rgba(0,0,0,0.6)]' 
    }
  ];

  return (
    <section className="mb-10 border-b border-white/10 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tabs.map((btn) => (
          <div
            key={btn.id}
            onClick={() => navigate(`/${btn.id}`)} // <-- Changed this to navigate
            className={`group relative p-4 rounded-xl border cursor-pointer backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 ${btn.borderColor} ${
              currentPath === btn.id // <-- Changed 'view' to 'currentPath'
                ? btn.activeStyle 
                : 'bg-white/3 border-white/5 border-t-white/10 text-gray-400 hover:bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_0_rgba(0,0,0,0.4)]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl drop-shadow-md">{btn.icon}</span>
              <div>
                <h3 className="font-bold uppercase tracking-tight text-sm text-white group-hover:text-white/90 drop-shadow-md">
                  {btn.title}
                </h3>
                <p className="text-white/50 text-[10px] font-mono mt-0.5">
                  {btn.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Navigation;