
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BreathingInstruction } from '../BreathingInstructions';
import { PlayIcon, PauseIcon } from 'lucide-react';


interface QuoteDisplayProps {
 quote: string;
 source: string;
 breathingInstruction: BreathingInstruction;
 timeRemaining: number;
 togglePlay: () => void;
 isPlaying: boolean;
}


export function QuoteDisplay({
 quote,
 source,
 breathingInstruction,
 timeRemaining,
 togglePlay,
 isPlaying,
}: QuoteDisplayProps) {
 const [progress, setProgress] = useState(100);


 useEffect(() => {
   setProgress((timeRemaining / 300) * 100);
 }, [timeRemaining]);


 const minutes = Math.floor(timeRemaining / 60);
 const seconds = timeRemaining % 60;


 return (
   <Card className='max-w-2xl w-full bg-white/10 backdrop-blur-md shadow-lg rounded-lg overflow-hidden border-0'>
     <CardContent className='p-8 relative'>
       <div className='text-center space-y-8'>
         <motion.p
           className='text-sm text-gray-600'
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.1, delay: 0.02 }}
         >
           {breathingInstruction}
         </motion.p>
         <motion.p
           className='text-2xl font-light text-gray-800 leading-relaxed'
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.1, delay: 0.02 }}
         >
           {quote}
         </motion.p>
         <button
           onClick={togglePlay}
           className='bg-white/20 hover:bg-white/30 text-gray-800 rounded-full p-4 transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg'
         >
           {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
         </button>
         <div className='space-y-4'>
           <motion.div
             className='text-5xl font-bold text-gray-800'
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.1, delay: 0.02 }}
           >
             {minutes.toString().padStart(2, '0')}:
             {seconds.toString().padStart(2, '0')}
           </motion.div>
           <div className='w-full bg-gray-300 rounded-full h-2.5 overflow-hidden'>
             <motion.div
               className='bg-gray-600 h-2.5 rounded-full'
               style={{ width: `${progress}%` }}
               initial={{ width: '100%' }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 0.5 }}
             />
           </div>
         </div>
       </div>
     </CardContent>
     <CardFooter className='p-4 flex justify-center'>
       <p className='text-sm text-gray-600'>{source}</p>
     </CardFooter>
   </Card>
 );
}
