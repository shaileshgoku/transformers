import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Architecture = () => {
  const navigate = useNavigate();

  // Reusable block component
  const Block = ({ 
    title, color, y, x, onClick, width = "w-48", id
  }: { 
    title: string, color: string, y: number, x: number, onClick: () => void, width?: string, id?: string
  }) => (
    <div 
      id={id}
      className={`absolute -translate-x-1/2 flex items-center justify-center border-2 border-slate-800 rounded-md px-2 py-2 text-center text-sm font-bold cursor-pointer transition-transform hover:scale-105 shadow-sm text-slate-900 z-20 ${color} ${width}`}
      style={{ top: `${y}px`, left: `${x}px` }}
      onClick={onClick}
    >
      {title}
    </div>
  );

  // Reusable Legend Marker Component
  const LegendMarker = ({ x, y, letter, colorClass }: { x: number, y: number, letter: string, colorClass: string }) => (
    <div 
      className={`absolute flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-lg shadow-lg cursor-pointer hover:scale-110 transition-transform z-30 ${colorClass}`}
      style={{ top: `${y}px`, left: `${x}px`, transform: 'translate(-50%, -50%)' }}
      onClick={() => navigate('/legends')}
    >
      {letter}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center p-8 overflow-y-auto text-slate-200">
      
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-light text-white mb-2">
          The Classic <span className="font-semibold text-primary-400">Transformer</span> Map
        </h1>
        <p className="text-slate-400">Click any component to open its visualization. Click a <strong className="text-white">letter marker</strong> to view the Legends.</p>
      </div>

      <div className="relative w-[1000px] h-[950px] bg-white rounded-2xl shadow-2xl overflow-visible text-slate-800 flex-shrink-0 border-4 border-slate-200">
        
        {/* ================= SVG ARROWS LAYER ================= */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#1e293b" />
            </marker>
            <marker id="arrowhead-yellow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#eab308" />
            </marker>
          </defs>
          
          {/* ENCODER Data Flow (Bottom to Top) */}
          <path d="M 350 810 L 350 780" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 350 740 L 350 630" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 350 590 L 350 570" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 350 530 L 350 490" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 350 450 L 350 430" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 350 390 L 350 370" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          {/* Encoder Residual Connections (Yellow Dashed) */}
          {/* Bypass Multi-Head Attention */}
          <path d="M 350 650 L 220 650 L 220 545 L 246 545" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="6,6" markerEnd="url(#arrowhead-yellow)" strokeLinejoin="round" />
          {/* Bypass Feed Forward */}
          <path d="M 350 490 L 220 490 L 220 405 L 246 405" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="6,6" markerEnd="url(#arrowhead-yellow)" strokeLinejoin="round" />

          {/* Encoder Positional Encoding (+) */}
          <circle cx="350" cy="690" r="10" fill="white" stroke="#1e293b" strokeWidth="2" />
          <text x="350" y="695" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">+</text>
          
          <circle cx="260" cy="690" r="15" fill="white" stroke="#1e293b" strokeWidth="2" />
          <path d="M 252 690 Q 256 680 260 690 T 268 690" fill="none" stroke="#1e293b" strokeWidth="2" />
          <path d="M 275 690 L 332 690" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <text x="190" y="685" fontSize="12" fill="#64748b" textAnchor="middle">Positional</text>
          <text x="190" y="699" fontSize="12" fill="#64748b" textAnchor="middle">Encoding</text>

          {/* DECODER Data Flow (Bottom to Top) */}
          <path d="M 650 810 L 650 780" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 650 740 L 650 640" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 650 600 L 650 580" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 650 540 L 650 490" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 650 450 L 650 430" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 650 390 L 650 340" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 650 300 L 650 280" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 650 240 L 650 200" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 650 160 L 650 130" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <path d="M 650 90 L 650 60" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* Decoder Positional Encoding (+) */}
          <circle cx="650" cy="690" r="10" fill="white" stroke="#1e293b" strokeWidth="2" />
          <text x="650" y="695" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">+</text>
          
          <circle cx="740" cy="690" r="15" fill="white" stroke="#1e293b" strokeWidth="2" />
          <path d="M 732 690 Q 736 680 740 690 T 748 690" fill="none" stroke="#1e293b" strokeWidth="2" />
          <path d="M 725 690 L 668 690" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <text x="810" y="685" fontSize="12" fill="#64748b" textAnchor="middle">Positional</text>
          <text x="810" y="699" fontSize="12" fill="#64748b" textAnchor="middle">Encoding</text>

          {/* Decoder Residual Connections (Yellow Dashed) */}
          <path d="M 650 660 L 780 660 L 780 555 L 754 555" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="6,6" markerEnd="url(#arrowhead-yellow)" strokeLinejoin="round" />
          <path d="M 650 510 L 780 510 L 780 405 L 754 405" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="6,6" markerEnd="url(#arrowhead-yellow)" strokeLinejoin="round" />
          <path d="M 650 360 L 780 360 L 780 255 L 754 255" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="6,6" markerEnd="url(#arrowhead-yellow)" strokeLinejoin="round" />

          {/* CROSS ATTENTION (Encoder to Decoder K, V) */}
          <path d="M 350 390 L 350 330 L 450 330" fill="none" stroke="#1e293b" strokeWidth="2" />
          <path d="M 450 330 C 500 330, 500 460, 546 460" fill="none" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          {/* Animated data pulses on Cross Attention */}
          <motion.circle r="5" fill="#3b82f6"
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: "path('M 350 390 L 350 330 L 450 330 C 500 330, 500 460, 546 460')" }}
          />

          {/* POINTER LINES FROM LEGENDS TO BLOCKS */}
          {/* Marker A to Encoder MHA */}
          <path d="M 175 590 L 254 590" stroke="#15803d" strokeWidth="1.5" strokeDasharray="4,4" markerEnd="url(#arrowhead)" />
          {/* Marker B to Decoder Masked MHA */}
          <path d="M 825 600 L 754 600" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="4,4" markerEnd="url(#arrowhead)" />
          {/* Marker C to Decoder Cross MHA */}
          <path d="M 825 450 L 746 450" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="4,4" markerEnd="url(#arrowhead)" />
          {/* Marker D to Encoder FFN */}
          <path d="M 175 450 L 254 450" stroke="#0369a1" strokeWidth="1.5" strokeDasharray="4,4" markerEnd="url(#arrowhead)" />
          {/* Marker D to Decoder FFN */}
          <path d="M 825 300 L 746 300" stroke="#0369a1" strokeWidth="1.5" strokeDasharray="4,4" markerEnd="url(#arrowhead)" />
          {/* Marker E to Residual Line (Left) */}
          <path d="M 175 545 L 220 545" stroke="#a16207" strokeWidth="1.5" strokeDasharray="4,4" markerEnd="url(#arrowhead)" />
          {/* Marker E to Residual Line (Right) */}
          <path d="M 825 555 L 780 555" stroke="#a16207" strokeWidth="1.5" strokeDasharray="4,4" markerEnd="url(#arrowhead)" />

          {/* Nx Box Outlines */}
          {/* Encoder Nx */}
          <rect x="235" y="375" width="230" height="260" rx="15" fill="none" stroke="#64748b" strokeWidth="3" />
          <text x="215" y="520" fontSize="16" fontWeight="bold" fill="#64748b">Nx</text>
          
          {/* Decoder Nx */}
          <rect x="535" y="225" width="230" height="420" rx="15" fill="none" stroke="#64748b" strokeWidth="3" />
          <text x="780" y="440" fontSize="16" fontWeight="bold" fill="#64748b">Nx</text>

        </svg>

        {/* ================= HTML BLOCKS (Center) ================= */}
        <div className="absolute left-[350px] top-[830px] -translate-x-1/2 text-center text-sm font-bold w-48">Inputs</div>
        
        <Block id="enc-embed" title="Input Embedding" color="bg-pink-200" y={740} x={350} onClick={() => navigate('/embedding')} />
        <Block id="enc-mha" title="Multi-Head Attention" color="bg-orange-200" y={590} x={350} onClick={() => navigate('/self-attention')} />
        <Block id="enc-add1" title="Add & Norm" color="bg-yellow-200" y={530} x={350} onClick={() => navigate('/add-norm')} />
        <Block id="enc-ffn" title="Feed Forward" color="bg-sky-200" y={450} x={350} onClick={() => navigate('/feed-forward')} />
        <Block id="enc-add2" title="Add & Norm" color="bg-yellow-200" y={390} x={350} onClick={() => navigate('/add-norm')} />

        <div className="absolute left-[650px] top-[830px] -translate-x-1/2 text-center text-sm font-bold w-48 leading-tight">
          Outputs<br/>(shifted right)
        </div>

        <Block id="dec-embed" title="Output Embedding" color="bg-pink-200" y={740} x={650} onClick={() => navigate('/embedding')} />
        
        <Block id="dec-mmha" title="Masked Multi-Head Attention" color="bg-orange-200" y={600} x={650} onClick={() => navigate('/decoder')} width="w-52" />
        <Block id="dec-add1" title="Add & Norm" color="bg-yellow-200" y={540} x={650} onClick={() => navigate('/add-norm')} />
        
        <Block id="dec-mha" title="Multi-Head Attention" color="bg-orange-200" y={450} x={650} onClick={() => navigate('/decoder')} />
        <Block id="dec-add2" title="Add & Norm" color="bg-yellow-200" y={390} x={650} onClick={() => navigate('/add-norm')} />
        
        <Block id="dec-ffn" title="Feed Forward" color="bg-sky-200" y={300} x={650} onClick={() => navigate('/feed-forward')} />
        <Block id="dec-add3" title="Add & Norm" color="bg-yellow-200" y={240} x={650} onClick={() => navigate('/add-norm')} />
        
        <Block id="dec-linear" title="Linear" color="bg-purple-200" y={160} x={650} onClick={() => navigate('/softmax')} />
        <Block id="dec-softmax" title="Softmax" color="bg-green-200" y={90} x={650} onClick={() => navigate('/softmax')} />

        <div className="absolute left-[650px] top-[20px] -translate-x-1/2 text-center text-sm font-bold w-48 leading-tight">
          Output<br/>Probabilities
        </div>

        {/* ================= LEGEND MARKERS ================= */}
        {/* Marker A: Encoder Self Attention */}
        <LegendMarker x={160} y={590} letter="A" colorClass="bg-green-100 text-green-700 border-green-500" />
        
        {/* Marker B: Decoder Masked Self Attention */}
        <LegendMarker x={840} y={600} letter="B" colorClass="bg-red-100 text-red-700 border-red-500" />
        
        {/* Marker C: Decoder Cross Attention */}
        <LegendMarker x={840} y={450} letter="C" colorClass="bg-red-100 text-red-700 border-red-500" />
        
        {/* Marker D: Feed Forward (Encoder) */}
        <LegendMarker x={160} y={450} letter="D" colorClass="bg-sky-100 text-sky-700 border-sky-500" />
        
        {/* Marker D: Feed Forward (Decoder) */}
        <LegendMarker x={840} y={300} letter="D" colorClass="bg-sky-100 text-sky-700 border-sky-500" />
        
        {/* Marker E: Residual Connections */}
        <LegendMarker x={160} y={545} letter="E" colorClass="bg-yellow-100 text-yellow-700 border-yellow-500" />
        <LegendMarker x={840} y={555} letter="E" colorClass="bg-yellow-100 text-yellow-700 border-yellow-500" />

      </div>
    </div>
  );
};
