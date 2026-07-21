import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';
import { Plus } from 'lucide-react';

export const AddNorm = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); // 0: Start, 1: Add, 2: Combined, 3: Normalized
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
      const timer = setTimeout(() => setStep(2), 1000 / speed);
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
      <p><strong>Preserving Original Information</strong></p>
      <p>When processing text through many complex layers, it's easy for the neural network to "forget" the original word meaning and just focus on the attention context.</p>
      <p className="mt-4"><strong>Add (Residual Connection):</strong> We literally take the original input vector and add it to the output of the attention layer. This creates a "skip connection," guaranteeing the original word meaning is never lost.</p>
      <p className="mt-4"><strong>LayerNorm:</strong> After adding them together, we normalize the vector so the values don't explode and cause mathematical instability during training.</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li><strong>Residuals:</strong> $Output = Input + Attention(Input)$</li>
      <li>Solves the "vanishing gradient" problem in deep networks.</li>
      <li><strong>Normalization:</strong> Scales the numbers to have a mean of 0 and a variance of 1.</li>
      <li>Stabilizes the network and makes learning much faster.</li>
    </ul>
  );

  const interactiveArea = (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px]">
      <div className="relative flex flex-col items-center w-full max-w-md mt-8">
        
        {/* Step 0: Initial Blocks */}
        <div className="flex justify-between w-full px-8 mb-16 relative">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: step >= 1 ? 50 : 0 }}
              className="bg-slate-700/50 border border-slate-600 text-slate-300 px-6 py-4 rounded-xl font-mono text-center shadow-lg"
            >
              [Original Input]
            </motion.div>
          </AnimatePresence>
          
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: step >= 1 ? 50 : 0 }}
              className="bg-primary-600/20 border border-primary-500/50 text-primary-300 px-6 py-4 rounded-xl font-mono text-center shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]"
            >
              [Attention Output]
            </motion.div>
          </AnimatePresence>

          {/* Plus Sign */}
          <AnimatePresence>
            {step >= 1 && step < 2 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-12 text-white bg-slate-800 p-2 rounded-full border border-slate-600 z-10"
              >
                <Plus className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Connecting Lines for Add */}
        <AnimatePresence>
          {step === 1 && (
            <>
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 100, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 / speed }}
                className="absolute top-[80px] left-[130px] h-0.5 bg-slate-500 origin-left"
              />
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 100, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 / speed }}
                className="absolute top-[80px] right-[130px] h-0.5 bg-primary-500 origin-right"
              />
            </>
          )}
        </AnimatePresence>

        {/* Step 2: Combined */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: step === 3 ? 0.3 : 1, scale: step === 3 ? 0.9 : 1, y: 0 }}
              transition={{ type: "spring" }}
              className="absolute top-[80px] bg-purple-600/30 border border-purple-500/50 text-purple-200 px-12 py-4 rounded-xl font-mono text-lg font-bold shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] z-20"
            >
              [Combined Vector]
            </motion.div>
          )}
        </AnimatePresence>

        {/* Normalization Ray */}
        <AnimatePresence>
          {step >= 2 && step < 3 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 60, opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: 0.5 / speed, duration: 0.5 / speed }}
              className="absolute top-[140px] w-1 bg-gradient-to-b from-purple-500 to-cyan-500 z-0"
            />
          )}
        </AnimatePresence>

        {/* Step 3: Normalized */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 120 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="absolute top-[60px] bg-cyan-600/20 border border-cyan-500/50 text-cyan-300 px-12 py-5 rounded-xl font-mono text-xl shadow-[0_0_40px_-5px_rgba(6,182,212,0.5)] z-30 flex flex-col items-center gap-2"
            >
              <span>[Normalized Output]</span>
              <span className="text-xs font-normal text-cyan-500/70 border border-cyan-500/30 px-2 py-1 rounded bg-slate-900/50">
                Mean ≈ 0, Variance ≈ 1
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Add & LayerNorm"
      explanation={explanation}
      businessInsight="By preserving the original input, the AI doesn't 'lose its train of thought' as it processes data through dozens of deep layers."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/multi-head-attention"
      nextModule="/feed-forward"
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onReplay={handleReplay}
      speed={speed}
      onSpeedChange={setSpeed}
    />
  );
};
