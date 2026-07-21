import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';

interface ModuleLayoutProps {
  title: string;
  explanation: ReactNode;
  businessInsight: string;
  conceptSummary: ReactNode;
  interactiveArea: ReactNode;
  prevModule?: string;
  nextModule?: string;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onReplay?: () => void;
  speed?: number;
  onSpeedChange?: (speed: number) => void;
}

export const ModuleLayout = ({
  title,
  explanation,
  businessInsight,
  conceptSummary,
  interactiveArea,
  prevModule,
  nextModule,
  isPlaying,
  onPlayPause,
  onReplay,
  speed = 1,
  onSpeedChange
}: ModuleLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full gap-6">
      <header>
        <h1 className="text-3xl font-bold text-white gradient-text">{title}</h1>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Left Panel */}
        <div className="col-span-3 flex flex-col gap-6 overflow-y-auto">
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-4">Explanation</h2>
            <div className="text-slate-300 space-y-4">
              {explanation}
            </div>
          </div>
          
          <div className="card border-primary-500/30 bg-primary-900/10">
            <div className="flex items-center gap-2 mb-2 text-primary-400">
              <Lightbulb className="w-5 h-5" />
              <h3 className="font-bold">Business Insight</h3>
            </div>
            <p className="text-sm text-slate-300">{businessInsight}</p>
          </div>
        </div>

        {/* Center Panel (Interactive) */}
        <div className="col-span-6 card flex flex-col relative overflow-hidden bg-slate-900/50">
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {onSpeedChange && (
              <select 
                className="bg-slate-800 text-sm rounded-lg px-2 py-1 text-slate-300 border border-slate-700 outline-none"
                value={speed}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={2}>2x</option>
              </select>
            )}
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            {interactiveArea}
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-3 flex flex-col gap-6 overflow-y-auto">
          <div className="card h-full">
            <h2 className="text-xl font-bold text-white mb-4">Concept Summary</h2>
            <div className="text-slate-300">
              {conceptSummary}
            </div>
          </div>
        </div>
      </div>

      {/* Controls Footer */}
      <div className="card py-4 px-6 flex items-center justify-between mt-auto">
        <button 
          onClick={() => prevModule && navigate(prevModule)}
          disabled={!prevModule}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <div className="flex items-center gap-4">
          <button onClick={onReplay} className="p-3 rounded-full hover:bg-slate-700 text-slate-300 transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={onPlayPause}
            className="p-4 rounded-full bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/25 transition-all active:scale-95"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
        </div>

        <button 
          onClick={() => nextModule && navigate(nextModule)}
          disabled={!nextModule}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
