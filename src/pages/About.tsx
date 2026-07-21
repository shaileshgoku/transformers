export const About = () => {
  return (
    <div className="w-full h-full flex flex-col p-8 overflow-y-auto text-slate-300">
      <div className="max-w-3xl mx-auto w-full mt-12">
        <h1 className="text-4xl font-light text-white mb-8">
          About <span className="font-semibold text-primary-400">Transformers</span>
        </h1>
        
        <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl shadow-xl space-y-6">
          <p className="text-lg leading-relaxed">
            This interactive visualization was built to demystify the inner workings of the Transformer architecture, the foundational technology behind modern Large Language Models (LLMs) like ChatGPT, Claude, and Gemini.
          </p>
          
          <h2 className="text-2xl font-bold text-white pt-6">The Original Paper</h2>
          <p className="leading-relaxed">
            The Transformer architecture was introduced by researchers at Google Brain and Google Research in the seminal 2017 paper:
            <br />
            <a 
              href="https://arxiv.org/abs/1706.03762" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 underline font-semibold mt-2 inline-block"
            >
              "Attention Is All You Need"
            </a>
          </p>

          <h2 className="text-2xl font-bold text-white pt-6">Technologies Used</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>React (Vite)</strong>: For fast, component-based UI rendering.</li>
            <li><strong>Tailwind CSS (v4)</strong>: For comprehensive, modern utility styling and beautiful design aesthetics.</li>
            <li><strong>Framer Motion</strong>: Powering all the smooth, complex SVG and layout animations throughout the interactive modules.</li>
            <li><strong>Lucide React</strong>: Clean, consistent iconography.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white pt-6">Key Takeaway</h2>
          <div className="bg-primary-900/30 border-l-4 border-primary-500 p-4 rounded text-primary-100">
            AI is not magic. It is highly complex, massively scaled linear algebra and probability, tied together by an elegant architectural design.
          </div>
        </div>
      </div>
    </div>
  );
};
