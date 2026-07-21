import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LayoutTemplate, 
  FileText, 
  Type, 
  MapPin, 
  Key, 
  Target, 
  Users, 
  PlusSquare, 
  Zap, 
  Layers, 
  Brain, 
  BarChart2, 
  Dices,
  Info 
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/architecture', label: 'Architecture Overview', icon: LayoutTemplate },
  { path: '/tokenization', label: 'Tokenization', icon: FileText },
  { path: '/embedding', label: 'Embedding', icon: Type },
  { path: '/positional-encoding', label: 'Positional Encoding', icon: MapPin },
  { path: '/qkv', label: 'Query / Key / Value', icon: Key },
  { path: '/self-attention', label: 'Self Attention', icon: Target },
  { path: '/multi-head-attention', label: 'Multi Head Attention', icon: Users },
  { path: '/add-norm', label: 'Add & LayerNorm', icon: PlusSquare },
  { path: '/feed-forward', label: 'Feed Forward', icon: Zap },
  { path: '/encoder', label: 'Encoder Stack', icon: Layers },
  { path: '/decoder', label: 'Decoder', icon: Brain },
  { path: '/softmax', label: 'Softmax', icon: BarChart2 },
  { path: '/prediction', label: 'Next Token Prediction', icon: Dices },
  { path: '/about', label: 'About', icon: Info },
];

export const Sidebar = () => {
  return (
    <aside className="w-72 border-r border-slate-700/50 bg-slate-900/50 backdrop-blur-xl flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          Transformer
        </h1>
      </div>
      
      <nav className="flex-1 px-4 pb-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-600/10 text-primary-400 border border-primary-500/20 shadow-inner'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
