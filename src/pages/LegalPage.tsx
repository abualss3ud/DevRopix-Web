import React from 'react';
import { Language, PageId } from '../types';
import { translations } from '../translations';
import { ShieldCheck, ArrowLeft, FileText } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  language: Language;
  onNavigate: (page: PageId) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, language, onNavigate }) => {
  const t = translations[language];
  const isPrivacy = type === 'privacy';

  return (
    <div id="legal-page" className="w-full pt-28 pb-20">
      <section className="relative py-20 bg-white border-b border-[#e4e4e7] overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-30 mask-radial pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-4">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#6a5ed9] hover:text-[#3f71d4] transition-colors cursor-pointer"
          >
            <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
            <span>{t.legal.backHome}</span>
          </button>

          <div className="flex items-center gap-2.5">
            {isPrivacy ? (
              <ShieldCheck className="w-6 h-6 text-[#1bb152]" />
            ) : (
              <FileText className="w-6 h-6 text-[#6a5ed9]" />
            )}
            <h1 className="font-display-hero text-[#27272a]">
              {isPrivacy ? t.legal.privacyTitle : t.legal.termsTitle}
            </h1>
          </div>
          <p className="text-xs text-[#71717a] font-mono">{t.legal.lastUpdated}</p>
        </div>
      </section>

      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-8 text-sm text-[#71717a] leading-relaxed">
          {isPrivacy ? (
            <>
              <div className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-2xs space-y-3">
                <h2 className="font-card-title text-[#27272a]">1. Information We Collect</h2>
                <p>
                  DevRopix collects information you provide directly through our project inquiry
                  forms, consultation sessions, and direct email communications. This includes your
                  name, contact email, company organization, project requirements, and estimated
                  budget parameters.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-2xs space-y-3">
                <h2 className="font-card-title text-[#27272a]">2. How We Protect Your IP</h2>
                <p>
                  We treat all client specifications, proprietary workflows, and project ideas as
                  strictly confidential under mutual non-disclosure agreements (NDAs). We never
                  share or license your trade secrets or proprietary code with external entities.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-2xs space-y-3">
                <h2 className="font-card-title text-[#27272a]">3. Data Security & Storage</h2>
                <p>
                  All project communication and repository artifacts are stored in encrypted
                  environments meeting industry security standards. Access to project scopes is
                  limited strictly to the senior engineers and design leads assigned to your
                  engagement.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-2xs space-y-3">
                <h2 className="font-card-title text-[#27272a]">1. Scope of Engagement</h2>
                <p>
                  DevRopix delivers professional software engineering, UI/UX design, and digital
                  product consulting. Specific deliverable milestones, acceptance criteria, and
                  payment schedules are outlined in our binding Statement of Work (SOW).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-2xs space-y-3">
                <h2 className="font-card-title text-[#27272a]">2. Intellectual Property Rights</h2>
                <p>
                  Upon settlement of invoices as outlined in the client agreement, full ownership of
                  custom developed application source code, designs, and assets transfers
                  exclusively to the client. DevRopix retains no claim over your proprietary
                  business logic.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-2xs space-y-3">
                <h2 className="font-card-title text-[#27272a]">3. Warranties & SLA</h2>
                <p>
                  We provide post-deployment bug fix warranties and performance monitoring as
                  specified in each client engagement tier, ensuring your platform operates
                  reliably and smoothly.
                </p>
              </div>
            </>
          )}

          <div className="pt-8 border-t border-[#e4e4e7]">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 rounded-xl bg-[#6a5ed9] text-xs font-medium text-white hover:bg-[#584dc7] shadow-sm shadow-[#6a5ed9]/25 transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'تواصل مع فريقنا القانوني أو الإداري' : 'Contact DevRopix Team'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
