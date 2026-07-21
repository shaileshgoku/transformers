import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';
import { RefreshCcw } from 'lucide-react';

export const Prediction = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); 
  const [speed, setSpeed] = useState(1);
  const [internalState, setInternalState] = useState<'idle' | 'generating' | 'looping'>('idle');

  // Total words to generate: Je suis un étudiant [END]
  const fullSequence = ["[START]", "Je", "suis", "un", "étudiant", "[END]"];

  const handlePlayPause = () => {
    if (!isPlaying && step === fullSequence.length - 1) {
      handleReplay();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReplay = () => {
    setStep(0);
    setInternalState('idle');
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  useEffect(() => {
    if (!isPlaying) return;

    if (step < fullSequence.length - 1) {
      // 1. Generate (1 second)
      setInternalState('generating');
      
      // 2. Loop back (1.5 seconds)
      const t1 = setTimeout(() => {
        setInternalState('looping');
      }, 1500 / speed);

      // 3. Update Sequence (2.5 seconds)
      const t2 = setTimeout(() => {
        setStep(s => s + 1);
        setInternalState('idle');
      }, 3000 / speed);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, step, speed]);

  const explanation = (
    <>
      <p><strong>The Infinite Loop</strong></p>
      <p>A Transformer model only ever predicts <em>one single word</em> at a time. It cannot generate a whole paragraph instantly.</p>
      <p className="mt-4">To generate long responses, it uses an <strong>Auto-Regressive Loop</strong>. It takes the single word it just generated, slaps it onto the end of the input sequence, and runs the entire multi-billion parameter model all over again just to guess the next word.</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li><strong>Input:</strong> Everything generated so far.</li>
      <li><strong>Output:</strong> Just one single token.</li>
      <li><strong>The Loop:</strong> Output is appended to Input. Repeat.</li>
      <li><strong>Stopping:</strong> The model continues looping until it specifically predicts a special `[END]` token.</li>
    </ul>
  );

  const currentSequence = fullSequence.slice(0, step + 1);
  const generatingWord = fullSequence[step + 1];

  const interactiveArea = (
    <div className="flex flex-col items-center w-full h-full min-h-[600px] relative mt-12">
      
      {/* Input Sequence Box */}
      <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-xl w-full max-w-2xl shadow-lg relative z-10 min-h-[120px]">
        <div className="text-sm font-mono text-slate-400 mb-4">Input Sequence</div>
        <div className="flex flex-wrap gap-3">
          <AnimatePresence>
            {currentSequence.map((word, idx) => (
              <motion.div
                key={`${idx}-${word}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`px-4 py-2 rounded-lg font-mono text-lg font-bold ${
                  word === '[START]' || word === '[END]' 
                  ? 'bg-slate-700 text-slate-300' 
                  : 'bg-primary-600/30 border border-primary-500/50 text-primary-300'
                }`}
              >
                {word}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Connection Down */}
      <div className="h-12 w-2 bg-gradient-to-b from-slate-700 to-primary-500/50 my-2 relative z-0">
        {internalState === 'generating' && (
          <motion.div 
            initial={{ top: 0, height: 0 }} 
            animate={{ top: '100%', height: 48 }} 
            transition={{ duration: 0.5 / speed }} 
            className="absolute w-full bg-primary-500 shadow-[0_0_10px_rgba(139,92,246,0.8)] rounded-full" 
          />
        )}
      </div>

      {/* The Transformer Model */}
      <motion.div 
        animate={{ 
          scale: internalState === 'generating' ? 1.02 : 1,
          boxShadow: internalState === 'generating' ? "0 0 40px -5px rgba(139, 92, 246, 0.6)" : "0 0 20px -5px rgba(139, 92, 246, 0.2)"
        }}
        className="bg-slate-900 border-2 border-primary-500/50 rounded-2xl p-8 w-64 text-center z-10 transition-all duration-300"
      >
        <h3 className="font-bold text-white text-xl">Transformer</h3>
        <div className="text-slate-400 text-xs mt-2">Billions of Parameters</div>
      </motion.div>

      {/* Connection Down to Output */}
      <div className="h-12 w-2 bg-gradient-to-b from-primary-500/50 to-green-500/50 my-2 relative z-0">
        {internalState === 'generating' && (
          <motion.div 
            initial={{ top: 0, height: 0 }} 
            animate={{ top: '100%', height: 48 }} 
            transition={{ delay: 0.5 / speed, duration: 0.5 / speed }} 
            className="absolute w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] rounded-full" 
          />
        )}
      </div>

      {/* The Output Container */}
      <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-xl w-64 text-center shadow-lg min-h-[100px] relative z-10 flex items-center justify-center">
        <AnimatePresence>
          {isPlaying && (internalState === 'generating' || internalState === 'looping') && generatingWord && (
            <motion.div
              key={`output-${step}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: internalState === 'generating' ? 1 / speed : 0 }}
              className={`absolute px-6 py-3 rounded-xl font-mono text-xl font-bold shadow-[0_0_20px_-5px_rgba(34,197,94,0.5)] z-20 ${
                generatingWord === '[END]' ? 'bg-red-600/30 border border-red-500/50 text-red-300' : 'bg-green-600/30 border border-green-500/50 text-green-300'
              }`}
            >
              {generatingWord}
            </motion.div>
          )}
        </AnimatePresence>
        {(!isPlaying || internalState === 'idle') && <span className="text-slate-500 text-sm">Waiting for prediction...</span>}
      </div>

      {/* The Feedback Loop Animation */}
      <AnimatePresence>
        {isPlaying && internalState === 'looping' && (
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 / speed }}
            className="absolute left-0 top-12 bottom-24 w-48 pointer-events-none z-0"
          >
            <svg viewBox="0 0 100 400" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <motion.path
                d="M 150 400 C -50 400, -50 0, 100 0"
                fill="none"
                stroke="rgba(34, 197, 94, 0.4)"
                strokeWidth="4"
                strokeDasharray="10,10"
                className="drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]"
              />
              <motion.div 
                className="absolute text-green-400 bg-slate-900 border border-green-500/50 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
                animate={{
                  offsetDistance: ["0%", "100%"]
                }}
                transition={{
                  duration: 1.5 / speed,
                  ease: "easeInOut"
                }}
                style={{
                  offsetPath: "path('M 150 400 C -50 400, -50 0, 100 0')"
                }}
              >
                <RefreshCcw className="w-3 h-3" /> Appending
              </motion.div>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* END State Notification */}
      <AnimatePresence>
        {step === fullSequence.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border-2 border-red-500 text-red-300 px-8 py-6 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.3)] z-50 text-center"
          >
            <h2 className="text-2xl font-bold mb-2">Sequence Complete</h2>
            <p className="text-sm">The model generated the [END] token, signaling it has finished its thought.</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );

  return (
    <ModuleLayout
      title="Next Token Prediction"
      explanation={explanation}
      businessInsight="This loop is why longer responses take longer to generate. To write a 1,000 word essay, the AI must run the entire multi-billion parameter model 1,000 separate times."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/softmax"
      nextModule="/about" // Assuming About is next
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onReplay={handleReplay}
      speed={speed}
      onSpeedChange={setSpeed}
    />
  );
};
