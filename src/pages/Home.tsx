import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LayoutTemplate } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] translate-x-32"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-3xl"
      >
        <h1 className="text-6xl font-extrabold tracking-tight mb-6 text-white">
          <span className="gradient-text">Transformer</span> Explorer
        </h1>
        
        <p className="text-2xl text-slate-300 mb-10 font-light">
          Visualize how Transformers actually work.
        </p>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => navigate('/tokenization')}
            className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
          >
            Start Learning
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => navigate('/architecture')}
            className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
          >
            <LayoutTemplate className="w-5 h-5" />
            Explore Architecture
          </button>
        </div>
      </motion.div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};
