import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto py-12">
      <div className="glass-panel rounded-3xl p-8 md:p-16 border border-white/10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wider mb-6">
            <Shield className="w-3 h-3" /> Legal Documentation
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400">Last updated: March 10, 2024</p>
        </div>

        <div className="space-y-12 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="w-5 h-5 text-blue-400" /> Data Collection
            </h2>
            <p className="mb-4">
              At Atmosphere AI, we prioritize the privacy of our users. When you use our services, we may collect the following types of information:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>Approximate geolocation data (IP address) to provide local weather.</li>
              <li>Usage data to improve our dashboard performance.</li>
              <li>Device information for responsive design optimization.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lock className="w-5 h-5 text-purple-400" /> Data Usage & Security
            </h2>
            <p>
              We do not sell your personal data to third parties. All weather queries are anonymized before being sent to our upstream providers (Open-Meteo). We employ industry-standard TLS encryption for all data in transit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Cookie Policy</h2>
            <p>
              We use minimal local storage to save your user preferences (such as your last visited city). We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section className="pt-8 border-t border-white/10">
            <p className="text-sm text-slate-500">
              For any privacy-related questions, please contact our Data Protection Officer at privacy@atmosphere.ai.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};