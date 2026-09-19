import React from 'react';
import { Language, PageId } from '../types';
import { translations } from '../translations';
import { ArrowUpRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

interface CTASectionProps {
  language: Language;
  onNavigate: (page: PageId) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ language, onNavigate }) => {
  const t = translations[language];

  return (
    <section
      id="global-cta-section"
      className="relative py-20 sm:py-24 bg-[#fafafa] border-t border-[#e4e4e7] overflow-hidden"
    >
      <div className="absolute inset-0 bg-tech-grid opacity-30 mask-radial pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#e4e4e7] bg-white p-8 sm:p-12 lg:p-16 shadow-lg shadow-black/[0.03] text-center relative overflow-hidden">
          {/* Top indicator eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1bb152]/20 bg-[#1bb152]/10 font-eyebrow text-[#1bb152] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#1bb152] animate-pulse" />
            <span>{language === 'ar' ? 'متاح للمشاريع الجديدة في الربع الحالي' : 'Available for New Engagements'}</span>
          </div>

          <h2 className="font-display-h2 text-[#27272a] mb-4 max-w-3xl mx-auto">
            {t.cta.title}
          </h2>

          <p className="text-base sm:text-lg text-[#71717a] max-w-[65ch] mx-auto mb-8 leading-relaxed">
            {t.cta.subtitle}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
            <button
              id="cta-section-primary-btn"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#6a5ed9] text-white text-sm font-medium hover:bg-[#584dc7] shadow-sm shadow-[#6a5ed9]/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{t.cta.btnPrimary}</span>
              <ArrowUpRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
            </button>

            <button
              id="cta-section-secondary-btn"
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-[#e4e4e7] bg-white text-[#27272a] text-sm font-medium hover:bg-[#f4f4f5] transition-colors cursor-pointer"
            >
              <span>{t.cta.btnSecondary}</span>
            </button>
          </div>

          {/* Value props bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[#e4e4e7] text-start sm:text-center">
            <div className="flex items-center sm:justify-center gap-2 text-xs font-medium text-[#27272a]">
              <Clock className="w-4 h-4 text-[#6a5ed9] flex-shrink-0" />
              <span>{language === 'ar' ? 'استجابة هندسية خلال 24 ساعة' : '24h Technical Scoping'}</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2 text-xs font-medium text-[#27272a]">
              <ShieldCheck className="w-4 h-4 text-[#1bb152] flex-shrink-0" />
              <span>{language === 'ar' ? 'اتفاقية سرية وحماية ملكية (NDA)' : 'Strict NDA & IP Protection'}</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2 text-xs font-medium text-[#27272a]">
              <CheckCircle2 className="w-4 h-4 text-[#3f71d4] flex-shrink-0" />
              <span>{language === 'ar' ? 'معايير جودة وأمان مؤسسية' : 'Enterprise SLAs & Quality'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
