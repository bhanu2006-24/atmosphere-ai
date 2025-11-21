import React from 'react';
import { Github, Linkedin, Instagram, Rocket, Code, Terminal } from 'lucide-react';

export const Founder: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="max-w-4xl w-full glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* Profile Side */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="relative mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-32 h-32 bg-slate-900 rounded-full border-2 border-white/20 flex items-center justify-center overflow-hidden">
                {/* Using a high-quality generic avatar or initials since no specific image URL was provided in raw format, 
                    but standard is to use a cool placeholder if user didn't give direct image link other than shield badges */}
                <img src="/founder.png" alt="Bhanu Pratap Saini" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 border-4 border-slate-900 w-6 h-6 rounded-full"></div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">Bhanu Pratap Saini</h2>
            <p className="text-blue-400 font-medium mb-4 flex items-center gap-2">
              <Code className="w-4 h-4" /> Founder & Developer
            </p>

            <p className="text-slate-300 leading-relaxed max-w-md mb-8">
              Building tools to empower the remote work revolution 🚀.
              Passionate about creating premium digital experiences that blend aesthetics with powerful functionality.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/bhanu-saini-3bb251391/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/20 rounded-lg hover:bg-[#0077b5] hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/bhanu2006-24"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-700/30 text-white border border-white/10 rounded-lg hover:bg-slate-800 transition-all duration-300"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://instagram.com/krishna_websites"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#e4405f]/10 text-[#e4405f] border border-[#e4405f]/20 rounded-lg hover:bg-[#e4405f] hover:text-white transition-all duration-300"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </div>
          </div>

          {/* Stats/Visual Side */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                <Terminal className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-white font-semibold mb-1">Full Stack</h3>
                <p className="text-slate-400 text-sm">React, Node, AI Integration</p>
              </div>
              <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                <Rocket className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-1">Visionary</h3>
                <p className="text-slate-400 text-sm">Shipping products fast</p>
              </div>
              <div className="sm:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">Premium Quality</h3>
                  <p className="text-blue-100 text-sm">Standard for every project</p>
                </div>
                <div className="text-3xl">💎</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};