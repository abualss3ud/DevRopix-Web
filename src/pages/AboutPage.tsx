import React from 'react';
import { Language, PageId } from '../types';
import { translations } from '../translations';
import { technologiesData } from '../data';
import { CTASection } from '../components/CTASection';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Code,
  Shield,
  Target,
  Users,
  Award,
  Zap,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

interface AboutPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ language, onNavigate }) => {
  const t = translations[language];

  const values = [
    {
      icon: Target,
      title: language === 'ar' ? 'الأثر التجاري قبل الأسطر البرمجية' : 'Commercial Impact First',
      desc:
        language === 'ar'
          ? 'نحن لا نكتب برمجيات معقدة لمجرد الاستعراض؛ كل قرار تقني نبنيه يهدف لتقليل التكاليف التشغيلية ومضاعفة نمو أعمالك.'
          : 'We never write complex code just for vanity. Every architectural decision is engineered to reduce operational friction and drive revenue.',
      accent: '#6a5ed9',
    },
    {
      icon: Code,
      title: language === 'ar' ? 'هندسة معيارية خالية من الديون' : 'Zero-Debt Engineering',
      desc:
        language === 'ar'
          ? 'نلتزم بكتابة شيفرات برمجية نظيفة وموثقة وفق المعايير المؤسسية لتظل منظومتك سهلة الصيانة والتوسع لعشرات السنين.'
          : 'Strict typing, modular separation of concerns, and automated tests ensure your platform remains maintainable for years to come.',
      accent: '#3f71d4',
    },
    {
      icon: Users,
      title: language === 'ar' ? 'شراكة تقنية متكاملة' : 'True Partnership, Not Outsourcing',
      desc:
        language === 'ar'
          ? 'نعمل كجزء لا يتجزأ من قيادة منتجك؛ نقدم النصح الصادق، نحدد المخاطر الاستباقية، ونتحمل مسؤولية الجودة حتى النهاية.'
          : 'We act as an embedded technical co-founder: challenging assumptions, mitigating technical risks, and taking radical ownership of delivery.',
      accent: '#1bb152',
    },
    {
      icon: Zap,
      title: language === 'ar' ? 'سرعة الإنجاز والشفافية' : 'Relentless Momentum',
      desc:
        language === 'ar'
          ? 'إطلاقات مرحلية أسبوعية، وتواصل متواصل دون غموض، مع رؤية كاملة على مراحل سير العمل.'
          : 'Weekly shippable milestones, direct Slack/async channels, and complete transparency into our daily sprint momentum.',
      accent: '#db5434',
    },
  ];

  return (
    <div id="about-page" className="w-full pt-28 pb-20">
      {/* Header */}
      <ScrollReveal direction="up">
        <section className="relative py-20 bg-white border-b border-[#e4e4e7] overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-30 mask-radial pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1bb152]/20 bg-[#1bb152]/10 font-eyebrow text-[#1bb152]">
              <span>{t.about.tag}</span>
            </div>
            <h1 className="font-display-hero text-[#27272a] max-w-4xl">
              {t.about.title}
            </h1>
            <p className="text-base sm:text-lg text-[#71717a] max-w-3xl leading-relaxed">
              {t.about.p1}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Main Editorial Story */}
      <ScrollReveal direction="up" delay={0.05}>
        <section className="py-20 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Story text (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-start">
                <span className="font-eyebrow text-[#6a5ed9] uppercase">
                  {language === 'ar' ? 'قصتنا وفلسفتنا' : 'Our Narrative & Philosophy'}
                </span>
                <h2 className="font-display-h2 text-[#27272a]">
                  {language === 'ar'
                    ? 'بناء البرمجيات ليس مجرد وظيفة، بل هو فن حل معضلات الأعمال الحقيقية.'
                    : 'Software engineering should solve real business friction, not invent it.'}
                </h2>

                <p className="text-sm sm:text-base text-[#71717a] leading-relaxed">
                  {t.about.p2}
                </p>

                <p className="text-sm sm:text-base text-[#71717a] leading-relaxed">
                  {t.about.p3}
                </p>

