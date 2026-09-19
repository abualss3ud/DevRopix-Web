import React, { useState } from 'react';
import { Language, PageId, ServiceItem } from '../types';
import { translations } from '../translations';
import { servicesData } from '../data';
import {
  Globe,
  Smartphone,
  Layers,
  Cpu,
  Rocket,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

interface HomeServicesSectionProps {
  language: Language;
  onNavigate: (page: PageId) => void;
  onOpenServiceModal: (service: ServiceItem) => void;
}

export const HomeServicesSection: React.FC<HomeServicesSectionProps> = ({
  language,
  onNavigate,
  onOpenServiceModal,
}) => {
  const t = translations[language];
  const [activeServiceId, setActiveServiceId] = useState<string>('web-development');

  // Find active service
  const activeService =
    servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  const activeServiceText = t.services[
    activeService.titleKey as keyof typeof t.services
  ] as {
    title: string;
    desc: string;
    fullDesc?: string;
    metric: string;
  };

  // Color & Theme Mapping for Services
  const serviceMeta: Record<
    string,
    {
      color: string;
      accentBg: string;
      accentBorder: string;
      textAccent: string;
      glowColor: string;
      tagLabel: string;
    }
  > = {
    'web-development': {
      color: '#3f71d4',
      accentBg: 'bg-[#3f71d4]/10',
      accentBorder: 'border-[#3f71d4]/20',
      textAccent: 'text-[#3f71d4]',
      glowColor: 'from-[#3f71d4]/10',
      tagLabel: language === 'ar' ? 'منصات الويب السحابية' : 'Web & Cloud Platforms',
    },
    'mobile-development': {
      color: '#6a5ed9',
      accentBg: 'bg-[#6a5ed9]/10',
      accentBorder: 'border-[#6a5ed9]/20',
      textAccent: 'text-[#6a5ed9]',
      glowColor: 'from-[#6a5ed9]/10',
      tagLabel: language === 'ar' ? 'تطبيقات الهواتف' : 'Native & Cross-Platform',
    },
    'ui-ux-design': {
      color: '#db5434',
      accentBg: 'bg-[#db5434]/10',
      accentBorder: 'border-[#db5434]/20',
      textAccent: 'text-[#db5434]',
      glowColor: 'from-[#db5434]/10',
      tagLabel: language === 'ar' ? 'تصميم تجربة الاستخدام' : 'UI/UX & Design Systems',
    },
    'custom-software': {
      color: '#ffb929',
      accentBg: 'bg-[#ffb929]/15',
      accentBorder: 'border-[#ffb929]/30',
      textAccent: 'text-[#b45309]',
      glowColor: 'from-[#ffb929]/10',
      tagLabel: language === 'ar' ? 'الأنظمة البرمجية الخاصة' : 'Enterprise Architecture',
    },
    'digital-product': {
      color: '#1bb152',
      accentBg: 'bg-[#1bb152]/10',
      accentBorder: 'border-[#1bb152]/20',
      textAccent: 'text-[#1bb152]',
      glowColor: 'from-[#1bb152]/10',
      tagLabel: language === 'ar' ? 'المنتجات الرقمية و MVP' : 'MVP & Product Strategy',
    },
    'maintenance-support': {
      color: '#3f71d4',
      accentBg: 'bg-[#3f71d4]/10',
      accentBorder: 'border-[#3f71d4]/20',
      textAccent: 'text-[#3f71d4]',
      glowColor: 'from-[#3f71d4]/10',
      tagLabel: language === 'ar' ? 'الدعم والاستقرار 24/7' : 'SLA & 24/7 Operations',
    },
  };

  const getServiceIcon = (name: string, className: string = 'w-5 h-5') => {
    switch (name) {
      case 'Globe':
        return <Globe className={className} />;
      case 'Smartphone':
        return <Smartphone className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Rocket':
        return <Rocket className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // Interactive Live Preview Simulation Widget for the active service
  const renderInteractivePreview = (serviceId: string) => {
    switch (serviceId) {
      case 'web-development':
        return (
          <div className="space-y-4">
            {/* Browser Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#27272a] rounded-t-xl border-b border-[#3f3f46]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#db5434]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb929]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#1bb152]" />
              </div>
              <div className="px-3 py-0.5 rounded-md bg-[#18181b] border border-[#3f3f46] text-[11px] font-mono text-[#a1a1aa] flex items-center gap-1.5">
                <span className="text-[#1bb152]">https://</span>
                <span>platform.devropix.cloud</span>
              </div>
              <div className="text-[10px] font-mono text-[#4ade80] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                <span>200 OK</span>
              </div>
            </div>

            {/* Metrics Dashboard Simulation */}
            <div className="p-5 bg-white rounded-b-xl border border-t-0 border-[#e4e4e7] space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-start">
                  <span className="text-[10px] font-mono text-[#71717a] block">Core Web Vitals</span>
                  <span className="text-xl font-bold font-mono text-[#1bb152]">99/100</span>
                  <span className="text-[10px] text-[#1bb152] block mt-0.5">Lighthouse Score</span>
                </div>
                <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-start">
                  <span className="text-[10px] font-mono text-[#71717a] block">TTFB Latency</span>
                  <span className="text-xl font-bold font-mono text-[#3f71d4]">&lt; 38ms</span>
                  <span className="text-[10px] text-[#71717a] block mt-0.5">Edge CDN Cached</span>
                </div>
                <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-start">
                  <span className="text-[10px] font-mono text-[#71717a] block">Architecture</span>
                  <span className="text-sm font-bold font-mono text-[#27272a] mt-1 block">SSR + SPA</span>
                  <span className="text-[10px] text-[#6a5ed9] block mt-0.5">Next.js &amp; Tailwind</span>
                </div>
              </div>

              {/* Code Snippet preview */}
              <div className="p-3.5 rounded-xl bg-[#18181b] font-mono text-xs text-[#e4e4e7] space-y-1.5 overflow-x-auto text-start">
                <div className="text-[#a1a1aa] text-[11px]">// High-throughput optimized edge route</div>
                <div>
                  <span className="text-[#6a5ed9]">export async function</span>{' '}
                  <span className="text-[#60a5fa]">GET</span>(request: <span className="text-[#34d399]">NextRequest</span>) &#123;
                </div>
                <div className="ps-4 text-[#a1a1aa]">
                  return <span className="text-[#f59e0b]">Response</span>.json(&#123; status: <span className="text-[#34d399]">'healthy'</span>, latency: <span className="text-[#34d399]">'18ms'</span> &#125;);
                </div>
                <div>&#125;</div>
              </div>
            </div>
          </div>
        );

      case 'mobile-development':
        return (
          <div className="p-5 bg-white rounded-2xl border border-[#e4e4e7] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e4e4e7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#6a5ed9]/10 text-[#6a5ed9] flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="text-start">
                  <div className="text-xs font-bold text-[#27272a]">iOS &amp; Android Ecosystem</div>
                  <div className="text-[10px] text-[#71717a]">Flutter &amp; Native Swift/Kotlin</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#1bb152]/10 text-[#1bb152] font-mono text-[10px] font-semibold">
                60 FPS Native
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-start">
              <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7] space-y-1">
                <span className="text-[10px] font-mono text-[#71717a]">Sync Architecture</span>
                <div className="text-xs font-bold text-[#27272a] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1bb152]" />
                  <span>Offline-First DB</span>
                </div>
                <span className="text-[10px] text-[#71717a]">Instant cache &amp; background push</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7] space-y-1">
                <span className="text-[10px] font-mono text-[#71717a]">Biometrics</span>
                <div className="text-xs font-bold text-[#27272a] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6a5ed9]" />
                  <span>FaceID / TouchID</span>
                </div>
                <span className="text-[10px] text-[#71717a]">Hardware Secure Enclave</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#6a5ed9]/5 border border-[#6a5ed9]/20 flex items-center justify-between text-xs">
              <span className="text-[#6a5ed9] font-medium">App Store &amp; Play Store Automated CI/CD</span>
              <span className="font-mono text-[11px] text-[#27272a] font-semibold">Fastlane Ready</span>
            </div>
          </div>
        );

      case 'ui-ux-design':
        return (
          <div className="p-5 bg-white rounded-2xl border border-[#e4e4e7] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e4e4e7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#db5434]/10 text-[#db5434] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-start">
                  <div className="text-xs font-bold text-[#27272a]">Figma Design Token System</div>
                  <div className="text-[10px] text-[#71717a]">WCAG 2.1 AA Accessibility Compliant</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#db5434]/10 text-[#db5434] font-mono text-[10px] font-semibold">
                Auto-Layout 100%
              </span>
            </div>

            {/* Design Tokens Visual Preview */}
            <div className="space-y-2 text-start">
              <span className="text-[10px] font-mono text-[#71717a]">Component Design Tokens</span>
              <div className="grid grid-cols-4 gap-2">
                <div className="p-2 rounded-lg bg-[#6a5ed9] text-white text-center text-[10px] font-mono font-medium shadow-xs">
                  #6a5ed9
                </div>
                <div className="p-2 rounded-lg bg-[#3f71d4] text-white text-center text-[10px] font-mono font-medium shadow-xs">
                  #3f71d4
                </div>
                <div className="p-2 rounded-lg bg-[#db5434] text-white text-center text-[10px] font-mono font-medium shadow-xs">
                  #db5434
                </div>
                <div className="p-2 rounded-lg bg-[#1bb152] text-white text-center text-[10px] font-mono font-medium shadow-xs">
                  #1bb152
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-between text-xs text-start">
              <div>
                <div className="text-xs font-semibold text-[#27272a]">Interactive Prototype &amp; Wireframes</div>
                <div className="text-[10px] text-[#71717a]">Usability tested with zero-ambiguity developer handoff</div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#1bb152] flex-shrink-0" />
            </div>
          </div>
        );

      case 'custom-software':
        return (
          <div className="p-5 bg-white rounded-2xl border border-[#e4e4e7] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e4e4e7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#ffb929]/20 text-[#b45309] flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-start">
                  <div className="text-xs font-bold text-[#27272a]">Enterprise ERP &amp; Microservices</div>
                  <div className="text-[10px] text-[#71717a]">PostgreSQL • Redis • Docker • Node.js</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#1bb152]/10 text-[#1bb152] font-mono text-[10px] font-semibold">
                RBAC &amp; Audit Logs
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-start">
              <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7]">
                <span className="text-[10px] font-mono text-[#71717a]">API Throughput</span>
                <div className="text-base font-bold font-mono text-[#27272a] mt-0.5">15,000 req/s</div>
                <span className="text-[10px] text-[#1bb152]">Zero-Bottleneck Queue</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7]">
                <span className="text-[10px] font-mono text-[#71717a]">Data Security</span>
                <div className="text-base font-bold font-mono text-[#27272a] mt-0.5">AES-256</div>
                <span className="text-[10px] text-[#3f71d4]">Encrypted at Rest</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-xs text-start space-y-1">
              <span className="text-[10px] font-mono text-[#71717a]">Automated Workflow Pipelines</span>
              <div className="flex items-center gap-2 text-xs text-[#27272a] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#1bb152]" />
                <span>Invoicing &amp; CRM Synchronization Engine Active</span>
              </div>
            </div>
          </div>
        );

      case 'digital-product':
        return (
          <div className="p-5 bg-white rounded-2xl border border-[#e4e4e7] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e4e4e7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#1bb152]/10 text-[#1bb152] flex items-center justify-center">
                  <Rocket className="w-4 h-4" />
                </div>
                <div className="text-start">
                  <div className="text-xs font-bold text-[#27272a]">MVP Launch &amp; Product Sprint</div>
                  <div className="text-[10px] text-[#71717a]">Agile Milestones • Bi-Weekly Ship</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#1bb152]/10 text-[#1bb152] font-mono text-[10px] font-semibold">
                4-8 Weeks Delivery
              </span>
            </div>

            {/* Sprint Progress Bar */}
            <div className="space-y-2 text-start">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a]">
                <span>Roadmap Milestones</span>
                <span className="text-[#1bb152] font-bold">Phase 1 Target: Ready</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#f4f4f5] overflow-hidden">
                <div className="w-4/5 h-full bg-gradient-to-r from-[#1bb152] to-[#3f71d4] rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-start pt-1">
              <div className="p-2 rounded-lg bg-[#fafafa] border border-[#e4e4e7]">
                <div className="text-[10px] font-mono text-[#71717a]">Sprint 1</div>
                <div className="text-xs font-semibold text-[#27272a]">Scoping &amp; UI</div>
              </div>
              <div className="p-2 rounded-lg bg-[#fafafa] border border-[#e4e4e7]">
                <div className="text-[10px] font-mono text-[#71717a]">Sprint 2</div>
                <div className="text-xs font-semibold text-[#27272a]">Core Engine</div>
              </div>
              <div className="p-2 rounded-lg bg-[#1bb152]/10 border border-[#1bb152]/30">
                <div className="text-[10px] font-mono text-[#1bb152] font-bold">Sprint 3</div>
                <div className="text-xs font-bold text-[#1bb152]">Market Launch</div>
              </div>
            </div>
          </div>
        );

      case 'maintenance-support':
        return (
          <div className="p-5 bg-white rounded-2xl border border-[#e4e4e7] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e4e4e7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3f71d4]/10 text-[#3f71d4] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-start">
                  <div className="text-xs font-bold text-[#27272a]">24/7 Production Observability</div>
                  <div className="text-[10px] text-[#71717a]">Prometheus • Grafana • Sentry Realtime</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#1bb152]/10 text-[#1bb152] font-mono text-[10px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1bb152] animate-pulse" />
                <span>99.98% Uptime</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-start">
              <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7]">
                <span className="text-[10px] font-mono text-[#71717a]">Incident Response SLA</span>
                <div className="text-sm font-bold font-mono text-[#27272a] mt-0.5">&lt; 15 Minutes</div>
                <span className="text-[10px] text-[#3f71d4]">P1 Critical Hotline</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7]">
                <span className="text-[10px] font-mono text-[#71717a]">Automated Backups</span>
                <div className="text-sm font-bold font-mono text-[#27272a] mt-0.5">Hourly Snapshots</div>
                <span className="text-[10px] text-[#1bb152]">Cross-Region Redundant</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-between text-xs text-start">
              <span className="text-[#52525b]">Quarterly Security Vulnerability &amp; Dependency Auditing</span>
              <CheckCircle2 className="w-4 h-4 text-[#1bb152]" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id="services-section"
      className="py-24 sm:py-32 bg-[#fafafa] border-y border-[#e4e4e7] relative overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -start-20 w-[500px] h-[500px] bg-[#6a5ed9]/05 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -end-20 w-[500px] h-[500px] bg-[#3f71d4]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 text-start">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#6a5ed9]/25 bg-[#6a5ed9]/8 font-eyebrow text-xs text-[#6a5ed9] font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#6a5ed9]" />
              <span>{t.services.tag}</span>
            </div>

            <h2 className="font-display-h2 text-[#27272a] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {language === 'ar' ? (
                <>
                  كل ما تحتاجه{' '}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#6a5ed9] to-[#3f71d4] font-black px-1.5">
                    للبناء والنمو
                    <span className="absolute bottom-1.5 left-0 right-0 h-2 bg-[#6a5ed9]/10 rounded-full -z-10" />
                  </span>
                </>
              ) : (
                <>
                  Everything You Need to{' '}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#6a5ed9] to-[#3f71d4] font-black px-1.5">
                    Build & Grow
                    <span className="absolute bottom-1.5 left-0 right-0 h-2 bg-[#6a5ed9]/10 rounded-full -z-10" />
                  </span>
                </>
              )}
            </h2>

            <p className={`text-base sm:text-lg text-[#71717a] leading-relaxed max-w-[62ch] ${
              language === 'ar' 
                ? 'border-r-2 border-[#6a5ed9]/30 pr-4' 
                : 'border-l-2 border-[#6a5ed9]/30 pl-4'
            }`}>
              {t.services.subtitle}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-500 bg-white border border-[#e4e4e7] px-4 py-2.5 rounded-xl shadow-xs shrink-0 self-start md:self-end">
            <span className="w-2 h-2 rounded-full bg-[#1bb152] animate-ping" />
            <span className="font-semibold text-slate-600">{language === 'ar' ? 'اختر خدمة للاستكشاف التفاعلي' : 'Select a service to explore'}</span>
          </div>
        </div>

        {/* INTERACTIVE SHOWCASE (Master-Detail Bento View) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Nav Tabs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {servicesData.map((service, idx) => {
              const isSelected = service.id === activeServiceId;
              const serviceInfo = t.services[
                service.titleKey as keyof typeof t.services
              ] as {
                title: string;
                desc: string;
                metric: string;
              };
              const meta = serviceMeta[service.id] || serviceMeta['web-development'];

              return (
                <button
                  key={service.id}
                  id={`service-tab-${service.id}`}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`group w-full p-4 sm:p-5 rounded-2xl border text-start transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white border-[#6a5ed9] shadow-md ring-1 ring-[#6a5ed9]/20'
                      : 'bg-white/80 border-[#e4e4e7] hover:bg-white hover:border-[#d4d4d8]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? `${meta.accentBg} ${meta.textAccent} border ${meta.accentBorder}`
                          : 'bg-[#f4f4f5] text-[#71717a] group-hover:text-[#27272a]'
                      }`}
                    >
                      {getServiceIcon(service.iconName, 'w-5 h-5')}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                            isSelected ? 'text-[#27272a]' : 'text-[#52525b] group-hover:text-[#27272a]'
                          }`}
                        >
                          {serviceInfo.title}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#71717a] truncate mt-0.5">
                        {serviceInfo.metric}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-mono text-[11px] text-[#a1a1aa]">0{idx + 1}</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? 'text-[#6a5ed9] translate-x-1'
                          : 'text-[#d4d4d8] group-hover:text-[#71717a]'
                      } ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Active Detail Showcase (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-[#e4e4e7] p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col justify-between space-y-8 text-start relative overflow-hidden">
            {/* Subtle top background glow */}
            <div
              className={`absolute top-0 end-0 w-72 h-72 bg-gradient-to-b ${
                serviceMeta[activeService.id]?.glowColor || 'from-[#6a5ed9]/10'
              } to-transparent rounded-full blur-2xl pointer-events-none`}
            />

            <div className="space-y-6 relative z-10">
              {/* Header detail */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                      serviceMeta[activeService.id]?.accentBg || 'bg-[#6a5ed9]/10'
                    } ${serviceMeta[activeService.id]?.accentBorder || 'border-[#6a5ed9]/20'} ${
                      serviceMeta[activeService.id]?.textAccent || 'text-[#6a5ed9]'
                    }`}
                  >
                    {serviceMeta[activeService.id]?.tagLabel}
                  </span>
                </div>

                <span className="text-xs font-mono font-semibold text-[#1bb152] bg-[#1bb152]/10 border border-[#1bb152]/20 px-3 py-1 rounded-full">
                  {activeServiceText.metric}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#27272a] tracking-tight">
                  {activeServiceText.title}
                </h3>
                <p className="text-sm sm:text-base text-[#71717a] mt-2.5 leading-relaxed">
                  {activeServiceText.fullDesc || activeServiceText.desc}
                </p>
              </div>

              {/* Live Simulated Engineering Widget */}
              <div className="pt-2">
                {renderInteractivePreview(activeService.id)}
              </div>

              {/* Deliverables checklist */}
              <div className="space-y-3 pt-2">
                <div className="font-eyebrow text-[#27272a] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1bb152]" />
                  <span>{t.services.deliverablesTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-xs text-[#52525b]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6a5ed9] mt-1.5 flex-shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack badges */}
              <div className="space-y-2 pt-2">
                <div className="font-eyebrow text-[#71717a]">
                  {t.services.technologiesTitle}
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeService.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-[#f4f4f5] border border-[#e4e4e7] text-xs font-mono text-[#27272a] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 pt-6 border-t border-[#e4e4e7] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                id="active-service-modal-trigger"
                onClick={() => onOpenServiceModal(activeService)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#6a5ed9] text-xs sm:text-sm font-medium text-white hover:bg-[#584dc7] shadow-sm shadow-[#6a5ed9]/25 transition-colors cursor-pointer"
              >
                <span>{t.services.learnMore}</span>
                <ArrowUpRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
              </button>

              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-xs font-medium text-[#27272a] hover:bg-[#e4e4e7] transition-colors cursor-pointer"
              >
                <span>{language === 'ar' ? 'طلب استشارة لهذه الخدمة' : 'Request Architecture Consultation'}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Signature Engineering Consultation Strip */}
        <div className="mt-14 sm:mt-16 rounded-3xl bg-[#18181b] border border-[#27272a] p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#6a5ed9]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-10 bottom-0 w-64 h-64 bg-[#3f71d4]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-start">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#27272a] border border-[#3f3f46] font-eyebrow text-[#4ade80]">
                <Zap className="w-3.5 h-3.5 text-[#4ade80]" />
                <span>{language === 'ar' ? 'استشارة معمارية مخصصة' : 'CUSTOM ENGINEERING ARCHITECTURE'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {language === 'ar'
                  ? 'هل لديك متطلبات برمجية فريدة أو مشروع استثنائي؟'
                  : 'Need a specialized software solution tailored for your workflow?'}
              </h3>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed max-w-[65ch]">
                {language === 'ar'
                  ? 'مهندسونا مستعدون لتحليل متطلباتك بدقة واقتراح أفضل معمارية برمجية وتقنية تناسب ميزانيتك وأهداف نموك.'
                  : 'Our engineering architects will analyze your business requirements, recommend the ideal tech stack, and deliver a clear milestone roadmap.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#6a5ed9] text-xs sm:text-sm font-medium text-white hover:bg-[#584dc7] transition-all shadow-md shadow-[#6a5ed9]/25 cursor-pointer"
              >
                <span>{language === 'ar' ? 'تحدث مع فريقنا الهندسي' : 'Consult With Our Engineers'}</span>
                <ArrowUpRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
              </button>

              <button
                onClick={() => {
                  onNavigate('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] border border-[#3f3f46] text-xs sm:text-sm font-medium text-white transition-all cursor-pointer"
              >
                <span>{language === 'ar' ? 'استعراض كافة الخدمات' : 'All Services Details'}</span>
                <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
