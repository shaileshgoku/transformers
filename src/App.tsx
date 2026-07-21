
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Architecture } from './pages/Architecture';
import { Tokenization } from './pages/Tokenization';
import { Embedding } from './pages/Embedding';
import { PositionalEncoding } from './pages/PositionalEncoding';
import { QKV } from './pages/QKV';
import { SelfAttention } from './pages/SelfAttention';
import { MultiHeadAttention } from './pages/MultiHeadAttention';
import { AddNorm } from './pages/AddNorm';
import { FeedForward } from './pages/FeedForward';
import { Encoder } from './pages/Encoder';
import { Decoder } from './pages/Decoder';
import { Softmax } from './pages/Softmax';
import { Prediction } from './pages/Prediction';
import { About } from './pages/About';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="architecture" element={<Architecture />} />
          <Route path="tokenization" element={<Tokenization />} />
          <Route path="embedding" element={<Embedding />} />
          <Route path="positional-encoding" element={<PositionalEncoding />} />
          <Route path="qkv" element={<QKV />} />
          <Route path="self-attention" element={<SelfAttention />} />
          <Route path="multi-head-attention" element={<MultiHeadAttention />} />
          <Route path="add-norm" element={<AddNorm />} />
          <Route path="feed-forward" element={<FeedForward />} />
          <Route path="encoder" element={<Encoder />} />
          <Route path="decoder" element={<Decoder />} />
          <Route path="softmax" element={<Softmax />} />
          <Route path="prediction" element={<Prediction />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
