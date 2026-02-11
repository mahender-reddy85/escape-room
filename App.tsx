// @ts-nocheck
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GameScene from './components/GameScene';
import UIOverlay from './components/UIOverlay';
import StartScreen from './components/StartScreen';
import { LEVELS } from './constants';
import { GameStatus } from './types';

export default function App() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [status, setStatus] = useState<GameStatus>('START_SCREEN');
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);
  const [lives, setLives] = useState(3);
  const [lampOn, setLampOn] = useState(false);
  const [boardTaps, setBoardTaps] = useState(0);
  const [hasHammer, setHasHammer] = useState(false);
  const [ballBroken, setBallBroken] = useState(false);
  const [level3ResetTriggered, setLevel3ResetTriggered] = useState(false);
  const [discoveryState, setDiscoveryState] = useState({
    cubeInInventory: false,
    cubePlaced: false,
    drawersOpen: [false, false, false],
    bookMoved: false
  });
  
  const introTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageExpiryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controlsRef = useRef<any>(null);

  const currentLevel = LEVELS[currentLevelIdx];
  const currentQuestion = currentLevel.questions[currentQuestionIdx];

  const handleStart = () => {
    setStatus('LEVEL_INTRO');
    setLives(3);
    setLampOn(false);
    setBoardTaps(0);
    setHasHammer(false);
    setBallBroken(false);
    setLevel3ResetTriggered(false);
    setCurrentQuestionIdx(0);
    setDiscoveryState({
      cubeInInventory: false,
      cubePlaced: false,
      drawersOpen: [false, false, false],
      bookMoved: false
    });
  };

  const handleRestart = () => {
    setCurrentLevelIdx(0);
    setCurrentQuestionIdx(0);
    setStatus('START_SCREEN');
    setSystemMessage(null);
    setLives(3);
    setLampOn(false);
  };

  const showSystemMessage = (text: string, duration: number = 3000) => {
    setSystemMessage(text);
    if (messageExpiryRef.current) clearTimeout(messageExpiryRef.current);
    messageExpiryRef.current = setTimeout(() => {
      setSystemMessage(null);
    }, duration);
  };

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      showSystemMessage("CAMERA RE-CALIBRATED");
      // Special Level 3 reveal logic
      if (currentLevel.id === 3 && status === 'QUESTION_SOLVED') {
        setLevel3ResetTriggered(true);
        showSystemMessage("VIEW SYNC REVEALED ANOMALY: DATA BLOCK DETECTED.");
      }
    }
  };

  useEffect(() => {
    if (status === 'LEVEL_INTRO') {
      setLives(3);
      setLampOn(false);
      setBoardTaps(0);
      setHasHammer(false);
      setBallBroken(false);
      setLevel3ResetTriggered(false);
      setCurrentQuestionIdx(0);
      setDiscoveryState({
        cubeInInventory: false,
        cubePlaced: false,
        drawersOpen: [false, false, false],
        bookMoved: false
      });
      introTimeoutRef.current = setTimeout(() => {
        setStatus('EXPLORING');
      }, 3000);
    }
    return () => {
      if (introTimeoutRef.current) clearTimeout(introTimeoutRef.current);
    };
  }, [status]);

  useEffect(() => {
    if (status === 'LEVEL_TRANSITIONING') {
      const timer = setTimeout(() => {
        if (currentLevelIdx < LEVELS.length - 1) {
          setCurrentLevelIdx(prev => prev + 1);
          setStatus('LEVEL_INTRO');
        } else {
          setStatus('GAME_COMPLETE');
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [status, currentLevelIdx]);

  const handleObjectClick = (objectName: string, index?: number) => {
    if (status === 'START_SCREEN' || status === 'GAME_COMPLETE' || status === 'LEVEL_INTRO' || status === 'LEVEL_TRANSITIONING') return;

    if (objectName === 'MUG') {
      showSystemMessage("WARNING: CONTAINS TRACES OF CAFFEINE AND DESPAIR.");
      return;
    }
    if (objectName === 'TABLET') {
      showSystemMessage("I USE THIS FOR CAT VIDEOS... AND KERNEL DEBUGGING.");
      return;
    }
    if (objectName === 'WALL_GAUGE') {
      showSystemMessage("AHHHHAAA! WHY SO EARLY");
      return;
    }
    if (objectName === 'VASE') {
      showSystemMessage("TECHNICALLY A SIMULATED ORGANISM. DON'T WATER IT.");
      return;
    }

    if (objectName === 'DESK_LAMP') {
      setLampOn(!lampOn);
      showSystemMessage(lampOn ? "OPTICAL SENSORS DIMMED" : "ILLUMINATION ACTIVE");
      return;
    }

    if (objectName === 'PHONE') {
      if (lampOn) {
        showSystemMessage(`ENCRYPTED DATA FOUND: ${currentLevel.pinCode}`);
      } else {
        showSystemMessage("404: SOCIAL LIFE NOT FOUND.");
      }
      return;
    }

    if (objectName === 'HAMMER') {
      setHasHammer(true);
      showSystemMessage("ACQUIRED: THE DE-BUGGING TOOL. SMASH SOMETHING.");
      return;
    }

    if (objectName === 'BALL') {
      if (currentLevel.id === 5) {
        if (hasHammer) {
          setBallBroken(true);
          showSystemMessage("BRUTE FORCE DE-BUGGING SUCCESSFUL. CUBE EXTRACTED.");
        } else {
          showSystemMessage("THIS BALL IS TOUGH. I NEED SOMETHING HEAVY.");
        }
      } else {
        showSystemMessage("A SHINY BALL. IT LIKES TO BE DRAGGED.");
      }
      return;
    }

    if (objectName === 'HIDDEN_BOOK' && currentLevel.id === 2) {
      setDiscoveryState(prev => ({ ...prev, bookMoved: !prev.bookMoved }));
      showSystemMessage(discoveryState.bookMoved ? "BOOK RESTORED." : "WAIT, WHAT'S UNDER HERE?");
      return;
    }

    if (objectName === 'CUBE') {
      if (status === 'QUESTION_SOLVED' || status === 'PIN_ENTRY' || status === 'CUBE_COLLECTED') {
        setDiscoveryState(prev => ({ ...prev, cubeInInventory: true }));
        setStatus('CUBE_COLLECTED');
        showSystemMessage("AUTH BLOCK SECURED. INJECT INTO CABINET.");
      } else {
        showSystemMessage("1001 WAYS TO AVOID SEGFAULTS. VOLUME 1 OF 50.");
      }
      return;
    }

    if (objectName === 'SOCKET') {
      if (status === 'CUBE_COLLECTED') {
        setDiscoveryState(prev => ({ ...prev, cubePlaced: true }));
        setStatus('CABINET_UNLOCKED');
        showSystemMessage("CABINET PROTOCOL BYPASSED.");
      } else {
        showSystemMessage("EMPTY SOCKET. STORY OF MY LIFE.");
      }
      return;
    }

    if (objectName.startsWith('DRAWER') && typeof index === 'number') {
      if (discoveryState.cubePlaced) {
        const newDrawers = [...discoveryState.drawersOpen];
        newDrawers[index] = !newDrawers[index];
        setDiscoveryState(prev => ({ ...prev, drawersOpen: newDrawers }));
        if (status !== 'KEY_REVEALED' && currentLevel.id !== 4) setStatus('KEY_REVEALED');
      } else {
        showSystemMessage("MAGNETICALLY SEALED. TRY SMARTER, NOT HARDER.");
      }
      return;
    }

    if (objectName === 'KEY') {
      if (status === 'KEY_REVEALED') {
        setStatus('LEVEL_TRANSITIONING');
        showSystemMessage("GATEWAY OPENING. DON'T TRIP ON THE WAY OUT.");
      }
      return;
    }

    if (objectName === 'BOARD') {
      if (status === 'EXPLORING') {
        const nextTaps = boardTaps + 1;
        setBoardTaps(nextTaps);
        if (nextTaps >= currentLevel.id) {
          setStatus('QUESTIONING');
          showSystemMessage("TERMINAL OVERRIDE SUCCESSFUL.");
        }
      } else if (status === 'QUESTION_SOLVED' && currentLevel.id === 4) {
        setStatus('PIN_ENTRY');
        showSystemMessage("TERMINAL CHALLENGE: ENTER PIN TO REVEAL KEYWAY.");
      } else if (status === 'QUESTION_SOLVED') {
        showSystemMessage("TERMINAL ACTIVE. PROCEED WITH EXTRACTION.");
      }
    }
  };

  const handleAnswer = (answer: string) => {
    if (answer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim()) {
      if (currentQuestionIdx < 2) {
        setCurrentQuestionIdx(prev => prev + 1);
        showSystemMessage(`LAYER ${currentQuestionIdx + 1}/3 DECRYPTED.`);
      } else {
        setStatus('QUESTION_SOLVED');
        setIsWrongAnswer(false);
        if (currentLevel.id === 3) {
          showSystemMessage("DECRYPTION COMPLETE. VIEW RE-CALIBRATION REQUIRED.");
        } else if (currentLevel.id === 4) {
          showSystemMessage("TERMINAL ACCESS GRANTED. TAP BOARD TO CONTINUE.");
        } else {
          showSystemMessage("DECRYPTION COMPLETE. AUTH BLOCK ACTIVE.");
        }
      }
    } else {
      setIsWrongAnswer(true);
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        showSystemMessage("SYSTEM FAILURE: REBOOTING.");
        setTimeout(() => handleRestart(), 2000);
      } else {
        setTimeout(() => setIsWrongAnswer(false), 2000);
      }
    }
  };

  const handlePinSubmit = (pin: string) => {
    if (pin === currentLevel.pinCode) {
      setStatus('KEY_REVEALED');
      showSystemMessage("PIN ACCEPTED. REVEALING HIDDEN ASSET.");
    } else {
      showSystemMessage("INVALID ACCESS CODE.");
    }
  };

  const getObjective = () => {
    if (currentLevel.id === 4 && status === 'QUESTION_SOLVED') return "Tap Terminal Board";
    if (currentLevel.id === 4 && status === 'KEY_REVEALED') return "RETRIEVE HIDDEN KEY";
    
    switch(status) {
      case 'EXPLORING': return `Sync Main Terminal Board`;
      case 'QUESTIONING': return `Decrypt Layer ${currentQuestionIdx + 1}/3`;
      case 'QUESTION_SOLVED': 
        if (currentLevel.id === 3 && !level3ResetTriggered) return "Recalibrate System View (Reset View)";
        return "Search for Auth Block";
      case 'PIN_ENTRY': return "Enter Security PIN";
      case 'CUBE_COLLECTED': return "Inject Block into Cabinet";
      case 'CABINET_UNLOCKED': return "Examine Shelves";
      case 'KEY_REVEALED': return "RETRIEVE HIDDEN KEY";
      default: return "System Online";
    }
  };

  const handleObjectiveClick = () => {
    // Special Level 2 Meta-interaction: Clicking the word KEY in the objective text completes the level
    if (currentLevel.id === 2 && status === 'KEY_REVEALED') {
      setStatus('LEVEL_TRANSITIONING');
      showSystemMessage("METAPHYSICAL KEY VALIDATED. ACCESS GRANTED.");
    }
  };

  return (
    <div className="w-full h-screen relative bg-slate-50 font-mono overflow-hidden">
      {status === 'START_SCREEN' ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <>
          <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
            <color attach="background" args={['#ffffff']} />
            <ambientLight intensity={currentLevel.ambientIntensity + 0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
            <spotLight position={[-5, 5, 0]} angle={0.3} penumbra={1} intensity={2} color={currentLevel.themeColor} castShadow />
            <GameScene 
              level={currentLevel} 
              status={status} 
              discoveryState={discoveryState} 
              lampOn={lampOn}
              hasHammer={hasHammer}
              ballBroken={ballBroken}
              level3ResetTriggered={level3ResetTriggered}
              onObjectClick={handleObjectClick} 
            />
            <OrbitControls 
              ref={controlsRef}
              makeDefault 
              enablePan={false} 
              maxDistance={12} 
              minDistance={2.5} 
              enableDamping={true}
              dampingFactor={0.06}
              rotateSpeed={0.7}
              enabled={status !== 'LEVEL_INTRO' && status !== 'LEVEL_TRANSITIONING'} 
            />
          </Canvas>

          <div 
            onClick={handleObjectiveClick}
            className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-sm cursor-pointer z-[45] px-4 text-center pointer-events-auto"
          >
             <div className="bg-white/90 border border-slate-200 py-3 backdrop-blur-md shadow-xl rounded-sm">
                <span className="text-[8px] text-slate-400 uppercase tracking-[0.5em] mb-1 block">Active Protocol</span>
                <p className="text-slate-900 text-[11px] font-black uppercase tracking-widest" style={{ color: currentLevel.themeColor }}>{getObjective()}</p>
             </div>
          </div>

          <div className="absolute top-4 right-4 flex gap-2 z-[45]">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill={i < lives ? currentLevel.themeColor : '#e2e8f0'} className="w-full h-full transition-colors duration-500">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 z-[45]">
            <button 
              onClick={resetCamera}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center gap-2 shadow-lg active:scale-95 transition-all text-[10px] font-bold uppercase tracking-widest rounded-sm"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Reset View
            </button>
          </div>

          <UIOverlay 
            level={currentLevel} 
            status={status} 
            isWrongAnswer={isWrongAnswer} 
            lives={lives} 
            currentQuestionIdx={currentQuestionIdx} 
            onAnswer={handleAnswer} 
            onPinSubmit={handlePinSubmit}
            onClose={() => setStatus(status === 'PIN_ENTRY' ? 'QUESTION_SOLVED' : 'EXPLORING')} 
            onRestart={handleRestart} 
          />

          {systemMessage && (
            <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[90%] md:w-full md:max-w-sm px-4 z-[40] pointer-events-none">
              <div className="bg-white border border-slate-200 p-3 text-center shadow-xl rounded-sm">
                <p className="text-slate-900 text-[9px] font-bold tracking-widest uppercase animate-pulse">{systemMessage}</p>
              </div>
            </div>
          )}

          <div className="absolute top-4 md:top-8 left-4 md:left-8 pointer-events-none">
            <h1 className="text-slate-900 text-xl md:text-2xl font-black italic tracking-tighter" style={{ color: currentLevel.themeColor }}>LVL 0{currentLevel.id}</h1>
          </div>
        </>
      )}
    </div>
  );
}
