# Transformer Architecture Visualizer 🧠

An interactive, educational Chrome Extension designed to demystify the inner workings of the Transformer architecture, the foundational technology behind modern Large Language Models (LLMs) like ChatGPT, Claude, and Gemini.

## Features

- **End-to-End Pipeline Visualization:** Step-by-step interactive modules covering everything from Tokenization to Next Token Prediction.
- **Deep Dives:**
  - Input & Output Embeddings
  - Positional Encoding
  - Query, Key, Value (QKV) Generation
  - Masked and Cross Self-Attention
  - Add & LayerNorm (Residual Connections)
  - Feed Forward Networks
  - Softmax and Auto-regressive Generation
- **Complete Architecture Map:** A unified diagram that routes the flow of data (including explicit Q, K, V routing) between the Encoder and Decoder blocks.

## Technologies Used

- **React (Vite)**
- **Tailwind CSS (v4)**
- **Framer Motion** (for smooth SVG and component animations)
- **Lucide React** (for icons)

## How to Install the Chrome Extension

Because this is a locally built developer extension, you need to load it manually into Chrome:

1. Download or clone this repository to your local machine.
2. If you want to make changes or rebuild, run `npm install` followed by `npm run build`. This generates a `dist/` folder.
3. Open Google Chrome and navigate to `chrome://extensions/`.
4. Enable **"Developer mode"** by clicking the toggle in the top right corner.
5. Click the **"Load unpacked"** button in the top left.
6. Select the **`dist/`** directory located inside this project folder.
7. The extension is now installed! 

**To use it:** Click the puzzle piece extension icon in your Chrome toolbar and click "Transformer Visualizer". It will open a beautiful, full-screen interactive tab.

## Credits

Based on the original 2017 paper: ["Attention Is All You Need"](https://arxiv.org/abs/1706.03762) by Vaswani et al.
