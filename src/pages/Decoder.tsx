import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';
import { ArrowRight, Lock } from 'lucide-react';

export const Decoder = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); 
  const [speed, setSpeed] = useState(1);
  const [internalSubstep, setInternalSubstep] = useState(0);

  // Steps:
  // 0: Start
  // 1: Predict "Je"
  // 2: Predict "suis"
  // 3: Predict "étudiant"

  const generatedTokens = [
    { text: "[START]", step: 0 },
    { text: "Je", step: 1 },
    { text: "suis", step: 2 },
    { text: "étudiant", step: 3 }
  ];

  const handlePlayPause = () => {
    if (!isPlaying && step === 3) {
      handleReplay();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReplay = () => {
    setStep(0);
    setInternalSubstep(0);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  useEffect(() => {
    if (!isPlaying) return;

    if (step < 3) {
      // Internal Substep Sequencing
      // 0: Idle
      // 1: Masked Self Attention
      // 2: Cross Attention
      // 3: Feed Forward
      // 4: Generating Output
      setInternalSubstep(1);
      
      const t1 = setTimeout(() => setInternalSubstep(2), 1000 / speed);
      const t2 = setTimeout(() => setInternalSubstep(3), 2000 / speed);
      const t3 = setTimeout(() => setInternalSubstep(4), 3000 / speed);
      
      const timer = setTimeout(() => {
        setStep(s => s + 1);
        setInternalSubstep(0);
      }, 4000 / speed);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(timer);
      };
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, step, speed]);

  const explanation = (
    <>
      <p><strong>Generating the Output</strong></p>
      <p>The Decoder takes the rich context built by the Encoder and uses it to generate the final output sequence, one word at a time.</p>
      <p className="mt-4"><strong>Masked Attention:</strong> During training, the Decoder isn't allowed to "cheat" by looking at future words in the answer. It can only look at words it has already generated.</p>
      <p className="mt-4"><strong>Cross-Attention:</strong> For every new word it generates, it looks back at the Encoder's output to make sure it's staying true to the original input meaning.</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li><strong>Auto-regressive:</strong> It generates outputs one by one. The output of step 1 becomes the input for step 2.</li>
      <li><strong>Masking:</strong> Future tokens are zeroed out (masked) so the model learns to predict, not just copy.</li>
      <li><strong>Cross-Attention:</strong> Queries come from the Decoder (what I need next), while Keys and Values come from the Encoder (what the input means).</li>
    </ul>
  );

  const interactiveArea = (
    <div className="flex flex-col items-center w-full h-full min-h-[550px] relative mt-8">
      
      {/* Encoder Context Block */}
      <motion.div 
        animate={{
          boxShadow: internalSubstep === 2 ? "0 0 30px rgba(139, 92, 246, 0.8)" : "0 0 20px -5px rgba(139, 92, 246, 0.3)"
        }}
        className="absolute top-0 right-4 bg-primary-600/20 border border-primary-500/50 p-4 rounded-xl text-center w-40 transition-shadow duration-300 z-0"
      >
        <div className="text-primary-300 font-bold mb-2">Encoder Output</div>
        <div className="text-[10px] text-primary-200/70 font-mono">[Context Matrix]</div>
      </motion.div>

      <div className="flex flex-col w-full max-w-xl mt-12 gap-8 z-10">
        
        {/* Generated Sequence Area */}
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl min-h-[120px]">
          <div className="text-sm font-mono text-slate-400 mb-4 flex items-center justify-between">
            <span>Current Sequence (Inputs to Decoder)</span>
            <span className="flex items-center gap-1 text-yellow-500/80"><Lock className="w-4 h-4"/> Masked Future</span>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <AnimatePresence>
              {generatedTokens.filter(t => t.step <= step).map((token, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className={`px-4 py-2 rounded-lg font-mono text-lg font-bold
                    ${token.text === '[START]' ? 'bg-slate-700 text-slate-300' : 'bg-green-600/30 border border-green-500/50 text-green-300 shadow-[0_0_15px_-3px_rgba(34,197,94,0.4)]'}
                  `}
                >
                  {token.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Decoder Processing Block */}
        <div className="relative flex justify-center mt-12">
          
          {/* Cross Attention Arrow */}
          <AnimatePresence>
            {isPlaying && internalSubstep === 2 && (
              <motion.div
                key={`cross-attention-${step}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 / speed }}
                className="absolute -top-[100px] right-[40px] w-40 h-32 pointer-events-none z-0"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <motion.path
                    d="M 100 0 C 100 50, 50 80, 0 100"
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.5)"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    className="drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                  />
                  {/* Moving dot on path */}
                  <motion.circle
                    r="4"
                    fill="#a78bfa"
                    className="drop-shadow-[0_0_8px_rgba(167,139,250,1)]"
                    animate={{
                      offsetDistance: ["0%", "100%"]
                    }}
                    transition={{
                      duration: 0.8 / speed,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      offsetPath: "path('M 100 0 C 100 50, 50 80, 0 100')"
                    }}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 bg-slate-900 border border-primary-500/50 text-primary-300 text-[10px] px-2 py-1 rounded-full -translate-x-1/2 -translate-y-1/2 z-10">
                  Cross-Attention
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input entering the block */}
          <AnimatePresence>
            {isPlaying && internalSubstep >= 1 && internalSubstep <= 3 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 40, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 / speed }}
                className="absolute -top-[40px] left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-slate-500 to-transparent"
              />
            )}
          </AnimatePresence>

          <div className="bg-slate-700 border-2 border-slate-500 rounded-2xl p-6 w-80 shadow-2xl z-10 relative flex flex-col">
            <h3 className="font-bold text-white mb-4 text-center">Decoder Block</h3>
            
            <div className="flex flex-col gap-6 text-xs relative flex-1">
              
              {/* Internal data flow indicator */}
              <AnimatePresence>
                {internalSubstep > 0 && internalSubstep < 4 && (
                  <motion.div 
                    className="absolute left-[-15px] w-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)] z-20"
                    initial={{ top: '0%', height: 40 }}
                    animate={{ 
                      top: internalSubstep === 1 ? '0%' : internalSubstep === 2 ? '42%' : '84%'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </AnimatePresence>

              {/* Row 1: Masked Self-Attention */}
              <div className="relative">
                <motion.div 
                  animate={{ 
                    backgroundColor: internalSubstep === 1 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(30, 41, 59, 1)',
                    borderColor: internalSubstep === 1 ? 'rgba(234, 179, 8, 0.5)' : 'rgba(71, 85, 105, 1)',
                    scale: internalSubstep === 1 ? 1.05 : 1
                  }}
                  className="p-3 rounded text-slate-300 border border-slate-600 transition-all font-bold text-center z-20 relative"
                >
                  Masked Self-Attention
                </motion.div>
                
                {/* Output 1 */}
                <AnimatePresence>
                  {isPlaying && internalSubstep >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 20 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-1/2 -right-32 -translate-y-1/2 bg-yellow-600/20 border border-yellow-500/50 text-yellow-300 px-3 py-1.5 rounded text-[10px] font-mono whitespace-nowrap shadow-lg"
                    >
                      [Masked Context]
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Row 2: Cross-Attention */}
              <div className="relative">
                <motion.div 
                  animate={{ 
                    backgroundColor: internalSubstep === 2 ? 'rgba(139, 92, 246, 0.2)' : 'rgba(30, 41, 59, 1)',
                    borderColor: internalSubstep === 2 ? 'rgba(139, 92, 246, 0.5)' : 'rgba(71, 85, 105, 1)',
                    scale: internalSubstep === 2 ? 1.05 : 1
                  }}
                  className="p-3 rounded text-slate-300 border border-slate-600 transition-all font-bold text-center z-20 relative"
                >
                  Cross-Attention
                </motion.div>

                {/* Output 2 */}
                <AnimatePresence>
                  {isPlaying && internalSubstep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 20 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-1/2 -right-32 -translate-y-1/2 bg-primary-600/20 border border-primary-500/50 text-primary-300 px-3 py-1.5 rounded text-[10px] font-mono whitespace-nowrap shadow-lg"
                    >
                      [Fused Vector]
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Row 3: Feed Forward */}
              <div className="relative">
                <motion.div 
                  animate={{ 
                    backgroundColor: internalSubstep === 3 ? 'rgba(6, 182, 212, 0.2)' : 'rgba(30, 41, 59, 1)',
                    borderColor: internalSubstep === 3 ? 'rgba(6, 182, 212, 0.5)' : 'rgba(71, 85, 105, 1)',
                    scale: internalSubstep === 3 ? 1.05 : 1
                  }}
                  className="p-3 rounded text-slate-300 border border-slate-600 transition-all font-bold text-center z-20 relative"
                >
                  Feed Forward
                </motion.div>

                {/* Output 3 */}
                <AnimatePresence>
                  {isPlaying && internalSubstep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 20 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-1/2 -right-32 -translate-y-1/2 bg-cyan-600/20 border border-cyan-500/50 text-cyan-300 px-3 py-1.5 rounded text-[10px] font-mono whitespace-nowrap shadow-lg"
                    >
                      [Final Hidden State]
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Output Generation visualization */}
            <AnimatePresence mode="wait">
              {isPlaying && internalSubstep === 4 && (
                <motion.div
                  key={`generating-${step}`}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 30 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.3 / speed }}
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-30"
                >
                  <ArrowRight className="text-green-500 w-5 h-5 animate-pulse rotate-90" />
                  <div className="bg-green-600/20 border border-green-500/50 text-green-300 px-4 py-1 rounded-full font-mono text-sm shadow-[0_0_15px_-3px_rgba(34,197,94,0.4)] whitespace-nowrap">
                    Predicting...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Decoder"
      explanation={explanation}
      businessInsight="This auto-regressive generation is exactly what happens when you watch ChatGPT type out a response to you in real-time, word by word."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/encoder"
      nextModule="/softmax"
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onReplay={handleReplay}
      speed={speed}
      onSpeedChange={setSpeed}
    />
  );
};