                <div className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-xs space-y-3">
                  <div className="font-eyebrow text-[#6a5ed9]">
                    {language === 'ar' ? 'بيان المبادئ التقنية' : 'The DevRopix Technical Charter'}
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#27272a]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1bb152] mt-0.5 flex-shrink-0" />
                      <span className="text-[#71717a]">
                        {language === 'ar'
                          ? 'نرفض تماماً البرمجيات السطحية أو الحلول المؤقتة التي تتداعى تحت ضغط المستخدمين.'
                          : 'We refuse fragile quick fixes that collapse under real production concurrency.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1bb152] mt-0.5 flex-shrink-0" />
                      <span className="text-[#71717a]">
                        {language === 'ar'
                          ? 'نصمم تجارب استخدام بديهية تمكّن المستخدمين وتزيد من كفاءتهم اليومية.'
                          : 'We craft frictionless interfaces that empower end users rather than confusing them.'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1bb152] mt-0.5 flex-shrink-0" />
                      <span className="text-[#71717a]">
                        {language === 'ar'
                          ? 'نعامل منتجك كما لو كان مشروعنا الخاص باستثمار تقني مسؤول.'
                          : 'We treat your product as our own, with obsessive technical stewardship.'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Visual Pillars & Stats (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-8 rounded-2xl bg-white border border-[#e4e4e7] shadow-xs text-start space-y-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#6a5ed9]" />
                    <span className="font-eyebrow text-[#27272a]">
                      {language === 'ar' ? 'سجل الإنجاز والخبرة' : 'Proven Track Record'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {t.about.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-between"
                      >
                        <div>
                          <div className="text-3xl font-bold font-mono text-[#27272a]">
                            {stat.value}
                          </div>
                          <div className="text-xs text-[#71717a] mt-0.5">{stat.label}</div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-white border border-[#e4e4e7] flex items-center justify-center text-[#6a5ed9] shadow-2xs">
                          <Award className="w-5 h-5" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onNavigate('contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-3 rounded-xl bg-[#6a5ed9] text-xs font-medium text-white hover:bg-[#584dc7] transition-colors text-center shadow-sm shadow-[#6a5ed9]/25 cursor-pointer"
                    >
                      {language === 'ar' ? 'تحدث مع فريقنا الهندسي' : 'Consult With Our Engineers'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Core Values */}
      <ScrollReveal direction="up">
        <section className="relative py-20 bg-white border-t border-[#e4e4e7] overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-25 mask-radial pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="font-eyebrow text-[#3f71d4] uppercase">
                {language === 'ar' ? 'قيمنا الأساسية' : 'Core Tenets'}
              </span>
              <h2 className="font-display-h2 text-[#27272a]">
                {language === 'ar' ? 'المبادئ التي تحكم عملنا الهندسي' : 'How We Operate Every Day'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#e4e4e7] bg-[#fafafa] p-6 sm:p-7 text-start space-y-4 hover:border-[#6a5ed9]/40 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#e4e4e7] flex items-center justify-center text-[#6a5ed9] shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-card-title text-[#27272a]">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Technology Ecosystem Section */}
      <ScrollReveal direction="up" delay={0.05}>
        <section className="py-20 bg-[#fafafa] border-t border-[#e4e4e7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="font-eyebrow text-[#6a5ed9] uppercase">
                {t.tech.tag}
              </span>
              <h2 className="font-display-h2 text-[#27272a]">
                {t.tech.title}
              </h2>
              <p className="text-sm sm:text-base text-[#71717a] leading-relaxed">
                {t.tech.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {technologiesData.map((tech) => (
                <div
                  key={tech.name}
                  className="p-4 rounded-xl border border-[#e4e4e7] bg-white text-start hover:border-[#6a5ed9]/40 shadow-2xs hover:shadow-xs transition-all"
                >
                  <div className="text-xs font-mono text-[#3f71d4] font-medium">{tech.category}</div>
                  <div className="text-base font-semibold text-[#27272a] mt-1">{tech.name}</div>
                  <div className="text-[11px] text-[#71717a] mt-1 line-clamp-2">{language === 'ar' ? tech.desc_ar : tech.desc_en}</div>
                </div>
              ))}
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
