export type GameStatus = 
  | 'START_SCREEN'
  | 'LEVEL_INTRO'
  | 'EXPLORING' 
  | 'QUESTIONING' 
  | 'QUESTION_SOLVED'
  | 'PIN_ENTRY'
  | 'CUBE_COLLECTED'
  | 'CABINET_UNLOCKED'
  | 'KEY_REVEALED' 
  | 'KEY_COLLECTED' 
  | 'LEVEL_TRANSITIONING'
  | 'GAME_COMPLETE';

export interface Question {
  type: 'MCQ' | 'TEXT';
  topic: string;
  prompt: string;
  options?: string[];
  answer: string;
}

export interface LevelConfig {
  id: number;
  themeColor: string;
  ambientIntensity: number;
  questions: Question[];
  keyRevealMechanism: 'table' | 'drawer' | 'painting' | 'floor' | 'wall';
  questionHint: string;
  locationHint: string;
  pinCode: string;
}