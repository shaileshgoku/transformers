
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 overflow-y-auto relative">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-6 left-6 p-2 bg-slate-800 border border-slate-700 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 z-50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="container mx-auto p-8 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
