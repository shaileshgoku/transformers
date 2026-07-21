import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';

export const QKV = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); // 0: Token, 1: Splitting, 2: QKV
  const [speed, setSpeed] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

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
      const timer = setTimeout(() => setStep(1), 800 / speed);
      return () => clearTimeout(timer);
    } else if (step === 1) {
      const timer = setTimeout(() => setStep(2), 1200 / speed);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, step, speed]);

  const explanation = (
    <>
      <p><strong>The Attention Setup</strong></p>
      <p>Before a Transformer can figure out which words are related to each other, it projects each word's embedding into three distinct vectors: <strong>Query</strong>, <strong>Key</strong>, and <strong>Value</strong>.</p>
      <p className="mt-4">Think of this like a database search. You use a <em>Query</em> to search against <em>Keys</em>, and when you find a match, you extract the <em>Value</em>.</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li>Each input embedding is multiplied by three learned weight matrices ($W_Q, W_K, W_V$).</li>
      <li>This results in three smaller vectors for every single word.</li>
      <li><strong>Q (Query):</strong> Used to score relevance against other words.</li>
      <li><strong>K (Key):</strong> Represents the word's identity to other queries.</li>
      <li><strong>V (Value):</strong> The actual underlying meaning that gets passed forward.</li>
    </ul>
  );

  const interactiveArea = (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px]">
      <div className="relative flex flex-col items-center w-full max-w-2xl mt-12">
        
        {/* Step 0 & 1: The Base Token Embedding */}
        <AnimatePresence>
          {(step === 0 || step === 1) && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ 
                y: step === 1 ? -20 : 0, 
                opacity: step === 1 ? 0 : 1,
                scale: step === 1 ? 1.2 : 1
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 / speed }}
              className="absolute top-0 bg-primary-600/20 border border-primary-500/50 text-primary-300 px-8 py-4 rounded-xl font-mono text-xl shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] z-10"
            >
              [Token Embedding]
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transforming Lines */}
        {step >= 1 && (
          <div className="absolute top-12 w-full flex justify-center gap-[150px] z-0">
            <motion.div 
              initial={{ height: 0, opacity: 0, rotate: 25, transformOrigin: 'top center' }}
              animate={{ height: 120, opacity: 1 }}
              transition={{ duration: 1 / speed }}
              className="w-1 bg-gradient-to-b from-primary-500 to-red-500 -ml-[150px]"
            />
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 120, opacity: 1 }}
              transition={{ duration: 1 / speed }}
              className="w-1 bg-gradient-to-b from-primary-500 to-green-500 absolute"
            />
            <motion.div 
              initial={{ height: 0, opacity: 0, rotate: -25, transformOrigin: 'top center' }}
              animate={{ height: 120, opacity: 1 }}
              transition={{ duration: 1 / speed }}
              className="w-1 bg-gradient-to-b from-primary-500 to-blue-500 ml-[150px]"
            />
          </div>
        )}

        {/* Step 2: Q, K, V */}
        <AnimatePresence>
          {step === 2 && (
            <div className="absolute top-[130px] flex justify-center gap-12 w-full">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 / speed }}
                className="relative"
                onMouseEnter={() => setHoveredNode('query')}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="bg-red-600/20 border border-red-500/50 text-red-300 px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-red-600/30 transition-colors text-center w-32 shadow-[0_0_20px_-5px_rgba(239,68,68,0.4)]">
                  Query (Q)
                </div>
                <AnimatePresence>
                  {hoveredNode === 'query' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-16 left-1/2 -translate-x-1/2 w-48 bg-slate-800 border border-slate-700 p-3 rounded-lg text-sm text-slate-300 text-center shadow-xl z-20"
                    >
                      "What am I looking for?"
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 / speed }}
                className="relative"
                onMouseEnter={() => setHoveredNode('key')}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="bg-green-600/20 border border-green-500/50 text-green-300 px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-green-600/30 transition-colors text-center w-32 shadow-[0_0_20px_-5px_rgba(34,197,94,0.4)]">
                  Key (K)
                </div>
                <AnimatePresence>
                  {hoveredNode === 'key' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-16 left-1/2 -translate-x-1/2 w-48 bg-slate-800 border border-slate-700 p-3 rounded-lg text-sm text-slate-300 text-center shadow-xl z-20"
                    >
                      "What do I represent?"
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 / speed }}
                className="relative"
                onMouseEnter={() => setHoveredNode('value')}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="bg-blue-600/20 border border-blue-500/50 text-blue-300 px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-blue-600/30 transition-colors text-center w-32 shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]">
                  Value (V)
                </div>
                <AnimatePresence>
                  {hoveredNode === 'value' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-16 left-1/2 -translate-x-1/2 w-48 bg-slate-800 border border-slate-700 p-3 rounded-lg text-sm text-slate-300 text-center shadow-xl z-20"
                    >
                      "What information do I carry?"
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

            </div>
          )}
        </AnimatePresence>
        
        {/* Instruction overlay */}
        <AnimatePresence>
          {step === 2 && !hoveredNode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute top-[220px] text-slate-400 text-sm italic animate-pulse"
            >
              Hover over the blocks to see what they mean!
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Query, Key, Value"
      explanation={explanation}
      businessInsight="Helps AI identify the most important words in a customer review or support ticket."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/positional-encoding"
      nextModule="/self-attention"
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onReplay={handleReplay}
      speed={speed}
      onSpeedChange={setSpeed}
    />
  );
};
