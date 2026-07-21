import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowDown,
  MessageSquare,
  FileText, 
  Type, 
  MapPin, 
  Layers, 
  Brain, 
  BarChart2, 
  Dices
} from 'lucide-react';

const pipeline = [
  { id: 'input', label: 'Input Text', icon: MessageSquare, path: null, description: 'Raw text data enters the model.' },
  { id: 'tokenization', label: 'Tokenization', icon: FileText, path: '/tokenization', description: 'Text is split into smaller pieces (tokens).' },
  { id: 'embedding', label: 'Embedding', icon: Type, path: '/embedding', description: 'Tokens are converted into numerical vectors.' },
  { id: 'positional-encoding', label: 'Positional Encoding', icon: MapPin, path: '/positional-encoding', description: 'Order of words is added to the vectors.' },
  { id: 'encoder', label: 'Encoder', icon: Layers, path: '/encoder', description: 'Understands the context of the input text.' },
  { id: 'decoder', label: 'Decoder', icon: Brain, path: '/decoder', description: 'Generates the output based on context.' },
  { id: 'softmax', label: 'Softmax', icon: BarChart2, path: '/softmax', description: 'Turns scores into probabilities.' },
  { id: 'prediction', label: 'Prediction', icon: Dices, path: '/prediction', description: 'The next token is selected.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Architecture = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Architecture Overview</h1>
        <p className="text-slate-400 text-lg">Follow the data as it flows through the Transformer pipeline.</p>
      </div>

      <motion.div 
        className="flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {pipeline.map((block, index) => (
          <div key={block.id} className="flex flex-col items-center w-full">
            <motion.div 
              variants={itemVariants}
              onClick={() => block.path && navigate(block.path)}
              className={`w-full max-w-md card flex items-center gap-6 p-6 transition-all duration-300 ${
                block.path 
                  ? 'cursor-pointer hover:scale-105 hover:bg-surface hover:shadow-primary-500/20 hover:border-primary-500/50' 
                  : 'bg-slate-800/30'
              }`}
            >
              <div className={`p-4 rounded-xl ${block.path ? 'bg-primary-500/20 text-primary-400' : 'bg-slate-700/50 text-slate-400'}`}>
                <block.icon className="w-8 h-8" />
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-slate-100 mb-1">{block.label}</h3>
                <p className="text-sm text-slate-400">{block.description}</p>
              </div>
            </motion.div>

            {index < pipeline.length - 1 && (
              <motion.div 
                variants={itemVariants}
                className="py-4 text-slate-600"
              >
                <ArrowDown className="w-6 h-6 animate-pulse" />
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
