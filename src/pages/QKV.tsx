import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';

export const QKV = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); 
  const [speed, setSpeed] = useState(1);

  const handlePlayPause = () => {
    if (!isPlaying && step === 6) {
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

    if (step < 6) {
      const timer = setTimeout(() => setStep(s => s + 1), 1500 / speed);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, step, speed]);

  const explanation = (
    <>
      <p><strong>Scaled Dot-Product Attention</strong></p>
      <p>Before a Transformer can figure out which words are related to each other, it projects each word's embedding into three distinct vectors: <strong>Query (Q)</strong>, <strong>Key (K)</strong>, and <strong>Value (V)</strong>.</p>
      <p className="mt-4">Think of this like a database search. You use a <em>Query</em> to search against <em>Keys</em>, and when you find a match, you extract the <em>Value</em>.</p>
      <p className="mt-4">The diagram here shows the complete math pipeline:</p>
      <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
        <li><strong>MatMul:</strong> Calculate raw compatibility scores between words (Q × K<sup>T</sup>).</li>
        <li><strong>Scale:</strong> Divide by √d<sub>k</sub> so gradients don't explode.</li>
        <li><strong>Mask:</strong> (Optional) Hide future words during text generation.</li>
        <li><strong>SoftMax:</strong> Convert scores into probabilities that sum to 1.</li>
        <li><strong>MatMul:</strong> Multiply the probabilities by the Values ($V$) to get the final context vector.</li>
      </ol>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Q:</strong> "What am I looking for?"</li>
      <li><strong>K:</strong> "What do I represent?"</li>
      <li><strong>V:</strong> "What information do I actually carry?"</li>
      <li>The output is a weighted sum of the Values, where the weight assigned to each Value is computed by a compatibility function of the Query with the corresponding Key.</li>
    </ul>
  );

  // Reusable component for the architecture blocks
  const ArchBlock = ({ title, colorClass, x, y, width = "w-28", isActive = false }: { title: string, colorClass: string, x: number, y: number, width?: string, isActive?: boolean }) => (
    <div 
      className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border-2 border-slate-900 rounded-md px-2 py-2 text-center text-sm font-semibold shadow-md text-slate-900 z-20 ${colorClass} ${width} transition-all duration-300 ${isActive ? 'ring-4 ring-primary-400 scale-105' : ''}`}
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {title}
    </div>
  );

  const interactiveArea = (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[550px]">
      
      <div className="relative w-[500px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-visible text-slate-800 flex-shrink-0 mt-8 font-sans">
        
        {/* Title */}
        <div className="absolute top-4 left-0 w-full text-center">
          <h2 className="text-xl font-bold border-b-2 border-red-600 inline-block pb-1 text-slate-800">Scaled Dot-Product Attention</h2>
        </div>

        {/* ================= SVG ARROWS ================= */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#1e293b" />
            </marker>
          </defs>

          {/* Q and K to Bottom MatMul */}
          <path d="M 120 460 L 120 410" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 180 460 L 180 410" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          {/* Main vertical spine (MatMul -> Scale -> Mask -> Softmax -> MatMul) */}
          <path d="M 150 370 L 150 330" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 150 290 L 150 250" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 150 210 L 150 170" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 150 130 L 150 100" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          {/* V to Top MatMul */}
          <path d="M 280 460 L 280 100" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* Output from Top MatMul */}
          <path d="M 215 60 L 215 30" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* ======== ANIMATED DATA DOTS ======== */}
          {/* Q & K flowing */}
          {(step === 1) && (
            <>
              <motion.circle r="6" fill="#8b5cf6" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 1 / speed, ease: "linear" }} style={{ offsetPath: "path('M 120 460 L 120 410')" }} />
              <motion.circle r="6" fill="#8b5cf6" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 1 / speed, ease: "linear" }} style={{ offsetPath: "path('M 180 460 L 180 410')" }} />
            </>
          )}

          {/* Post-MatMul to Scale */}
          {(step === 2) && (
            <motion.circle r="6" fill="#8b5cf6" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 1 / speed, ease: "linear" }} style={{ offsetPath: "path('M 150 370 L 150 330')" }} />
          )}

          {/* Scale to Mask */}
          {(step === 3) && (
            <motion.circle r="6" fill="#8b5cf6" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 1 / speed, ease: "linear" }} style={{ offsetPath: "path('M 150 290 L 150 250')" }} />
          )}

          {/* Mask to Softmax */}
          {(step === 4) && (
            <motion.circle r="6" fill="#8b5cf6" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 1 / speed, ease: "linear" }} style={{ offsetPath: "path('M 150 210 L 150 170')" }} />
          )}

          {/* Softmax to Top MatMul AND V to Top MatMul */}
          {(step === 5) && (
            <>
              <motion.circle r="6" fill="#8b5cf6" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 1 / speed, ease: "linear" }} style={{ offsetPath: "path('M 150 130 L 150 100')" }} />
              <motion.circle r="6" fill="#ec4899" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 1 / speed, ease: "linear" }} style={{ offsetPath: "path('M 280 460 L 280 100')" }} />
            </>
          )}

          {/* Final Output */}
          {(step === 6) && (
            <motion.circle r="6" fill="#10b981" animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 1 / speed, ease: "linear" }} style={{ offsetPath: "path('M 215 60 L 215 30')" }} />
          )}
        </svg>

        {/* ================= BLOCKS ================= */}
        
        {/* Top MatMul (Takes from Softmax and V) */}
        <ArchBlock title="MatMul" colorClass="bg-[#c4b5fd]" x={215} y={80} width="w-40" isActive={step === 5 || step === 6} />
        
        {/* SoftMax */}
        <ArchBlock title="SoftMax" colorClass="bg-[#bbf7d0]" x={150} y={150} isActive={step === 4} />
        
        {/* Mask */}
        <ArchBlock title="Mask (opt.)" colorClass="bg-[#fbcfe8]" x={150} y={230} isActive={step === 3} />
        
        {/* Scale */}
        <ArchBlock title="Scale" colorClass="bg-[#fef08a]" x={150} y={310} width="w-24" isActive={step === 2} />
        
        {/* Bottom MatMul (Takes from Q and K) */}
        <ArchBlock title="MatMul" colorClass="bg-[#c4b5fd]" x={150} y={390} isActive={step === 1} />

        {/* ================= INPUTS ================= */}
        <div className={`absolute left-[120px] top-[470px] -translate-x-1/2 font-medium text-lg transition-colors ${step === 1 ? 'text-primary-500 font-bold' : 'text-slate-800'}`}>Q</div>
        <div className={`absolute left-[180px] top-[470px] -translate-x-1/2 font-medium text-lg transition-colors ${step === 1 ? 'text-primary-500 font-bold' : 'text-slate-800'}`}>K</div>
        <div className={`absolute left-[280px] top-[470px] -translate-x-1/2 font-medium text-lg transition-colors ${step === 5 ? 'text-pink-500 font-bold' : 'text-slate-800'}`}>V</div>

        {/* ================= POP-OUT INFORMATION CARDS ================= */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute left-[240px] top-[370px] bg-slate-800 text-white p-3 rounded-lg shadow-xl border border-slate-700 w-56 z-30"
            >
              <div className="text-xs text-slate-400 mb-1">Step 1: Raw Scores</div>
              <div className="text-sm font-mono tracking-wider">Q × K<sup>T</sup></div>
              <div className="text-xs mt-1 text-slate-300">Computes the dot product to see how much each query relates to each key.</div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute left-[240px] top-[290px] bg-slate-800 text-white p-3 rounded-lg shadow-xl border border-slate-700 w-56 z-30"
            >
              <div className="text-xs text-slate-400 mb-1">Step 2: Scaling</div>
              <div className="text-sm font-mono tracking-wider">(Q × K<sup>T</sup>) / √d<sub>k</sub></div>
              <div className="text-xs mt-1 text-slate-300">Dividing by the square root of the dimension prevents values from getting too large.</div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute left-[240px] top-[210px] bg-slate-800 text-white p-3 rounded-lg shadow-xl border border-slate-700 w-56 z-30"
            >
              <div className="text-xs text-slate-400 mb-1">Step 3: Masking (Optional)</div>
              <div className="text-xs mt-1 text-slate-300">Sets future token scores to -∞ so they become 0 after Softmax. Used in Decoder.</div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute left-[240px] top-[130px] bg-slate-800 text-white p-3 rounded-lg shadow-xl border border-slate-700 w-56 z-30"
            >
              <div className="text-xs text-slate-400 mb-1">Step 4: Attention Weights</div>
              <div className="text-sm font-mono tracking-wider">softmax( (Q × K<sup>T</sup>) / √d<sub>k</sub> )</div>
              <div className="text-xs mt-1 text-slate-300">Converts scores into a probability distribution (values between 0 and 1).</div>
            </motion.div>
          )}

          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-[10px] top-[50px] bg-slate-800 text-white p-3 rounded-lg shadow-xl border border-slate-700 w-56 z-30"
            >
              <div className="text-xs text-slate-400 mb-1">Step 5: Context Vector</div>
              <div className="text-sm font-mono tracking-wider">Weights × V</div>
              <div className="text-xs mt-1 text-green-300 font-medium">Final Output! Each token now contains context from relevant tokens.</div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Scaled Dot-Product Attention"
      explanation={explanation}
      businessInsight="This is the core mathematical engine of a Transformer. It allows the model to instantly pull relevant information from anywhere in the document."
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
