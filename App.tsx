import React, { useState } from 'react';
import { Header } from './components/Header';
import { WeatherDashboard } from './components/WeatherDashboard';
import { Founder } from './components/Founder';
import { LiveMap } from './components/LiveMap';
import { Careers } from './components/Careers';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { CloudLightning, Github, Twitter, Linkedin } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Auto-scroll to top when tab changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <WeatherDashboard />;
      case 'founder':
        return <Founder />;
      case 'map':
        return <LiveMap />;
      case 'careers':
        return <Careers />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfService />;
      default:
        return <WeatherDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-x-hidden flex flex-col">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        {renderContent()}
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-[#0b1120] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
                <div className="bg-blue-600 p-2 rounded-lg">
                  <CloudLightning className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Atmosphere AI</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                The world's most advanced weather telemetry platform. Precision data for modern explorers, built with passion and code.
              </p>
              <div className="flex gap-4 pt-2">
                 <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                 <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                 <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>

            {/* Product Links - Cleaned */}
            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-blue-400 transition-colors">Live Dashboard</button></li>
                <li><button onClick={() => setActiveTab('map')} className="hover:text-blue-400 transition-colors">Global Map</button></li>
                <li><a href="https://open-meteo.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">Data Sources</a></li>
              </ul>
            </div>

            {/* Company/Legal - Expanded */}
            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><button onClick={() => setActiveTab('founder')} className="hover:text-blue-400 transition-colors">About Founder</button></li>
                <li><button onClick={() => setActiveTab('careers')} className="hover:text-blue-400 transition-colors">Careers</button></li>
                <li><button onClick={() => setActiveTab('privacy')} className="hover:text-blue-400 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setActiveTab('terms')} className="hover:text-blue-400 transition-colors">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">
              © 2024 Atmosphere AI Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              Built with <span className="text-red-500">♥</span> by <span className="text-white font-medium">Bhanu Pratap Saini</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;