import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';
import { ArrowUp } from 'lucide-react';

export const Encoder = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); // 0: Start, 1-6: Layer passes
  const [speed, setSpeed] = useState(1);
  const totalLayers = 6;

  const handlePlayPause = () => {
    if (!isPlaying && step === totalLayers) {
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

    if (step < totalLayers) {
      const timer = setTimeout(() => setStep(s => s + 1), 800 / speed);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, step, speed]);

  const explanation = (
    <>
      <p><strong>Building Deeper Understanding</strong></p>
      <p>A single Encoder layer (Self-Attention + Feed Forward) does a good job of understanding immediate context, but complex language requires deep reasoning.</p>
      <p className="mt-4">By stacking these identical layers on top of each other (usually 6, 12, or even 96 times), the model builds highly abstract representations of the input text. The output of Layer 1 becomes the input of Layer 2, and so on.</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li>An "Encoder Block" is simply the Self-Attention and Feed Forward modules chained together.</li>
      <li>Each block operates on the same embedding dimension size, making them easily stackable.</li>
      <li>Early layers learn basic syntax (grammar, parts of speech).</li>
      <li>Deeper layers learn complex semantics (sentiment, sarcasm, logic).</li>
    </ul>
  );

  const interactiveArea = (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[500px]">
      <div className="relative flex w-full max-w-sm h-full items-center justify-center pt-12 pb-24">
        
        {/* Layer Stack */}
        <div className="flex flex-col-reverse gap-4 relative z-10 w-full">
          {Array.from({ length: totalLayers }).map((_, i) => {
            const isActive = step === i + 1;
            const isPassed = step > i;
            
            return (
              <motion.div
                key={i}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  borderColor: isActive ? 'rgba(139, 92, 246, 0.8)' : isPassed ? 'rgba(34, 197, 94, 0.5)' : 'rgba(71, 85, 105, 0.5)',
                  backgroundColor: isActive ? 'rgba(139, 92, 246, 0.2)' : isPassed ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 41, 59, 0.5)',
                }}
                className="relative border-2 rounded-xl p-4 flex flex-col items-center gap-2 shadow-lg transition-colors"
              >
                <div className="text-sm font-bold text-slate-300">Encoder Layer {i + 1}</div>
                <div className="flex gap-2 w-full text-xs font-mono">
                  <div className="bg-slate-800 rounded px-2 py-1 flex-1 text-center border border-slate-700">Self-Attention</div>
                  <div className="bg-slate-800 rounded px-2 py-1 flex-1 text-center border border-slate-700">Feed Forward</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Data Moving Up */}
        <AnimatePresence>
          {step > 0 && step <= totalLayers && (
            <motion.div 
              key={`data-${step}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4 / speed }}
              className="absolute text-primary-400 z-20 drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
              style={{
                bottom: `${(step - 1) * (100 / totalLayers) + 15}%` // Approximate positioning moving up
              }}
            >
              <ArrowUp className="w-12 h-12" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Output */}
        <AnimatePresence>
          {step === totalLayers && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 / speed }}
              className="absolute -top-16 bg-cyan-600/20 border border-cyan-500/50 text-cyan-300 px-8 py-3 rounded-xl font-bold text-center shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] z-30"
            >
              Context-Rich Encodings
              <div className="text-xs font-normal mt-1 text-cyan-500/80">Ready for the Decoder</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Initial Input */}
        <div className="absolute -bottom-8 text-slate-400 font-mono text-sm border border-slate-700 bg-slate-800/80 px-6 py-2 rounded-lg">
          Raw Input Embeddings
        </div>

      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Encoder Stack"
      explanation={explanation}
      businessInsight="Just like human reading comprehension, AI requires 'deep' thought. A 96-layer model can reason about complex legal documents, while a 6-layer model might only handle basic chat."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/feed-forward"
      nextModule="/decoder"
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onReplay={handleReplay}
      speed={speed}
      onSpeedChange={setSpeed}
    />
  );
};
