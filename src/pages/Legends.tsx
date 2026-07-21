import { BookOpen } from 'lucide-react';

export const Legends = () => {
  return (
    <div className="w-full h-full flex flex-col p-8 overflow-y-auto text-slate-300">
      <div className="max-w-4xl mx-auto w-full mt-4">
        
        <div className="flex items-center gap-4 mb-10 border-b border-slate-700 pb-6">
          <div className="p-3 bg-primary-900/30 rounded-xl border border-primary-500/30">
            <BookOpen className="w-8 h-8 text-primary-400" />
          </div>
          <div>
            <h1 className="text-4xl font-light text-white">
              Architecture <span className="font-semibold text-primary-400">Legends</span>
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Detailed explanations for the markers on the Architecture Map.</p>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Marker A */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-xl flex gap-6">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-green-900/50 border-2 border-green-500 text-green-400 font-bold text-xl shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              A
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">Encoder Self-Attention</h2>
              <h3 className="text-lg font-semibold text-white mb-2">Tokens look at each other.</h3>
              <p className="text-slate-300 leading-relaxed">
                In this block, the queries, keys, and values are all computed from the same place: the outputs of the previous layer in the encoder. Each position in the encoder can attend to all positions in the previous layer, allowing the model to build a deep understanding of the input context.
              </p>
            </div>
          </div>

          {/* Marker B */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-xl flex gap-6">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-red-900/50 border-2 border-red-500 text-red-400 font-bold text-xl shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              B
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">Decoder Self-Attention (Masked)</h2>
              <h3 className="text-lg font-semibold text-white mb-2">Tokens look at the previous tokens.</h3>
              <p className="text-slate-300 leading-relaxed">
                Similar to the encoder, queries, keys, and values come from the same place (the previous decoder layer). However, it is "masked" to prevent leftward information flow. This means a token can only attend to itself and tokens *before* it, preserving the auto-regressive property (it cannot peek into the future words it hasn't generated yet).
              </p>
            </div>
          </div>

          {/* Marker C */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-xl flex gap-6">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-red-900/50 border-2 border-red-500 text-red-400 font-bold text-xl shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              C
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">Decoder-Encoder Attention</h2>
              <h3 className="text-lg font-semibold text-white mb-2">The target token looks at the source context.</h3>
              <p className="text-slate-300 leading-relaxed">
                Also known as Cross-Attention. Here, the Queries come from the previous decoder layer, while the Keys and Values come from the final output of the Encoder stack. This is the crucial bridge that allows every position in the decoder to attend over all positions in the input sequence, using the input context to inform what word to generate next.
              </p>
            </div>
          </div>

          {/* Marker D */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-xl flex gap-6">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-sky-900/50 border-2 border-sky-500 text-sky-400 font-bold text-xl shadow-[0_0_15px_rgba(14,165,233,0.3)]">
              D
            </div>
            <div>
              <h2 className="text-2xl font-bold text-sky-400 mb-2">Feed-Forward Network</h2>
              <h3 className="text-lg font-semibold text-white mb-2">Process the collected information.</h3>
              <p className="text-slate-300 leading-relaxed">
                After the self-attention mechanism pulls in information from other tokens, the Feed-Forward block processes this aggregated representation. It consists of two linear transformations with a ReLU activation in between. It acts independently on each position, essentially "thinking" about what the collected context means.
              </p>
            </div>
          </div>

          {/* Marker E */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-xl flex gap-6">
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-yellow-900/50 border-2 border-yellow-500 text-yellow-400 font-bold text-xl shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              E
            </div>
            <div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">Residual Connections & Layer Normalization</h2>
              <h3 className="text-lg font-semibold text-white mb-2">Preserve the original signal and stabilize training.</h3>
              <p className="text-slate-300 leading-relaxed">
                The dotted yellow lines represent residual (or skip) connections. They take the input of a sub-layer (like Multi-Head Attention) and add it directly to the output of that sub-layer. This prevents the "vanishing gradient" problem in deep networks. The result is then normalized using LayerNorm to keep values stable.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
