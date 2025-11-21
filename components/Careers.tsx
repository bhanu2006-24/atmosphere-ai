import React from 'react';
import { ArrowRight, Code, Globe, Zap, Heart, Coffee } from 'lucide-react';

export const Careers: React.FC = () => {
  const benefits = [
    { icon: Globe, title: "Remote First", desc: "Work from anywhere in the world. We trust our team." },
    { icon: Zap, title: "High Performance", desc: "Work with the latest tech stack and smartest minds." },
    { icon: Heart, title: "Comprehensive Health", desc: "Full medical, dental, and vision coverage for you." },
    { icon: Coffee, title: "Learning Budget", desc: "$2k annual stipend for courses and conferences." },
  ];

  const positions = [
    { title: "Senior Frontend Engineer", dept: "Engineering", loc: "Remote", type: "Full-time" },
    { title: "Meteorological Data Scientist", dept: "Data", loc: "London / Remote", type: "Full-time" },
    { title: "Product Designer", dept: "Design", loc: "Remote", type: "Contract" },
  ];

  return (
    <div className="animate-fade-in space-y-12 max-w-5xl mx-auto">
      {/* Hero */}
      <div className="text-center py-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Build the future of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Weather Intelligence</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Join a world-class team of engineers and scientists building the operating system for the atmosphere.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors">
            <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-400">
              <b.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
            <p className="text-sm text-slate-400">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Open Positions */}
      <div className="pt-12">
        <h2 className="text-3xl font-bold text-white mb-8">Open Positions</h2>
        <div className="flex flex-col gap-4">
          {positions.map((p, i) => (
            <div key={i} className="group glass-panel p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{p.title}</h3>
                <div className="flex gap-3 mt-2 text-sm text-slate-400">
                  <span className="px-2 py-1 rounded-md bg-white/5">{p.dept}</span>
                  <span className="px-2 py-1 rounded-md bg-white/5">{p.loc}</span>
                  <span className="px-2 py-1 rounded-md bg-white/5">{p.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 group-hover:translate-x-2 transition-transform">
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center pt-12 pb-20">
        <p className="text-slate-500">Don't see your role? <span className="text-blue-400 cursor-pointer hover:underline">Email us</span> your resume.</p>
      </div>
    </div>
  );
};