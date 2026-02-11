import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4 md:p-6 overflow-y-auto">
      <div className="max-w-2xl w-full text-center space-y-6 md:space-y-8 my-auto">
        <div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-2 italic">C-ESCAPE</h1>
          <div className="h-1 w-16 md:w-24 bg-slate-900 mx-auto"></div>
          <p className="text-slate-400 mt-4 text-[10px] md:text-sm uppercase tracking-[0.4em]">3D Logic Challenge</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left">
          <div className="p-4 md:p-6 border border-slate-200 bg-white shadow-sm rounded-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4 opacity-50 text-slate-500">Instructions</h3>
            <ul className="text-xs md:text-sm space-y-1 md:space-y-2 text-slate-600">
              <li>1. Drag to explore the 3D room.</li>
              <li>2. Find the terminal to solve C questions.</li>
              <li>3. Power the Cabinet with the Data Cube.</li>
              <li>4. Search drawers for the hidden micro-key.</li>
            </ul>
          </div>
          <div className="p-4 md:p-6 border border-slate-200 bg-white shadow-sm rounded-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4 opacity-50 text-slate-500">Technical Specs</h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Multi-layered decryption protocol. High-fidelity hidden object mechanics.
            </p>
            <div className="mt-4 md:mt-6 flex gap-2 items-center">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[9px] md:text-[10px] uppercase opacity-40">System Online</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button 
            onClick={onStart}
            className="group relative w-full md:w-auto px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white font-black uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl rounded-sm"
          >
            <span className="relative z-10">Initialize Session</span>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>

        <p className="text-[8px] md:text-[10px] text-slate-300 uppercase tracking-widest">
          Laboratory Environment v2.5 // Light Mode Protocol
        </p>
      </div>
    </div>
  );
};

export default StartScreen;