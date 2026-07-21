import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';
import { Shuffle } from 'lucide-react';

export const PositionalEncoding = () => {
  const [tokens, setTokens] = useState(["The", "dog", "chased", "the", "cat"]);
  
  const handleShuffle = () => {
    const shuffled = [...tokens].sort(() => Math.random() - 0.5);
    setTokens(shuffled);
  };

  const explanation = (
    <>
      <p><strong>Adding sense of order</strong></p>
      <p>Unlike recurrent networks (RNNs) which read words one by one, Transformers read all words simultaneously. This makes them incredibly fast, but it means they have no built-in concept of word order.</p>
      <p className="mt-4">To fix this, we add a <em>Positional Encoding</em> vector to every word's embedding vector. This gives every word a unique stamp indicating its position in the sentence.</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li>Transformers process data in parallel, losing sequence order.</li>
      <li>Positional Encodings are vectors of the same size as embeddings.</li>
      <li>They are added (Element-wise) to the embeddings: <code>Input = Embedding + Position</code></li>
      <li>Uses sine and cosine functions of different frequencies to generate unique positional signatures.</li>
    </ul>
  );

  const interactiveArea = (
    <div className="flex flex-col items-center w-full max-w-2xl gap-8">
      <button 
        onClick={handleShuffle}
        className="btn-secondary flex items-center gap-2 mb-4"
      >
        <Shuffle className="w-5 h-5" /> Shuffle Tokens
      </button>

      <div className="flex gap-4 w-full justify-center">
        <AnimatePresence mode="popLayout">
          {tokens.map((token, index) => (
            <motion.div
              layout
              key={token + index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col items-center gap-3"
            >
              {/* The Token */}
              <div className="bg-primary-600/20 border border-primary-500/50 text-primary-300 px-4 py-2 rounded-lg font-mono font-bold w-24 text-center">
                {token}
              </div>
              
              <div className="text-slate-500 text-sm font-mono">+</div>
              
              {/* The Positional Encoding (Fixed to index) */}
              <div className="bg-blue-600/20 border border-blue-500/50 text-blue-300 px-4 py-2 rounded-lg font-mono text-sm w-24 text-center">
                Pos_{index}
              </div>

              <div className="h-6 border-l-2 border-dashed border-slate-600 my-1" />
              
              {/* Combined Result */}
              <motion.div 
                key={`result-${token}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-purple-600/20 border border-purple-500/50 text-purple-300 px-2 py-3 rounded-lg font-mono text-xs w-24 text-center break-all shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)]"
              >
                [Emb_{token.substring(0,2).toUpperCase()} + P_{index}]
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 text-center text-slate-400 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <p>Notice how the <strong>Pos_{"{index}"}</strong> stays fixed to the slot, while the tokens move.</p>
        <p className="text-sm mt-1">This ensures "dog" in position 1 is mathematically different from "dog" in position 4.</p>
      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Positional Encoding"
      explanation={explanation}
      businessInsight="Ensures the AI understands the difference between 'The dog chased the cat' and 'The cat chased the dog'."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/embedding"
      nextModule="/qkv"
    />
  );
};
