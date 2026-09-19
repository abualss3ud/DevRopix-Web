import React from 'react';
import { ServiceItem, Language } from '../types';
import { translations } from '../translations';
import { X, CheckCircle2, ArrowUpRight, Code, Layers } from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem;
  onClose: () => void;
  language: Language;
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  language,
  onSelectServiceForContact,
}) => {
  const t = translations[language];

  // Derive localized strings safely from key
  const serviceKey = service.titleKey as keyof typeof t.services;
  const serviceTranslation = t.services[serviceKey] as {
    title: string;
    desc: string;
    fullDesc: string;
    metric: string;
  } | undefined;

  const title = serviceTranslation?.title || service.id;
  const fullDesc = serviceTranslation?.fullDesc || serviceTranslation?.desc || '';
  const metric = serviceTranslation?.metric || service.metrics;

  return (
    <div
      id="service-details-modal"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#27272a]/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white border border-[#e4e4e7] shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-service-modal-btn"
          onClick={onClose}
          className="absolute top-5 ltr:right-5 rtl:left-5 p-2 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-[#71717a] hover:text-[#27272a] hover:bg-[#e4e4e7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pe-8">
          <div className="w-10 h-10 rounded-xl bg-[#6a5ed9]/10 border border-[#6a5ed9]/20 flex items-center justify-center text-[#6a5ed9] flex-shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="font-eyebrow text-[#6a5ed9] uppercase">
              {t.services.tag}
            </span>
            <h3 id="service-modal-title" className="font-display-h3 text-[#27272a]">
              {title}
            </h3>
          </div>
        </div>

        {/* Metric badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1bb152]/10 border border-[#1bb152]/20 text-xs font-mono text-[#1bb152] font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1bb152]" />
          <span>{metric}</span>
        </div>

        {/* Full Description */}
        <p className="text-sm sm:text-base text-[#71717a] leading-relaxed mb-6">
          {fullDesc}
        </p>

        {/* Deliverables Section */}
        <div className="mb-6">
          <h4 className="font-eyebrow text-[#27272a] mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1bb152]" />
            {t.services.deliverablesTitle}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.deliverables.map((item: string, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-xs text-[#71717a]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#6a5ed9] mt-1.5 flex-shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h4 className="font-eyebrow text-[#27272a] mb-3 flex items-center gap-2">
            <Code className="w-4 h-4 text-[#3f71d4]" />
            {t.services.technologiesTitle}
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech: string, idx: number) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-[#fafafa] border border-[#e4e4e7] text-xs font-mono text-[#27272a]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-[#e4e4e7]">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-[#71717a] hover:text-[#27272a] rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] cursor-pointer"
          >
            {t.services.closeModal}
          </button>
          <button
            onClick={() => {
              onSelectServiceForContact(title);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#6a5ed9] text-xs font-medium text-white hover:bg-[#584dc7] shadow-sm shadow-[#6a5ed9]/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] cursor-pointer"
          >
            <span>{language === 'ar' ? 'طلب هذه الخدمة' : 'Inquire About This Service'}</span>
            <ArrowUpRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
