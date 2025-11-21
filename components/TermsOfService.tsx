import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-12">
      <div className="glass-panel rounded-3xl p-8 md:p-16 border border-white/10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium uppercase tracking-wider mb-6">
            <FileText className="w-3 h-3" /> Terms of Use
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-400">Last updated: March 10, 2024</p>
        </div>

        <div className="space-y-8 text-slate-300">
          <section>
            <h3 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h3>
            <p>
              By accessing and using Atmosphere AI, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2">2. Use License</h3>
            <p className="mb-4">
              Permission is granted to temporarily view the materials (information or software) on Atmosphere AI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" /> Modify or copy the materials</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" /> Use the materials for any commercial purpose</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" /> Attempt to decompile or reverse engineer any software</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2">3. Disclaimer</h3>
            <p>
              The materials on Atmosphere AI's website are provided on an 'as is' basis. Atmosphere AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-2">4. Limitations</h3>
            <p>
              In no event shall Atmosphere AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Atmosphere AI's website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};