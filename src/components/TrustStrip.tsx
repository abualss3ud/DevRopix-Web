import React from 'react';
import { Language } from '../types';
import {
  Layers,
  Cpu,
  Database,
  Cloud,
  Lock,
  ShieldCheck,
  Zap,
  Globe2,
  Box,
  Compass,
} from 'lucide-react';

interface TrustStripProps {
  language: Language;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ language }) => {
  const partners = [
    { name: 'NexaScale Tech', icon: Cpu },
    { name: 'CloudFlow Dynamics', icon: Cloud },
    { name: 'Apex Digital Global', icon: Globe2 },
    { name: 'Innovate AI Labs', icon: Zap },
    { name: 'Quantix Data Corp', icon: Database },
    { name: 'CyberShield Systems', icon: Lock },
    { name: 'Horizon Ventures', icon: Layers },
    { name: 'SmartStack Infrastructure', icon: Box },
    { name: 'GovPortal Enterprise', icon: ShieldCheck },
    { name: 'Vanguard Networks', icon: Compass },
  ];

  // Duplicate the list once to ensure a seamless infinite loop
  const marqueeItems = [...partners, ...partners];

  return (
    <section
      id="partners-ticker-section"
      className="relative z-10 w-full bg-white border-y border-[#e4e4e7] py-5 sm:py-6 overflow-hidden select-none"
      aria-label="Our Partners"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          {/* Label Badge: شركاؤنا / Our Partners */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#1bb152] animate-pulse" />
            <h2 className="font-eyebrow text-[#27272a] whitespace-nowrap">
              {language === 'ar' ? 'شركاؤنا' : 'Our Partners'}
            </h2>
            <div className="hidden md:block w-px h-5 bg-[#e4e4e7] mx-2" />
          </div>

          {/* Animated Marquee Container with Left & Right Edge Fades */}
          <div className="relative w-full overflow-hidden">
            {/* Gradient edge masks for smooth fade-in and fade-out */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Scrolling Track */}
            <div className={language === 'ar' ? 'animate-marquee-rtl' : 'animate-marquee-ltr'}>
              {marqueeItems.map((partner, idx) => {
                const Icon = partner.icon;
                return (
                  <div
                    key={`${partner.name}-${idx}`}
                    className="flex items-center gap-2.5 mx-5 sm:mx-8 text-xs sm:text-sm font-medium text-[#71717a] hover:text-[#27272a] transition-colors py-1 cursor-default group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#f4f4f5] border border-[#e4e4e7] text-[#3f71d4] group-hover:border-[#3f71d4]/40 group-hover:bg-[#3f71d4]/5 flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-mono whitespace-nowrap tracking-tight">{partner.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
