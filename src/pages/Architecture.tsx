import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Architecture = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col p-8 overflow-y-auto overflow-x-hidden text-slate-200">
      <div className="max-w-5xl mx-auto w-full">
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-light tracking-tight text-white mb-4">
            The Transformer <span className="font-semibold text-primary-400">Architecture</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The complete map of the model. The <strong>Encoder</strong> (left) builds a deep understanding of the input context. The <strong>Decoder</strong> (right) uses that context to generate the output one word at a time. Click any block to explore its interactive module.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto mt-16 pb-32">
          
          {/* BACKGROUND SVGS for Routing */}
          <svg className="absolute inset-0 w-full h-[800px] pointer-events-none z-0 overflow-visible" style={{ minHeight: '100%' }}>
            
            {/* Encoder Stack to Decoder Cross-Attention (K, V routing) */}
            <motion.path
              d="M 320 300 C 450 300, 450 400, 580 400"
              fill="none"
              stroke="rgba(34, 197, 94, 0.4)"
              strokeWidth="4"
              strokeDasharray="8,8"
              className="drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
            
            <text x="430" y="325" fill="#4ade80" fontSize="12" fontWeight="bold" className="font-mono">K, V</text>
            
            {/* Decoder Self-Attention to Cross-Attention (Q routing) */}
            <motion.path
              d="M 720 540 L 720 480"
              fill="none"
              stroke="rgba(139, 92, 246, 0.4)"
              strokeWidth="4"
              strokeDasharray="8,8"
              className="drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
            
            <text x="735" y="515" fill="#a855f7" fontSize="12" fontWeight="bold" className="font-mono">Q</text>
          </svg>

          {/* TWO COLUMN GRID */}
          <div className="grid grid-cols-2 gap-32 relative z-10 pt-20">
            
            {/* ======================= ENCODER (LEFT) ======================= */}
            <div className="flex flex-col items-center gap-6">
              
              {/* Inputs */}
              <div className="flex flex-col items-center gap-2">
                <div 
                  className="bg-slate-800 border border-slate-600 px-6 py-3 rounded-lg text-sm font-mono cursor-pointer hover:bg-slate-700 transition-colors shadow-lg"
                  onClick={() => navigate('/tokenization')}
                >
                  Inputs ("I am a student")
                </div>
                <div className="w-1 h-8 bg-slate-600"></div>
                
                <div 
                  className="bg-primary-900/40 border border-primary-500/50 text-primary-300 px-6 py-3 rounded-lg text-sm font-bold cursor-pointer hover:bg-primary-800/60 transition-colors shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]"
                  onClick={() => navigate('/embedding')}
                >
                  Input Embedding
                </div>
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center text-xs">+</div>
                  <div 
                    className="bg-cyan-900/40 border border-cyan-500/50 text-cyan-300 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-cyan-800/60 transition-colors"
                    onClick={() => navigate('/positional-encoding')}
                  >
                    Positional Encoding
                  </div>
                </div>
              </div>

              <div className="w-1 h-8 bg-slate-600"></div>

              {/* Encoder Block Container */}
              <div 
                className="bg-slate-800/50 border-2 border-slate-600 p-6 rounded-2xl w-80 flex flex-col items-center cursor-pointer hover:border-slate-500 transition-colors"
                onClick={() => navigate('/encoder')}
              >
                <div className="text-xs text-slate-400 mb-4 tracking-widest font-bold">ENCODER BLOCK (Nx)</div>
                
                <div 
                  className="w-full bg-slate-800 border border-slate-600 p-4 rounded-xl flex flex-col items-center hover:bg-slate-700 transition-colors"
                  onClick={(e) => { e.stopPropagation(); navigate('/self-attention'); }}
                >
                  <div className="font-bold text-slate-300">Multi-Head Attention</div>
                </div>

                <div 
                  className="w-full text-center text-xs text-slate-400 py-2 cursor-pointer hover:text-slate-300"
                  onClick={(e) => { e.stopPropagation(); navigate('/add-norm'); }}
                >
                  Add & Norm
                </div>

                <div 
                  className="w-full bg-slate-800 border border-slate-600 p-4 rounded-xl flex flex-col items-center mt-4 hover:bg-slate-700 transition-colors"
                  onClick={(e) => { e.stopPropagation(); navigate('/feed-forward'); }}
                >
                  <div className="font-bold text-slate-300">Feed Forward</div>
                </div>

                <div 
                  className="w-full text-center text-xs text-slate-400 py-2 cursor-pointer hover:text-slate-300"
                  onClick={(e) => { e.stopPropagation(); navigate('/add-norm'); }}
                >
                  Add & Norm
                </div>
              </div>

            </div>


            {/* ======================= DECODER (RIGHT) ======================= */}
            <div className="flex flex-col items-center gap-6 mt-[-100px]">
              
              {/* Output / Shifted Right */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-slate-800 border border-slate-600 px-6 py-3 rounded-lg text-sm font-mono cursor-pointer hover:bg-slate-700 transition-colors shadow-lg">
                  Outputs (shifted right)
                </div>
                <div className="w-1 h-8 bg-slate-600"></div>
                
                <div className="bg-primary-900/40 border border-primary-500/50 text-primary-300 px-6 py-3 rounded-lg text-sm font-bold shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]">
                  Output Embedding
                </div>
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center text-xs">+</div>
                  <div className="bg-cyan-900/40 border border-cyan-500/50 text-cyan-300 px-4 py-2 rounded-lg text-xs font-bold">
                    Positional Encoding
                  </div>
                </div>
              </div>

              <div className="w-1 h-8 bg-slate-600"></div>

              {/* Decoder Block Container */}
              <div 
                className="bg-slate-800/50 border-2 border-slate-600 p-6 rounded-2xl w-80 flex flex-col items-center cursor-pointer hover:border-slate-500 transition-colors"
                onClick={() => navigate('/decoder')}
              >
                <div className="text-xs text-slate-400 mb-4 tracking-widest font-bold">DECODER BLOCK (Nx)</div>
                
                <div className="w-full bg-slate-800 border border-slate-600 p-4 rounded-xl flex flex-col items-center hover:bg-slate-700 transition-colors relative">
                  <div className="font-bold text-slate-300">Masked Multi-Head Attention</div>
                  {/* Q generator */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-900/80 text-purple-300 text-[10px] px-2 py-0.5 rounded border border-purple-500/50">Generates Q</div>
                </div>

                <div className="w-full text-center text-xs text-slate-400 py-2">
                  Add & Norm
                </div>

                {/* Cross Attention Block */}
                <div className="w-full bg-slate-800 border-2 border-green-500/50 p-4 rounded-xl flex flex-col items-center mt-4 relative shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                  <div className="font-bold text-green-400">Cross Attention</div>
                  <div className="text-[10px] text-green-300/70">Combines Q from Decoder with K,V from Encoder</div>
                  
                  {/* Connection target point for SVG */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="w-full text-center text-xs text-slate-400 py-2">
                  Add & Norm
                </div>

                <div className="w-full bg-slate-800 border border-slate-600 p-4 rounded-xl flex flex-col items-center mt-4 hover:bg-slate-700 transition-colors">
                  <div className="font-bold text-slate-300">Feed Forward</div>
                </div>

                <div className="w-full text-center text-xs text-slate-400 py-2">
                  Add & Norm
                </div>
              </div>

              <div className="w-1 h-8 bg-slate-600"></div>
              
              <div className="w-full bg-slate-800 border border-slate-600 p-4 rounded-xl flex flex-col items-center text-sm font-bold text-slate-300">
                Linear Layer
              </div>

              <div className="w-1 h-8 bg-slate-600"></div>

              <div 
                className="bg-yellow-900/40 border border-yellow-500/50 text-yellow-300 px-8 py-3 rounded-xl font-bold cursor-pointer hover:bg-yellow-800/60 transition-colors shadow-[0_0_20px_-5px_rgba(234,179,8,0.4)]"
                onClick={() => navigate('/softmax')}
              >
                Softmax
              </div>

              <div className="w-1 h-8 bg-slate-600"></div>

              <div 
                className="bg-green-900/60 border-2 border-green-500 text-green-300 px-8 py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-green-800 transition-colors shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                onClick={() => navigate('/prediction')}
              >
                Output Probabilities
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
