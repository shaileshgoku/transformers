import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';

export const MultiHeadAttention = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); // 0: Start, 1: 4 Heads, 2: Concat, 3: Linear Layer
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
      const timer = setTimeout(() => setStep(1), 800 / speed);
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
      <p><strong>Multiple Perspectives</strong></p>
      <p>Why use just one Attention mechanism? A single word can have multiple relationships in a sentence. For example, "bank" could relate to "river" (geography) or "money" (finance).</p>
      <p className="mt-4"><strong>Multi-Head Attention</strong> runs several self-attention mechanisms in parallel (heads). Each head learns to focus on different aspects of the language (like grammar, vocabulary, or sentiment).</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li>The embedding is split into multiple smaller chunks (Heads).</li>
      <li>Each Head computes its own Q, K, V and attention scores independently.</li>
      <li><strong>Concat:</strong> The outputs from all heads are glued back together.</li>
      <li><strong>Linear Layer:</strong> A final weight matrix mixes the concatenated data back into the original embedding size.</li>
    </ul>
  );

  const interactiveArea = (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[450px]">
      <div className="relative flex flex-col items-center w-full max-w-3xl mt-4">
        
        {/* Step 0: Initial Input */}
        <AnimatePresence>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-primary-600/20 border border-primary-500/50 text-primary-300 px-8 py-3 rounded-xl font-mono text-lg shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] mb-12"
            >
              [Input Embedding]
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 1: 4 Heads */}
        <AnimatePresence>
          {step >= 1 && step < 2 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.5 / speed }}
              className="flex gap-6 mb-12"
            >
              {[
                { name: 'Head 1', color: 'text-red-300', bg: 'bg-red-600/20', border: 'border-red-500/50', shadow: 'shadow-[0_0_15px_-3px_rgba(239,68,68,0.4)]' },
                { name: 'Head 2', color: 'text-green-300', bg: 'bg-green-600/20', border: 'border-green-500/50', shadow: 'shadow-[0_0_15px_-3px_rgba(34,197,94,0.4)]' },
                { name: 'Head 3', color: 'text-blue-300', bg: 'bg-blue-600/20', border: 'border-blue-500/50', shadow: 'shadow-[0_0_15px_-3px_rgba(59,130,246,0.4)]' },
                { name: 'Head 4', color: 'text-yellow-300', bg: 'bg-yellow-600/20', border: 'border-yellow-500/50', shadow: 'shadow-[0_0_15px_-3px_rgba(234,179,8,0.4)]' },
              ].map((head, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: (idx * 0.1) / speed }}
                  className={`${head.bg} ${head.border} ${head.color} ${head.shadow} px-6 py-8 rounded-xl font-bold flex flex-col items-center gap-3 border`}
                >
                  <span>{head.name}</span>
                  <div className="flex gap-1 mt-2">
                    <div className="w-2 h-10 bg-current rounded-full animate-pulse opacity-50" />
                    <div className="w-2 h-10 bg-current rounded-full animate-pulse opacity-75" style={{ animationDelay: '200ms' }} />
                    <div className="w-2 h-10 bg-current rounded-full animate-pulse opacity-100" style={{ animationDelay: '400ms' }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Concat */}
        <AnimatePresence>
          {step >= 2 && step < 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 / speed, type: "spring" }}
              className="flex flex-col items-center mb-12"
            >
              <div className="text-slate-400 mb-2 font-mono text-sm">Concatenation</div>
              <div className="flex h-20 shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] rounded-xl overflow-hidden border border-slate-600">
                <div className="w-24 bg-red-600/40 border-r border-slate-700/50 flex items-center justify-center text-red-300 text-xs font-mono">H1</div>
                <div className="w-24 bg-green-600/40 border-r border-slate-700/50 flex items-center justify-center text-green-300 text-xs font-mono">H2</div>
                <div className="w-24 bg-blue-600/40 border-r border-slate-700/50 flex items-center justify-center text-blue-300 text-xs font-mono">H3</div>
                <div className="w-24 bg-yellow-600/40 flex items-center justify-center text-yellow-300 text-xs font-mono">H4</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Linear Layer */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 / speed }}
              className="flex flex-col items-center"
            >
              <div className="text-primary-400 mb-2 font-mono text-sm">Linear Projection Matrix ($W_O$)</div>
              <div className="bg-primary-600/20 border border-primary-500/50 text-primary-300 px-12 py-4 rounded-xl font-mono text-xl shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)]">
                [Final Attention Output]
              </div>
              <div className="mt-4 text-slate-400 text-sm max-w-sm text-center">
                The massive concatenated vector is shrunk back down to the original embedding size, ready for the next layer.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Multi-Head Attention"
      explanation={explanation}
      businessInsight="Allows the AI to capture multiple meanings simultaneously—e.g. noticing that a review is both 'sarcastic' and 'about shipping times' at the same time."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/self-attention"
      nextModule="/add-norm"
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onReplay={handleReplay}
      speed={speed}
      onSpeedChange={setSpeed}
    />
  );
};
