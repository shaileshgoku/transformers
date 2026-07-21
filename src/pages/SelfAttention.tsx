import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';

const sentence = ["The", "animal", "didn't", "cross", "the", "road", "because", "it", "was", "tired."];

// Mock attention scores for the word "it" (index 7)
const attentionScores: Record<number, number> = {
  0: 0.01,
  1: 0.65, // animal
  2: 0.02,
  3: 0.05,
  4: 0.01,
  5: 0.20, // road
  6: 0.02,
  7: 0.01, // it
  8: 0.01,
  9: 0.02,
};

export const SelfAttention = () => {
  const [activeToken, setActiveToken] = useState<number | null>(null);

  const handleTokenClick = (index: number) => {
    // For MVP, we only highlight the specific behavior when "it" is clicked.
    if (index === 7) {
      setActiveToken(index);
    } else {
      setActiveToken(null);
    }
  };

  const explanation = (
    <>
      <p><strong>Connecting the Context</strong></p>
      <p>Self-Attention allows the model to look at other words in the sequence to get a better understanding of the current word.</p>
      <p className="mt-4">When processing the word <strong>"it"</strong> in our example, how does the model know if "it" refers to the animal or the road? By using Queries and Keys, the model scores how relevant every other word is to "it".</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li>Attention computes a score between every pair of words.</li>
      <li>Score = Dot Product of (Query of Word A) × (Key of Word B).</li>
      <li>Higher scores mean stronger contextual relationships.</li>
      <li>These scores dictate how much <em>Value</em> from other words is mixed into the current word.</li>
    </ul>
  );

  const interactiveArea = (
    <div className="flex flex-col items-center justify-center w-full gap-12">
      <div className="text-center text-slate-300 mb-4">
        Click on the word <strong className="text-primary-400">"it"</strong> to see its attention mechanism.
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-2xl relative">
        {sentence.map((word, idx) => {
          const isTarget = activeToken !== null && idx === activeToken;
          const score = activeToken !== null ? attentionScores[idx] : 0;
          const isAttended = score > 0.1;

          return (
            <motion.div
              key={idx}
              onClick={() => handleTokenClick(idx)}
              className={`relative px-4 py-2 rounded-lg font-mono text-lg cursor-pointer transition-all duration-300
                ${idx === 7 ? 'ring-2 ring-primary-500/50 hover:bg-primary-500/20' : 'hover:bg-slate-700'}
                ${isTarget ? 'bg-primary-600 text-white shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]' : 'bg-slate-800 text-slate-300'}
              `}
            >
              {word}

              {/* Attention line indicator below the word */}
              <AnimatePresence>
                {activeToken !== null && idx !== activeToken && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: score * 100, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-primary-500 to-transparent rounded-full mt-2"
                    style={{ 
                      height: `${score * 100}px`,
                      opacity: score * 2 + 0.1 
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Attention Score Label */}
              <AnimatePresence>
                {activeToken !== null && isAttended && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold bg-slate-900 border border-primary-500/30 text-primary-300 px-2 py-1 rounded shadow-lg whitespace-nowrap"
                  >
                    {(score * 100).toFixed(0)}% Attention
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeToken !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/80 border border-primary-500/30 p-6 rounded-xl max-w-md text-center shadow-xl"
          >
            <p className="text-slate-300">
              The model correctly attends heavily to <strong>"animal"</strong> (65%) because the sentence context ("was tired") implies the animal was tired, not the road.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <ModuleLayout
      title="Self Attention"
      explanation={explanation}
      businessInsight="Helps AI understand context and resolve ambiguities, like knowing 'Apple' means the company and not the fruit in a specific sentence."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/qkv"
      nextModule="/multi-head-attention"
    />
  );
};
