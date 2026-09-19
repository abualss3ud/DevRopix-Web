import React from 'react';
import { Language, PageId, ServiceItem } from '../types';
import { translations } from '../translations';
import { servicesData } from '../data';
import { CTASection } from '../components/CTASection';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Globe,
  Smartphone,
  Layers,
  Cpu,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Code,
  ArrowUpRight,
  Shield,
  Clock,
  FileCheck,
} from 'lucide-react';

interface ServicesPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
  onSelectServiceForContact: (serviceTitle: string) => void;
  onOpenServiceModal: (service: ServiceItem) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  language,
  onNavigate,
  onSelectServiceForContact,
  onOpenServiceModal,
}) => {
  const t = translations[language];

  const renderServiceIcon = (name: string) => {
    switch (name) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#3f71d4]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#6a5ed9]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#db5434]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#ffb929]" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-[#1bb152]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#3f71d4]" />;
      default:
        return <Globe className="w-6 h-6 text-[#6a5ed9]" />;
    }
  };

  const engagementModels = [
    {
      title: language === 'ar' ? 'فريق هندسي مخصص' : 'Dedicated Engineering Team',
      desc:
        language === 'ar'
          ? 'مهندسون متفرغون يعملون كامتداد مباشر لفريقك الداخلي بنظام الرشاقة وسرعة التسليم.'
          : 'Full-time senior engineers embedded as an extension of your product organization.',
      idealFor: language === 'ar' ? 'الشركات سريعة النمو والمنتجات طويلة الأمد' : 'High-growth scaleups & evolving products',
      accentColor: '#6a5ed9',
    },
    {
      title: language === 'ar' ? 'مشاريع محددة النطاق' : 'Fixed-Scope Delivery',
      desc:
        language === 'ar'
          ? 'تسليم متكامل وفق متطلبات وجدول زمني وميزانية محددة بوضوح تضمن راحة البال.'
          : 'Milestone-based delivery with clear deliverables, fixed timelines, and budget certainty.',
      idealFor: language === 'ar' ? 'النماذج الأولية (MVPs) والمواقع والمنصات الجديدة' : 'MVPs, website rebuilds & defined platforms',
      accentColor: '#3f71d4',
    },
    {
      title: language === 'ar' ? 'صيانة واستشارات تقنية' : 'Engineering Retainer & SLA',
      desc:
        language === 'ar'
          ? 'دعم فني استباقي ومراقبة أمنية على مدار الساعة وتحسين مستمر لأداء المنظومة.'
          : 'Continuous security audits, performance tuning, and 24/7 uptime monitoring.',
      idealFor: language === 'ar' ? 'الأنظمة الحية التي تتطلب موثوقية تشغيلية قصوى' : 'Mission-critical live production systems',
      accentColor: '#1bb152',
    },
  ];

  return (
    <div id="services-page" className="w-full pt-28 pb-20">
      {/* Services Header */}
      <ScrollReveal direction="up">
        <section className="relative py-20 bg-white border-b border-[#e4e4e7] overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-30 mask-radial pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#6a5ed9]/25 bg-[#6a5ed9]/8 font-eyebrow text-xs text-[#6a5ed9] font-semibold tracking-wider">
              <span>{t.services.tag}</span>
            </div>
            <h1 className="font-display-hero text-[#27272a] text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {language === 'ar' ? (
                <>
                  كل ما تحتاجه{' '}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#6a5ed9] to-[#3f71d4] px-1">
                    للبناء والنمو
                    <span className="absolute bottom-2 left-0 right-0 h-2 bg-[#6a5ed9]/10 rounded-full -z-10" />
                  </span>
                </>
              ) : (
                <>
                  Everything You Need to{' '}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#6a5ed9] to-[#3f71d4] px-1">
                    Build & Grow
                    <span className="absolute bottom-2 left-0 right-0 h-2 bg-[#6a5ed9]/10 rounded-full -z-10" />
                  </span>
                </>
              )}
            </h1>
            <p className={`text-base sm:text-lg text-[#71717a] leading-relaxed max-w-[62ch] ${
              language === 'ar' 
                ? 'border-r-2 border-[#6a5ed9]/30 pr-4' 
                : 'border-l-2 border-[#6a5ed9]/30 pl-4'
            }`}>
              {t.services.subtitle}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Detailed Services Breakdown */}
      <ScrollReveal direction="up" delay={0.05}>
        <section className="py-20 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {servicesData.map((service, index) => {
              const serviceText = (t.services[service.titleKey as keyof typeof t.services] || {
                title: service.id,
                desc: '',
                fullDesc: '',
                metric: service.metrics || '',
              }) as {
                title: string;
                desc: string;
                fullDesc: string;
                metric: string;
              };

              return (
                <div
                  key={service.id}
                  id={`service-detail-${service.id}`}
                  className="rounded-2xl border border-[#e4e4e7] bg-white p-8 sm:p-10 shadow-xs hover:shadow-md transition-shadow text-start"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column (7 cols): Narrative & Deliverables */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] flex items-center justify-center flex-shrink-0">
                          {renderServiceIcon(service.iconName || 'Globe')}
                        </div>
                        <div>
                          <span className="text-xs font-mono text-[#6a5ed9] font-medium">
                            {language === 'ar' ? `الخدمة 0${index + 1}` : `Service 0${index + 1}`}
                          </span>
                          <h2 className="font-display-h3 text-[#27272a]">
                            {serviceText.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-[#71717a] leading-relaxed max-w-[65ch]">
                        {serviceText.fullDesc}
                      </p>

                      {/* Deliverables List */}
                      <div className="space-y-3 pt-2">
                        <h3 className="font-eyebrow text-[#27272a] flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#1bb152]" />
                          {t.services.deliverablesTitle}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {((language === 'ar' ? (service.deliverables_ar || service.deliverables) : (service.deliverables_en || service.deliverables)) || []).map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 p-3 rounded-lg bg-[#fafafa] border border-[#e4e4e7] text-xs text-[#71717a]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6a5ed9] mt-1.5 flex-shrink-0" />
                              <span className="leading-snug text-[#27272a] font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column (5 cols): Tech, Metric, and Direct Inquiry */}
                    <div className="lg:col-span-5 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] p-6 space-y-6">
                      <div>
                        <span className="text-[11px] font-mono text-[#71717a] uppercase">
                          {language === 'ar' ? 'معيار الجودة والأداء القياسي' : 'Standard Benchmark'}
                        </span>
                        <div className="text-base font-bold text-[#1bb152] mt-1 font-mono">
                          {language === 'ar' ? (service.metrics_ar || serviceText.metric) : (service.metrics_en || serviceText.metric)}
                        </div>
                      </div>

                      <div>
                        <span className="font-eyebrow text-[#27272a] block mb-2.5">
                          {t.services.technologiesTitle}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(service.techStack || []).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded bg-white border border-[#e4e4e7] text-xs font-mono text-[#27272a] shadow-2xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#e4e4e7] flex flex-col gap-2.5">
                        <button
                          id={`request-service-${service.id}-btn`}
                          onClick={() => {
                            onSelectServiceForContact(serviceText.title);
                            onNavigate('contact');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#6a5ed9] text-xs font-medium text-white hover:bg-[#584dc7] shadow-sm shadow-[#6a5ed9]/25 transition-colors"
                        >
                          <span>{language === 'ar' ? 'طلب عرض سعر لهذه الخدمة' : 'Inquire for This Service'}</span>
                          <ArrowUpRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
                        </button>

                        <button
                          onClick={() => onOpenServiceModal(service)}
                          className="w-full py-2 text-xs font-medium text-[#71717a] hover:text-[#27272a] transition-colors"
                        >
                          {t.services.learnMore}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Engagement Models Section */}
      <ScrollReveal direction="up">
        <section className="relative py-20 bg-white border-t border-[#e4e4e7] overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-25 mask-radial pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3 sm:space-y-4">
              <span className="font-eyebrow text-[#3f71d4] uppercase">
                {language === 'ar' ? 'نماذج التعاقد' : 'Partnership Framework'}
              </span>
              <h2 className="font-display-h2 text-[#27272a]">
                {language === 'ar' ? 'كيف نعمل مع شركائنا' : 'Flexible Engagement Models'}
              </h2>
              <p className="text-base text-[#71717a] max-w-[65ch] mx-auto">
                {language === 'ar'
                  ? 'نوفر خيارات تعاون مرنة تتكيف مع مرحلة نمو شركتك ومتطلبات ميزانيتك.'
                  : 'Choose the collaboration model that best aligns with your team structure and project timeline.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {engagementModels.map((model, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#e4e4e7] bg-[#fafafa] p-6 text-start space-y-4 flex flex-col justify-between hover:border-[#6a5ed9]/40 hover:bg-white hover:shadow-xs transition-all"
                >
                  <div className="space-y-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#e4e4e7] text-[#6a5ed9] font-mono text-xs font-bold flex items-center justify-center shadow-2xs">
                      0{idx + 1}
                    </div>
                    <h3 className="font-card-title text-[#27272a]">{model.title}</h3>
                    <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">{model.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-[#e4e4e7]">
                    <span className="text-[10px] uppercase font-mono text-[#6a5ed9] block mb-1">
                      {language === 'ar' ? 'الخيار الأنسب لـ' : 'Ideal For'}
                    </span>
                    <p className="text-xs text-[#27272a] font-medium">{model.idealFor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Quality Guarantees Strip */}
      <ScrollReveal direction="up" delay={0.05}>
        <section className="py-14 bg-[#fafafa] border-y border-[#e4e4e7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-start">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#6a5ed9] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-[#27272a]">
                    {language === 'ar' ? 'ملكية فكرية كاملة (100% IP)' : '100% Client IP Ownership'}
                  </h4>
                  <p className="text-xs text-[#71717a] mt-1 leading-relaxed">
                    {language === 'ar'
                      ? 'كافة الشيفرات البرمجية والأصول والتصاميم ملكية حصرية لك منذ اليوم الأول.'
                      : 'All code, architecture assets, and designs belong exclusively to your organization.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#3f71d4] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-[#27272a]">
                    {language === 'ar' ? 'تسليم أسبوعي تفاعلي' : 'Weekly Shippable Increments'}
                  </h4>
                  <p className="text-xs text-[#71717a] mt-1 leading-relaxed">
                    {language === 'ar'
                      ? 'نستعرض مخرجات حقيقية تعمل كل أسبوع دون مفاجآت في نهاية المشروع.'
                      : 'Transparent weekly demos and working staging builds with no surprises.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-[#1bb152] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-[#27272a]">
                    {language === 'ar' ? 'معايير أمان معتمدة' : 'Strict Code Audits & QA'}
                  </h4>
                  <p className="text-xs text-[#71717a] mt-1 leading-relaxed">
                    {language === 'ar'
                      ? 'فحص أمني دقيق ومراجعات الشيفرة المزدوجة وتغطية اختبارات شاملة.'
                      : 'Automated CI/CD security scanning, peer reviews, and performance testing.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Conclusion CTA */}
      <ScrollReveal direction="up" delay={0.1}>
        <CTASection language={language} onNavigate={onNavigate} />
      </ScrollReveal>
    </div>
  );
};
