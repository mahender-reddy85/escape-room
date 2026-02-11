import React, { useState, useEffect } from 'react';
import { LevelConfig, GameStatus } from '../types';

interface UIOverlayProps {
  level: LevelConfig;
  status: GameStatus;
  isWrongAnswer: boolean;
  lives: number;
  currentQuestionIdx: number;
  onAnswer: (answer: string) => void;
  onPinSubmit: (pin: string) => void;
  onClose: () => void;
  onRestart: () => void;
}

const UIOverlay: React.FC<UIOverlayProps> = ({ 
  level, 
  status, 
  isWrongAnswer, 
  lives,
  currentQuestionIdx,
  onAnswer, 
  onPinSubmit,
  onClose,
  onRestart 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [pinValue, setPinValue] = useState('');

  useEffect(() => {
    setInputValue('');
    setPinValue('');
  }, [currentQuestionIdx, status]);

  if (status === 'GAME_COMPLETE') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/95 backdrop-blur-xl p-6">
        <div className="max-w-md w-full p-8 text-center bg-white border border-slate-200 shadow-2xl rounded-sm">
          <h2 className="text-4xl font-black text-slate-900 mb-4 italic tracking-tighter">VAULT BREACHED</h2>
          <p className="text-xs text-slate-500 mb-10 leading-relaxed uppercase tracking-widest">
            Expert proficiency in system-level architecture confirmed. Security session terminated.
          </p>
          <button onClick={onRestart} className="w-full py-5 bg-slate-900 text-white font-black uppercase tracking-[0.5em] text-[10px] hover:bg-slate-800 transition-colors">Meet Mahesh</button>
        </div>
      </div>
    );
  }

  if (status === 'LEVEL_TRANSITIONING') {
    return (
      <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center pointer-events-none">
          <div className="space-y-4 text-center animate-pulse px-4">
            <h2 className="text-slate-900 text-5xl font-black italic tracking-tighter uppercase" style={{ color: level.themeColor }}>Authorized</h2>
            <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-1 w-10 bg-slate-200 overflow-hidden">
                        <div className="h-full bg-slate-900 animate-[loading_1s_infinite]" style={{ backgroundColor: level.themeColor, animationDelay: `${i * 0.1}s` }}></div>
                    </div>
                ))}
            </div>
          </div>
          <style>{`
            @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
          `}</style>
      </div>
    );
  }

  if (status === 'LEVEL_INTRO') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-4">
        <div className="text-center space-y-6 animate-in fade-in zoom-in duration-700">
           <h2 className="text-[10px] text-slate-400 uppercase tracking-[1em] mb-2">Syncing Environment...</h2>
           <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter leading-none" style={{ color: level.themeColor }}>0{level.id}</h1>
           <div className="w-48 h-1 bg-slate-100 mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-900 animate-[progress_3s_linear_infinite]" style={{ backgroundColor: level.themeColor }}></div>
           </div>
           <style>{`
             @keyframes progress {
               0% { transform: translateX(-100%); }
               100% { transform: translateX(100%); }
             }
           `}</style>
        </div>
      </div>
    );
  }

  if (status === 'PIN_ENTRY') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-md p-4">
        <div className="max-w-sm w-full bg-white border border-slate-200 p-8 shadow-2xl relative rounded-sm">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">[ X ]</button>
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-1">Security PIN</h3>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest italic">Check illuminated mobile device</p>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button 
                key={num} 
                onClick={() => pinValue.length < 4 && setPinValue(prev => prev + num)}
                className="h-14 bg-slate-50 border border-slate-200 text-slate-900 font-bold hover:bg-slate-100 transition-colors rounded-sm"
              >
                {num}
              </button>
            ))}
            <button 
              onClick={() => setPinValue('')}
              className="h-14 bg-red-50 border border-red-100 text-red-500 font-bold text-[10px] uppercase rounded-sm"
            >
              Clear
            </button>
            <button 
              key={0} 
              onClick={() => pinValue.length < 4 && setPinValue(prev => prev + 0)}
              className="h-14 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-sm"
            >
              0
            </button>
            <button 
              onClick={() => onPinSubmit(pinValue)}
              className="h-14 bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-[10px] uppercase rounded-sm"
            >
              Enter
            </button>
          </div>
          <div className="flex justify-center gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-10 h-14 border-b-2 border-slate-900 flex items-center justify-center text-2xl font-black">
                {pinValue[i] ? '*' : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status !== 'QUESTIONING') return null;

  const question = level.questions[currentQuestionIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
      <div className={`max-w-xl w-full bg-white border border-slate-200 p-8 md:p-12 shadow-2xl relative my-auto rounded-sm ${isWrongAnswer ? 'animate-shake' : ''}`}>
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">[ CLOSE ]</button>

        <div className="mb-10 flex justify-between items-end border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-[0.4em]">{question.topic}</span>
            <div className="flex items-center gap-3">
              <span className="text-[9px] px-2 py-0.5 border border-slate-200 text-slate-500">LAYER 0{currentQuestionIdx + 1}</span>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight">{question.prompt}</h3>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-[8px] uppercase tracking-[0.4em] text-slate-300 mb-2">Integrity</div>
            <div className="flex gap-1 justify-end">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className={`h-3 w-1 ${i < lives ? 'bg-slate-900' : 'bg-slate-100'}`} style={i < lives ? {backgroundColor: level.themeColor} : {}}></div>
               ))}
            </div>
          </div>
        </div>

        {isWrongAnswer && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold uppercase tracking-widest animate-pulse">
            Fatal Error: Decryption Mismatch. Security Compromised.
          </div>
        )}

        <div className="space-y-3">
          {question.type === 'MCQ' ? (
            question.options?.map((opt, i) => (
              <button 
                key={i}
                onClick={() => onAnswer(opt)}
                className="w-full text-left p-5 bg-slate-50 border border-slate-100 text-slate-700 hover:bg-white hover:border-slate-300 transition-all group flex items-center rounded-sm"
              >
                <span className="w-8 text-[10px] font-mono text-slate-300 group-hover:text-slate-900 transition-colors">{i + 1}.</span>
                <span className="text-xs md:text-sm tracking-wide">{opt}</span>
              </button>
            ))
          ) : (
            <div className="space-y-6">
              <input 
                autoFocus
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onAnswer(inputValue)}
                placeholder="INPUT DATA..."
                className="w-full p-5 bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-400 transition-colors text-sm font-mono tracking-widest placeholder:text-slate-300 rounded-sm"
              />
              <button onClick={() => onAnswer(inputValue)} className="w-full py-5 bg-slate-900 text-white font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-800 transition-colors">Submit Bit</button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-shake {
          animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default UIOverlay;
