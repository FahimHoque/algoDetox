import { create } from 'zustand';
import { quotes, type Quote } from '../Quotes';
import {
  getRandomBreathingInstruction,
  type BreathingInstruction,
} from '../BreathingInstructions';

const MEDITATION_TIME = 300;

const backgroundGradients = [
  'linear-gradient(to right bottom, #d7e8ff, #b0d4ff, #86c0ff, #55abff, #0095ff)',
  'linear-gradient(to right bottom, #ffecd2, #fcb69f, #fca184, #ff8a6a, #ff7251)',
  'linear-gradient(to right bottom, #8bffd1, #6aefce, #4adfcb, #2ccec7, #00bdc2)',
  'linear-gradient(to right bottom, #f5f7fa, #e3e7ee, #cbd5e1, #b1c2d0, #99afbf)',
  'linear-gradient(to right bottom, #ffe8e8, #ffc7c7, #ffa7a7, #ff8888, #ff6a6a)',
  'linear-gradient(to right bottom, #d3f4ff, #b3e6ff, #8fd8ff, #69caff, #3fbaff)',
  'linear-gradient(to right bottom, #f7e8ff, #eac7ff, #d9a7ff, #c888ff, #b46aff)',
  'linear-gradient(to right bottom, #fffae3, #f7ebc7, #edd9a7, #e2c888, #d7b76a)',
];

interface MeditateState {
  timeRemaining: number;
  currentQuote: Quote;
  currentBreathingInstruction: BreathingInstruction;
  currentBackground: string;
  isTransitioning: boolean;
  startTimer: () => void;
  resetMeditation: () => void;
}

export const useMeditateStore = create<MeditateState>((set, get) => ({
  timeRemaining: MEDITATION_TIME,
  currentQuote: quotes[Math.floor(Math.random() * quotes.length)],
  currentBreathingInstruction: getRandomBreathingInstruction(),
  currentBackground:
    backgroundGradients[Math.floor(Math.random() * backgroundGradients.length)],
  isTransitioning: false,

  startTimer: () => {
    if (get().timeRemaining <= 0) return;
    const interval = setInterval(() => {
      set((state) => {
        if (state.timeRemaining <= 1) {
          clearInterval(interval);
          return { timeRemaining: 0 };
        }
        return { timeRemaining: state.timeRemaining - 1 };
      });
    }, 1000);
  },

  resetMeditation: () => {
    set({ isTransitioning: true });

    setTimeout(() => {
      set((state) => {
        let newQuote;
        do {
          newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        } while (newQuote.quote === state.currentQuote.quote);

        return {
          currentQuote: newQuote,
          currentBreathingInstruction: getRandomBreathingInstruction(),
          currentBackground:
            backgroundGradients[Math.floor(Math.random() * backgroundGradients.length)],
          isTransitioning: false,
        };
      });
    }, 1000);
  },
}));
