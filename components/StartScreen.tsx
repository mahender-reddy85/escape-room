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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
          <div className="p-8 md:p-10 border border-slate-200 bg-white shadow-sm rounded-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4 opacity-50 text-slate-500">What to do?</h3>
            <div className="text-xs md:text-sm text-slate-600">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="font-bold text-slate-900">EXPLORE</span>
                <span className="text-slate-400">→</span>
                <span className="font-bold text-slate-900">SOLVE</span>
                <span className="text-slate-400">→</span>
                <span className="font-bold text-slate-900">CUBE</span>
                <span className="text-slate-400">→</span>
                <span className="font-bold text-slate-900">KEY</span>
                <span className="text-slate-400">→</span>
                <span className="font-bold text-slate-900">ESCAPE</span>
              </div>
              <ul className="space-y-1 md:space-y-2 mt-3 text-xs">
                <li>• Explore room</li>
                <li>• Solve C Qs</li>
                <li>• Power cube</li>
                <li>• Find key </li>
              </ul>
            </div>
          </div>
          <div className="p-8 md:p-10 border border-slate-200 bg-white shadow-sm rounded-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4 opacity-50 text-slate-500">Technical Specs</h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              C Programming Challenge: Pointers, Arrays, Functions, Memory Management, Data Structures
            </p>
          </div>
          <div className="p-8 md:p-10 border border-slate-200 bg-white shadow-sm rounded-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-4 opacity-50 text-slate-500">Instructions</h3>
            <div className="border-t pt-3 mt-3">
              <p className="font-bold text-slate-800 mb-1">Life System:</p>
              <ul className="space-y-1 text-[10px] text-slate-600">
                <li>• 3 questions per level</li>
                <li>• Wrong answer = -1 life</li>
                <li>• 0 lives = restart Level 1</li>
              </ul>
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
      </div>
    </div>
  );
};

export default StartScreen;