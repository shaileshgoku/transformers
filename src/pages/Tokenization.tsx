import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModuleLayout } from '../components/ModuleLayout';

export const Tokenization = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputText, setInputText] = useState("I love learning AI");
  const [tokens, setTokens] = useState<string[]>([]);
  const [speed, setSpeed] = useState(1);

  const handlePlayPause = () => {
    if (!isPlaying && tokens.length === 0) {
      startAnimation();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const startAnimation = () => {
    setTokens([]);
    setIsPlaying(true);
  };

  const handleReplay = () => {
    setTokens([]);
    setIsPlaying(false);
    setTimeout(() => {
      startAnimation();
    }, 100);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const words = inputText.trim().split(/\s+/).filter(Boolean);
    if (tokens.length >= words.length) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setTokens(prev => [...prev, words[prev.length]]);
    }, 1000 / speed);

    return () => clearTimeout(timer);
  }, [isPlaying, tokens, inputText, speed]);

  const explanation = (
    <>
      <p><strong>What is tokenization?</strong></p>
      <p>Tokenization is the process of breaking down raw text into smaller, manageable pieces called <em>tokens</em>. These tokens can be words, subwords, or even individual characters.</p>
      <p className="mt-4"><strong>Why are tokens needed?</strong></p>
      <p>Computers and AI models don't natively understand human language. By breaking text into tokens, the model can assign numerical values to them in the next step, making the text digestible for mathematical operations.</p>
    </>
  );

  const conceptSummary = (
    <ul className="list-disc pl-5 space-y-3">
      <li>Text is the raw input.</li>
      <li>Tokens are the fundamental units of data for a language model.</li>
      <li>Spaces and punctuation are often used as boundaries for splitting.</li>
      <li>Modern models use "sub-word" tokenization (e.g., splitting "unbelievable" into "un", "believ", "able") to handle rare words efficiently.</li>
    </ul>
  );

  const interactiveArea = (
    <div className="flex flex-col items-center w-full max-w-xl gap-12">
      <div className="w-full">
        <label className="block text-sm font-medium text-slate-400 mb-2">Input Sentence</label>
        <input 
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setTokens([]);
            setIsPlaying(false);
          }}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-primary-500 transition-colors text-xl text-center"
          placeholder="Type a sentence here..."
        />
      </div>

      <div className="h-24 w-full flex flex-wrap justify-center content-start gap-3">
        <AnimatePresence>
          {tokens.map((token, index) => (
            <motion.div
              key={`${index}-${token}`}
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-primary-600/20 border border-primary-500/50 text-primary-300 px-4 py-2 rounded-lg font-mono text-lg shadow-lg shadow-primary-500/10"
            >
              [{token}]
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <ModuleLayout
      title="Tokenization"
      explanation={explanation}
      businessInsight="Customer reviews are converted into tokens before analysis."
      conceptSummary={conceptSummary}
      interactiveArea={interactiveArea}
      prevModule="/architecture"
      nextModule="/embedding"
      isPlaying={isPlaying}
      onPlayPause={handlePlayPause}
      onReplay={handleReplay}
      speed={speed}
      onSpeedChange={setSpeed}
    />
  );
};
