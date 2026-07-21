import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';

export const Embedding = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); // 0: Token, 1: Transforming, 2: Vector
  const [speed, setSpeed] = useState(1);
  const vectorValues = [0.13, -0.82, 0.45, 0.91, -0.23, 0.67, 0.11, "...", 0.54];

  const handlePlayPause = () => {
    if (!isPlaying && step === 2) {
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
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, step, speed]);

  const explanation = (
    <>
      <p><strong>Words become numbers</strong></p>
      <p>An embedding is a numerical representation of a token. Since neural networks can only perform math, we must convert words into a list of numbers (a vector).</p>
      <p className="mt-4">These numbers aren't random. They are learned during training so that words with similar meanings (like "dog" and "cat") have similar vectors in a high-dimensional space.</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li>Each token is mapped to a high-dimensional vector (e.g., 768 dimensions in GPT-3).</li>
      <li>Embeddings capture semantic meaning.</li>
      <li>Distance between two vectors represents how related the words are.</li>
      <li>A lookup table (Embedding Matrix) is used to instantly convert a token ID into its vector.</li>
    </ul>
  );

  const interactiveArea = (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px]">
      <div className="relative flex flex-col items-center justify-center w-full max-w-sm">
        
        {/* Step 0 & 1: The Token */}
        <AnimatePresence>
          {(step === 0 || step === 1) && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ 
                y: step === 1 ? 50 : 0, 
                opacity: step === 1 ? 0 : 1,
                scale: step === 1 ? 1.5 : 1
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 / speed }}
              className="absolute bg-primary-600/20 border border-primary-500/50 text-primary-300 px-8 py-4 rounded-xl font-mono text-2xl shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]"
            >
              [AI]
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transforming Ray */}
        {step === 1 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 100, opacity: 1 }}
            className="absolute top-10 w-1 bg-gradient-to-b from-primary-500 to-transparent"
          />
        )}

        {/* Step 2: The Vector */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 / speed }}
              className="card bg-slate-800/80 border-primary-500/40 shadow-[0_0_50px_-12px_rgba(139,92,246,0.4)] flex flex-col gap-2 p-6 min-w-[200px]"
            >
              <div className="text-center text-primary-400 font-bold mb-2 border-b border-slate-700 pb-2">
                Vector Representation
              </div>
              <div className="flex flex-col gap-1 font-mono text-sm">
                {vectorValues.map((val, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (idx * 0.1) / speed }}
                    className="flex justify-between px-4 py-1 rounded bg-slate-900/50 text-slate-300"
                  >
                    <span className="text-slate-500">d_{idx}</span>
                    <span className={typeof val === 'number' && val > 0 ? 'text-green-400' : 'text-slate-300'}>
                      {val}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Embedding"
      explanation={explanation}
      businessInsight="Converts customer text into numerical representations that AI models can understand."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/tokenization"
      nextModule="/positional-encoding"
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onReplay={handleReplay}
      speed={speed}
      onSpeedChange={setSpeed}
    />
  );
};
