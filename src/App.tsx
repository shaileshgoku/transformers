import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

// Placeholder components for future phases
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full">
    <h2 className="text-3xl text-slate-400 font-light">{title} - Coming Soon</h2>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="architecture" element={<Placeholder title="Architecture Overview" />} />
          <Route path="tokenization" element={<Placeholder title="Tokenization" />} />
          <Route path="embedding" element={<Placeholder title="Embedding" />} />
          <Route path="positional-encoding" element={<Placeholder title="Positional Encoding" />} />
          <Route path="qkv" element={<Placeholder title="Query / Key / Value" />} />
          <Route path="self-attention" element={<Placeholder title="Self Attention" />} />
          <Route path="multi-head-attention" element={<Placeholder title="Multi Head Attention" />} />
          <Route path="add-norm" element={<Placeholder title="Add & LayerNorm" />} />
          <Route path="feed-forward" element={<Placeholder title="Feed Forward" />} />
          <Route path="encoder" element={<Placeholder title="Encoder Stack" />} />
          <Route path="decoder" element={<Placeholder title="Decoder" />} />
          <Route path="softmax" element={<Placeholder title="Softmax" />} />
          <Route path="prediction" element={<Placeholder title="Next Token Prediction" />} />
          <Route path="about" element={<Placeholder title="About" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
