'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuoteDisplay } from './components/QuoteDisplay';
import { AnimatePresence, motion } from 'framer-motion';
import { BreathingCircle } from './components/BreathingCircle';
import { useMeditateStore } from './store/meditateStore';

const AUDIO_PATHS = [
  '/music/somnia_1.mp3',
  '/music/somnia_10.mp3',
  '/music/somnia_2.mp3',
  '/music/somnia_3.mp3',
  '/music/somnia_7.mp3',
  '/music/somnia_8.mp3',
  '/music/somnia_9.mp3',
];

export default function MeditatePage() {
  const {
    timeRemaining,
    currentQuote,
    currentBreathingInstruction,
    currentBackground,
    isTransitioning,
    startTimer,
    resetMeditation,
  } = useMeditateStore();

  const [audioControl, setAudioControl] = useState<HTMLAudioElement | undefined>();

  useEffect(() => {
    startTimer(); // Start the timer when the component mounts
  }, [startTimer]);

  useEffect(() => {
    const audio = new Audio(
      AUDIO_PATHS[Math.floor(Math.random() * AUDIO_PATHS.length)]
    );
    audio.loop = true;
    audio.play();
    setAudioControl(audio);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const muteUnmuteAudio = () => {
    if (audioControl) {
      audioControl.muted = !audioControl.muted;
    }
  };

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentBackground}
          className='absolute inset-0'
          style={{ background: currentBackground }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.02 }}
        />
      </AnimatePresence>
      <div className='relative z-10 min-h-screen flex flex-col items-center justify-center p-4'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentQuote.quote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.02 }}
          >
            <QuoteDisplay
              quote={currentQuote.quote}
              source={currentQuote.source}
              breathingInstruction={currentBreathingInstruction}
              timeRemaining={timeRemaining}
            />
          </motion.div>
        </AnimatePresence>
        <div className='flex items-center justify-center gap-4'>
          <Button
            onClick={resetMeditation}
            disabled={isTransitioning}
            className='mt-8 bg-white/20 hover:bg-white/30 text-gray-800 font-semibold py-2 px-6 rounded-full transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg transform hover:-translate-y-1'
          >
            New Quote
          </Button>
          <Button
            onClick={muteUnmuteAudio}
            className={`mt-8 ${audioControl?.muted ? 'bg-red-400/20 hover:bg-red-400/30' : 'bg-white/20 hover:bg-white/30'} text-gray-800 font-semibold py-2 px-6 rounded-full transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg transform hover:-translate-y-1`}
          >
            {audioControl?.muted ? 'Unmute' : 'Mute'} Audio
          </Button>
        </div>
        <BreathingCircle />
      </div>
    </div>
  );
}
