import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';
import { ArrowDown } from 'lucide-react';

export const Softmax = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); 
  const [speed, setSpeed] = useState(1);

  const handlePlayPause = () => {
    if (!isPlaying && step === 3) {
      handleReplay();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReplay = () => {
    setStep(0);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  useEffect(() => {
    if (!isPlaying) return;

    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 1000 / speed);
      return () => clearTimeout(timer);
    } else if (step === 1) {
      const timer = setTimeout(() => setStep(2), 1500 / speed);
      return () => clearTimeout(timer);
    } else if (step === 2) {
      const timer = setTimeout(() => setStep(3), 1500 / speed);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, step, speed]);

  const explanation = (
    <>
      <p><strong>Choosing the Next Word</strong></p>
      <p>The final output of the Decoder is a massive vector of raw numbers (logits). There is one number for every single word in the AI's entire vocabulary.</p>
      <p className="mt-4">The <strong>Softmax</strong> function mathematically converts these raw, unbounded scores into a clean probability distribution. Every number becomes a percentage between 0% and 100%, and they all add up to exactly 100%.</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li><strong>Logits:</strong> Raw, unnormalized predictions from the linear layer.</li>
      <li><strong>Exponentiation:</strong> Softmax uses $e^x$ to make all numbers positive and severely punish small differences.</li>
      <li><strong>Normalization:</strong> Divides by the sum so the total equals 1.0 (100%).</li>
      <li>The word with the highest probability is usually chosen as the next word.</li>
    </ul>
  );

  const vocabWords = [
    { word: "apple", logit: -3.4, prob: 0.1 },
    { word: "suis", logit: 12.5, prob: 88.2, isWinner: true },
    { word: "car", logit: 2.1, prob: 1.5 },
    { word: "est", logit: 5.4, prob: 10.2 },
  ];

  const interactiveArea = (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[500px]">
      <div className="relative flex flex-col items-center w-full max-w-md mt-4 gap-6">
        
        {/* Step 0: Raw Logits */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="text-slate-400 font-mono text-sm">Raw Logits (Decoder Output)</div>
            <div className="flex gap-2">
              {vocabWords.map((v, i) => (
                <div key={i} className="bg-slate-800 border border-slate-600 px-4 py-2 rounded font-mono text-slate-300 w-20 text-center">
                  {v.logit.toFixed(1)}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Step 1: Softmax Function */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-2 my-4"
            >
              <ArrowDown className="text-primary-500 w-6 h-6 animate-pulse" />
              <div className="bg-primary-600/20 border border-primary-500/50 text-primary-300 px-12 py-3 rounded-xl font-bold shadow-[0_0_20px_-5px_rgba(139,92,246,0.4)]">
                Softmax Function
              </div>
              <ArrowDown className="text-primary-500 w-6 h-6 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2 & 3: Probabilities and Winner */}
        <div className="w-full bg-slate-800/50 border border-slate-700 p-6 rounded-xl flex flex-col gap-4">
          <div className="text-sm font-mono text-slate-400 mb-2 text-center">Probability Distribution</div>
          
          {vocabWords.map((v, i) => {
            const showWinner = step === 3 && v.isWinner;
            return (
              <div key={i} className="relative flex items-center gap-4">
                <div className={`w-16 text-right font-mono font-bold ${showWinner ? 'text-green-400' : 'text-slate-300'}`}>
                  "{v.word}"
                </div>
                
                {/* The Bar */}
                <div className="flex-1 bg-slate-900 rounded-full h-6 border border-slate-700 overflow-hidden relative">
                  <AnimatePresence>
                    {step >= 2 && (
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${v.prob}%` }}
                        transition={{ duration: 0.8 / speed, ease: "easeOut" }}
                        className={`h-full ${showWinner ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-primary-500'}`}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <div className={`w-16 font-mono text-sm ${showWinner ? 'text-green-400' : 'text-slate-400'}`}>
                  {step >= 2 ? `${v.prob.toFixed(1)}%` : '0.0%'}
                </div>
                
                {/* Winner Glow */}
                <AnimatePresence>
                  {showWinner && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      className="absolute -right-24 bg-green-600/20 border border-green-500/50 text-green-300 px-3 py-1 rounded text-xs font-bold shadow-lg"
                    >
                      WINNER
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Softmax"
      explanation={explanation}
      businessInsight="This is how AI gives you the most statistically likely answer. However, by tweaking 'Temperature', we can force it to pick the 2nd or 3rd most likely word, making the AI more 'creative'."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/decoder"
      nextModule="/prediction"
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onReplay={handleReplay}
      speed={speed}
      onSpeedChange={setSpeed}
    />
  );
};
