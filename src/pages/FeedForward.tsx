import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';

export const FeedForward = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); // 0: Input, 1: Expand, 2: ReLU, 3: Contract
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
      <p><strong>Thinking Deeper</strong></p>
      <p>While Attention figures out <em>which</em> words are related, the Feed Forward Network (FFN) analyzes <em>what</em> those relationships mean.</p>
      <p className="mt-4">It does this by taking the vector, expanding it into a much larger dimension to "think" about complex non-linear combinations, applying an activation function (ReLU or GELU) to filter out noise, and then squashing it back down to its original size.</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li>Applied independently to every single token.</li>
      <li>Typically expands the embedding size by a factor of 4.</li>
      <li><strong>ReLU (Rectified Linear Unit):</strong> Converts all negative numbers to zero, introducing non-linearity.</li>
      <li>Projects back down to the original embedding size.</li>
    </ul>
  );

  const interactiveArea = (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[500px]">
      <div className="relative flex flex-col items-center w-full max-w-3xl mt-12">
        
        {/* Step 0: Input */}
        <AnimatePresence>
          {(step === 0 || step === 1) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, scale: step === 1 ? 0.8 : 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 bg-primary-600/20 border border-primary-500/50 text-primary-300 px-8 py-4 rounded-xl font-mono text-xl shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] z-10 w-48 text-center"
            >
              Input Vector
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 1 & 2: Expanded Hidden Layer */}
        <AnimatePresence>
          {(step === 1 || step === 2) && (
            <motion.div 
              initial={{ opacity: 0, height: 0, width: 192 }}
              animate={{ opacity: 1, height: 120, width: 600, top: 100 }}
              exit={{ opacity: 0, height: 0, width: 192, top: 250 }}
              transition={{ duration: 0.8 / speed, type: "spring", bounce: 0.3 }}
              className="absolute bg-slate-800/80 border border-slate-600 flex items-center justify-center gap-2 p-6 rounded-xl shadow-2xl z-20 overflow-hidden"
            >
              <div className="absolute top-2 left-4 text-xs font-bold text-slate-400">Hidden Layer (4x Expansion)</div>
              {/* Nodes */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{
                    backgroundColor: step === 2 ? (Math.random() > 0.5 ? '#22c55e' : '#334155') : '#475569',
                    scale: step === 2 ? (Math.random() > 0.5 ? 1.2 : 0.8) : 1
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[10px] text-white font-bold"
                >
                  {step === 2 && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {Math.random() > 0.5 ? 'On' : '0'}
                    </motion.span>
                  )}
                </motion.div>
              ))}
              
              {/* ReLU Label Overlay */}
              <AnimatePresence>
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
                  >
                    <div className="bg-green-500/20 text-green-300 border border-green-500 px-6 py-2 rounded-lg font-bold text-xl shadow-[0_0_30px_-5px_rgba(34,197,94,0.5)]">
                      ReLU Activation
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Contracted Output */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 150, scale: 2, width: 600 }}
              animate={{ opacity: 1, y: 250, scale: 1, width: 192 }}
              transition={{ duration: 0.6 / speed, type: "spring", bounce: 0.4 }}
              className="absolute bg-cyan-600/20 border border-cyan-500/50 text-cyan-300 px-8 py-4 rounded-xl font-mono text-xl shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] z-30 flex flex-col items-center justify-center text-center"
            >
              Output Vector
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guide Text */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-[260px] text-slate-400 italic text-sm">
              Expanding dimensions to map complex features...
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-[260px] text-slate-400 italic text-sm">
              ReLU zeroes out negative values, creating non-linearity...
            </motion.div>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-[350px] text-slate-400 italic text-sm">
              Projecting back to the original size...
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Feed Forward Network"
      explanation={explanation}
      businessInsight="This is where the AI 'thinks' about what the word relationships mean. It acts as a massive memory bank storing facts it learned during training."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/add-norm"
      nextModule="/encoder"
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onReplay={handleReplay}
      speed={speed}
      onSpeedChange={setSpeed}
    />
  );
};
