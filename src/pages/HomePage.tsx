import React, { useState } from 'react';
import { Language, PageId, ProjectItem, ServiceItem } from '../types';
import { translations } from '../translations';
import { servicesData, technologiesData, testimonialsData, blogPostsData } from '../data';
import { cmsStore } from '../services/cmsStore';
import { HeroVisual } from '../components/HeroVisual';
import { TrustStrip } from '../components/TrustStrip';
import { HomeServicesSection } from '../components/HomeServicesSection';
import { CTASection } from '../components/CTASection';
import { ScrollReveal } from '../components/ScrollReveal';

const getDefaultProjectImage = (project: ProjectItem) => {
  if (project.image) return project.image;
  if (project.coverImage) return project.coverImage;
  
  const images: Record<string, string> = {
    'orbit-saas': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    'apex-fintech': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    'lumina-health': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    'kroma-design': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    'vortex-iot': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    'zenith-mvp': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  };
  
  return images[project.id] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';
};
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
  Quote,
  Sparkles,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface HomePageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
  onOpenServiceModal: (service: ServiceItem) => void;
  onOpenProjectModal: (project: ProjectItem) => void;
  onOpenBlogPost: (postId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  onNavigate,
  onOpenServiceModal,
  onOpenProjectModal,
  onOpenBlogPost,
}) => {
  const t = translations[language];
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  const allProjects = cmsStore.getProjects();
  const featuredProject = allProjects.find((p) => p.featured) || allProjects[0];
  const previewProjects = allProjects.slice(0, 3);
  const previewBlogPosts = blogPostsData.slice(0, 3);

  return (
    <div id="home-page" className="w-full">
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32 overflow-hidden bg-[#fafafa]"
      >
        {/* Subtle Technical Grid Background with Radial Hero Mask */}
        <div className="absolute inset-0 bg-tech-grid grid-mask-hero opacity-35 pointer-events-none" />

        {/* Soft Iris Atmosphere behind Hero visual */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[520px] bg-gradient-to-tr from-[#6a5ed9]/06 via-[#3f71d4]/04 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-start">
              {/* Eyebrow in Sprout Green */}
              {t.hero.tag ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#1bb152]/20 bg-[#1bb152]/10 font-eyebrow text-[#1bb152]">
                  <span className="w-2 h-2 rounded-full bg-[#1bb152] animate-pulse" />
                  <span>{t.hero.tag}</span>
                </div>
              ) : null}

              {/* Main Headline */}
              <h1 className="font-display-hero text-[#27272a]">
                {t.hero.title}
              </h1>

              {/* Supporting Paragraph */}
              <p className="text-base sm:text-lg text-[#71717a] leading-relaxed max-w-[65ch]">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
                <button
                  id="hero-start-project-btn"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#6a5ed9] text-sm font-medium text-white hover:bg-[#584dc7] shadow-sm shadow-[#6a5ed9]/25 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowUpRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
                </button>

                <button
                  id="hero-explore-work-btn"
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#e4e4e7] bg-white text-sm font-medium text-[#27272a] hover:bg-[#f4f4f5] hover:border-[#d4d4d8] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{t.hero.ctaSecondary}</span>
                  <ChevronRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual Composition */}
            <div className="lg:col-span-5">
              <HeroVisual language={language} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / CLIENT STRIP */}
      <ScrollReveal delay={0.1}>
        <TrustStrip language={language} />
      </ScrollReveal>

      {/* 3. SERVICES / CAPABILITIES SECTION */}
      <ScrollReveal direction="up">
        <HomeServicesSection
          language={language}
          onNavigate={onNavigate}
          onOpenServiceModal={onOpenServiceModal}
        />
      </ScrollReveal>

      {/* 4. WHY DEVROPIX */}
      <ScrollReveal direction="up" delay={0.05}>
        <section id="why-devropix-section" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left: Large Editorial Statement */}
              <div className="lg:col-span-5 space-y-5 text-start">
                <span className="font-eyebrow text-[#3f71d4] uppercase">
                  {t.whyUs.tag}
                </span>

                <h2 className="font-display-h2 text-[#27272a]">
                  {t.whyUs.statement}
                </h2>

                <p className="text-base text-[#71717a] leading-relaxed max-w-[65ch]">
                  {t.whyUs.subtitle}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('about')}
                    className="inline-flex items-center gap-2 text-xs font-medium text-[#6a5ed9] hover:text-[#3f71d4] transition-colors cursor-pointer"
                  >
                    <span>{language === 'ar' ? 'تعرف على فلسفة ديف روبيكس' : 'Read Our Full Partner Philosophy'}</span>
                    <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Right: Supporting Points with Subtle Dividers */}
              <div className="lg:col-span-7 divide-y divide-[#e4e4e7] border-y border-[#e4e4e7]">
                {t.whyUs.items.map((item, idx) => (
                  <div key={idx} className="py-5 sm:py-6 text-start first:pt-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <span className="text-xs font-mono font-semibold text-[#6a5ed9] px-2.5 py-0.5 rounded bg-[#6a5ed9]/10 flex-shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-[#27272a]">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-[#71717a] mt-1.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 5. PROCESS */}
      <ScrollReveal direction="up" delay={0.05}>
        <section
          id="process-section"
          className="py-24 bg-[#fafafa] border-y border-[#e4e4e7] relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 sm:space-y-4">
              <span className="font-eyebrow text-[#db5434] uppercase">
                {t.process.tag}
              </span>
              <h2 className="font-display-h2 text-[#27272a]">
                {t.process.title}
              </h2>
              <p className="text-base text-[#71717a] leading-relaxed max-w-[65ch] mx-auto">
                {t.process.subtitle}
              </p>
            </div>

            {/* Timeline Grid */}
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 relative z-10">
                {t.process.steps.map((step, idx) => {
                  const isSelected = activeProcessStep === idx;
                  return (
                    <div
                      key={step.num}
                      id={`process-step-${step.num}`}
                      onClick={() => setActiveProcessStep(idx)}
                      className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 text-start ${
                        isSelected
                          ? 'border-2 border-[#6a5ed9] bg-white shadow-md'
                          : 'border border-[#e4e4e7] bg-white hover:border-[#d4d4d8]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                              isSelected
                                ? 'bg-[#6a5ed9] text-white'
                                : 'bg-[#f4f4f5] border border-[#e4e4e7] text-[#27272a]'
                            }`}
                          >
                            {step.num}
                          </span>
                        </div>
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#6a5ed9]' : 'bg-[#e4e4e7]'}`} />
                      </div>

                      <h3 className="text-base font-semibold text-[#27272a] mb-1.5">{step.name}</h3>
                      <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 6. PROJECTS SECTION */}
      <ScrollReveal direction="up">
        <section id="featured-case-study" className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-3.5 max-w-2xl text-start">
                <span className="font-mono text-xs font-bold text-[#6a5ed9] uppercase tracking-wider bg-[#6a5ed9]/10 px-3 py-1 rounded-full">
                  {t.projects.tag}
                </span>
                <h2 className="font-display-h2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#27272a] tracking-tight">
                  {t.projects.title}
                </h2>
                <p className="text-base sm:text-lg text-[#71717a] leading-relaxed max-w-[65ch]">
                  {t.projects.subtitle}
                </p>
              </div>

              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#6a5ed9] hover:text-[#584dc7] transition-all self-start md:self-auto cursor-pointer group"
              >
                <span>{t.projects.viewAll}</span>
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </button>
            </div>

            {/* Featured Large Showcase */}
            {featuredProject && (
              <div className="rounded-2xl border border-[#e4e4e7] bg-white p-6 sm:p-10 lg:p-12 mb-12 shadow-xs relative overflow-hidden text-start">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#6a5ed9]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
                  {/* Visual composition (Project Cover Image with floating metrics) */}
                  <div className="lg:col-span-6 rounded-2xl border border-[#e4e4e7] overflow-hidden shadow-md group/feat relative h-64 sm:h-80 lg:h-96">
                    <img
                      src={getDefaultProjectImage(featuredProject)}
                      alt={featuredProject.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/feat:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating Tech Pill */}
                    <span className="absolute top-4 start-4 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-[10px] font-mono font-bold text-[#6a5ed9] shadow-xs uppercase tracking-wider">
                      {featuredProject.category}
                    </span>

                    {/* Floating Production Badge */}
                    <span className="absolute top-4 end-4 px-2.5 py-1 rounded-md bg-zinc-900/75 backdrop-blur-xs text-[10px] font-semibold text-[#1bb152] shadow-xs flex items-center gap-1.5 border border-[#1bb152]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1bb152] animate-ping" />
                      Live in Production
                    </span>

                    {/* Overlay Name & Sector */}
                    <div className="absolute bottom-6 start-6 end-6 text-start text-white">
                      <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">{featuredProject.clientType}</div>
                      <h4 className="text-xl sm:text-2xl font-bold mt-1 text-white">
                        {language === 'ar' ? (featuredProject.name_ar || featuredProject.name) : (featuredProject.name_en || featuredProject.name)}
                      </h4>
                    </div>
                  </div>

                  {/* Narrative & Outcomes */}
                  <div className="lg:col-span-6 space-y-5 text-start">
                    <span className="font-mono text-[10px] font-bold text-[#6a5ed9] uppercase tracking-wider">
                      {language === 'ar' ? 'مشروع متميز' : 'Featured Case Study'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#27272a] tracking-tight leading-tight">
                      {language === 'ar' ? (featuredProject.name_ar || featuredProject.name) : (featuredProject.name_en || featuredProject.name)}
                    </h3>
                    <p className="text-sm sm:text-base text-[#71717a] leading-relaxed">
                      {language === 'ar' ? (featuredProject.summary_ar || featuredProject.summary) : (featuredProject.summary_en || featuredProject.summary)}
                    </p>

                    <div className="space-y-3 pt-2">
                      {featuredProject.results && (Array.isArray(featuredProject.results_ar || featuredProject.results)
                        ? (language === 'ar' ? (featuredProject.results_ar as string[]) : (featuredProject.results_en as string[] || featuredProject.results))
                        : (featuredProject.results || [])
                      ).slice(0, 3).map((res, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#27272a]">
                          <CheckCircle2 className="w-4 h-4 text-[#1bb152] flex-shrink-0 mt-0.5" />
                          <span className="text-[#71717a] font-medium">{res}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {(featuredProject.techStack || []).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 border border-[#e4e4e7] text-[11px] font-mono text-slate-600 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        id="featured-view-case-study-btn"
                        onClick={() => onOpenProjectModal(featuredProject)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6a5ed9] text-xs font-semibold text-white hover:bg-[#584dc7] shadow-md shadow-[#6a5ed9]/20 transition-all active:scale-98 cursor-pointer"
                      >
                        <span>{t.projects.viewDetails}</span>
                        <ArrowUpRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
                      </button>
                      <button
                        onClick={() => onNavigate('projects')}
                        className="text-xs font-semibold text-slate-500 hover:text-[#6a5ed9] transition-colors cursor-pointer"
                      >
                        {t.projects.viewAll}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2 Other Selected Works (Grid) with Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(previewProjects || []).slice(1, 3).map((project) => (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className="group rounded-2xl border border-[#e4e4e7] bg-white flex flex-col justify-between hover:border-[#6a5ed9]/30 hover:shadow-lg transition-all hover:-translate-y-1 text-start overflow-hidden"
                >
                  <div>
                    {/* Top Image Frame */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                      <img
                        src={getDefaultProjectImage(project)}
                        alt={project.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                      
                      {/* Floating Category Badge */}
                      <span className="absolute top-4 start-4 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-[10px] font-mono font-bold text-[#6a5ed9] shadow-xs uppercase tracking-wider">
                        {project.category}
                      </span>
                      
                      {/* Client Type badge */}
                      <span className="absolute top-4 end-4 px-2 py-0.5 rounded-md bg-zinc-900/70 backdrop-blur-xs text-[10px] font-medium text-white shadow-xs">
                        {project.clientType}
                      </span>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-card-title text-base font-bold text-[#27272a] group-hover:text-[#6a5ed9] transition-colors leading-snug">
                          {language === 'ar' ? (project.name_ar || project.name) : (project.name_en || project.name)}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#71717a] mt-2 leading-relaxed line-clamp-3">
                          {language === 'ar' ? (project.summary_ar || project.summary) : (project.summary_en || project.summary)}
                        </p>
                      </div>

                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(project.techStack || []).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-slate-50 border border-[#e4e4e7] text-[10px] font-mono text-slate-500"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onOpenProjectModal(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6a5ed9] group-hover:text-[#584dc7] transition-colors cursor-pointer"
                    >
                      <span>{t.projects.viewDetails}</span>
                      <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
                    </button>
                    <span className="text-[9px] font-mono font-medium text-slate-400">Delivered by DevRopix</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 7. ABOUT & DELIVERY BENCHMARKS */}
      <ScrollReveal direction="up" delay={0.05}>
        <section id="about-preview-section" className="py-24 bg-[#fafafa] border-y border-[#e4e4e7] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-start">
                <span className="font-eyebrow text-[#1bb152] uppercase">
                  {t.about.tag}
                </span>
                <h2 className="font-display-h2 text-[#27272a]">
                  {t.about.title}
                </h2>
                <p className="text-base text-[#71717a] leading-relaxed max-w-[65ch]">
                  {t.about.p1}
                </p>
                <p className="text-base text-[#71717a] leading-relaxed max-w-[65ch]">
                  {t.about.p2}
                </p>

                {/* Strategic pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {t.about.pillars.map((pillar, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-[#e4e4e7] shadow-2xs">
                      <div className="text-xs font-semibold text-[#27272a]">{pillar.label}</div>
                      <div className="text-[11px] text-[#71717a] mt-1 leading-snug">{pillar.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics cards Right */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl bg-white border border-[#e4e4e7] shadow-xs text-start space-y-6">
                  <div className="font-eyebrow text-[#6a5ed9] uppercase">
                    {language === 'ar' ? 'معايير الأداء والالتزام' : 'Delivery Benchmarks'}
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {t.about.stats.map((stat, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7]">
                        <div className="text-3xl font-bold font-mono text-[#27272a]">
                          {stat.value}
                        </div>
                        <div className="text-xs text-[#71717a] mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate('about')}
                    className="w-full py-3 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] text-xs font-medium text-[#27272a] hover:bg-[#e4e4e7] transition-colors cursor-pointer"
                  >
                    {language === 'ar' ? 'تعرف على قصة ديف روبيكس وفريقنا' : 'Meet The DevRopix Team'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 8. TECHNOLOGY ECOSYSTEM */}
      <ScrollReveal direction="up">
        <section id="technology-section" className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 sm:space-y-4">
              <span className="font-eyebrow text-[#3f71d4] uppercase">
                {t.tech.tag}
              </span>
              <h2 className="font-display-h2 text-[#27272a]">
                {t.tech.title}
              </h2>
              <p className="text-base text-[#71717a] leading-relaxed max-w-[65ch] mx-auto">
                {t.tech.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {technologiesData.map((tech) => (
                <div
                  key={tech.name}
                  className="p-4 rounded-xl border border-[#e4e4e7] bg-[#fafafa] hover:bg-white hover:border-[#6a5ed9]/40 hover:shadow-2xs transition-all text-start group"
                >
                  <div className="text-xs font-mono text-[#3f71d4] font-medium">
                    {language === 'ar' ? (tech.category === 'Frontend' ? 'واجهة أمامية' : tech.category === 'Language' ? 'لغة برمجة' : tech.category === 'Fullstack' ? 'مطور ويب كامل' : tech.category === 'Backend' ? 'خلفية برمجية' : tech.category === 'Mobile' ? 'تطبيقات الهواتف' : tech.category === 'Database' ? 'قواعد بيانات' : tech.category === 'DevOps' ? 'عمليات وتكامل' : tech.category === 'Design' ? 'تصميم واجهات' : tech.category === 'Workflow' ? 'تدفق عمل' : tech.category) : tech.category}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[#27272a] mt-1 group-hover:text-[#6a5ed9] transition-colors">
                    {tech.name}
                  </div>
                  <div className="text-[11px] text-[#71717a] mt-1.5 leading-snug line-clamp-2">
                    {language === 'ar' ? tech.desc_ar : tech.desc_en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 9. TESTIMONIALS */}
      <ScrollReveal direction="up" delay={0.05}>
        <section id="testimonials-section" className="py-24 bg-[#fafafa] border-y border-[#e4e4e7] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 sm:space-y-4">
              <span className="font-eyebrow text-[#1bb152] uppercase">
                {t.testimonials.tag}
              </span>
              <h2 className="font-display-h2 text-[#27272a]">
                {t.testimonials.title}
              </h2>
              <p className="text-base text-[#71717a] leading-relaxed max-w-[65ch] mx-auto">
                {t.testimonials.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonialsData.map((test) => (
                <div
                  key={test.id}
                  className="rounded-2xl border border-[#e4e4e7] bg-white p-6 sm:p-7 flex flex-col justify-between text-start space-y-6 shadow-xs"
                >
                  <div className="space-y-4">
                    <Quote className="w-6 h-6 text-[#6a5ed9]/30" />
                    <p className="text-sm text-[#27272a] leading-relaxed italic">
                      &ldquo;{language === 'ar' ? (test.quote_ar || test.quote) : (test.quote_en || test.quote)}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e4e4e7] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#6a5ed9]/10 text-[#6a5ed9] font-semibold text-xs flex items-center justify-center flex-shrink-0">
                      {test.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#27272a]">
                        {language === 'ar' ? (test.author === 'Tariq Al-Mansoor' ? 'طارق المنصور' : test.author === 'Khalid Al-Ghamdi' ? 'خالد الغامدي' : test.author === 'Sarah Jenkins' ? 'سارة جينكينز' : test.author) : test.author}
                      </div>
                      <div className="text-[11px] text-[#71717a]">
                        {language === 'ar' ? (test.role_ar || test.role) : (test.role_en || test.role)}، {language === 'ar' ? (test.company === 'Orbit Logistics' ? 'أوربت للخدمات اللوجستية' : test.company === 'Apex Wealth Partners' ? 'أبيكس لشركاء الثروات' : test.company === 'Lumina Health Clinics' ? 'عيادات لومينا الطبية' : test.company) : test.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 10. BLOG PREVIEW SECTION */}
      <ScrollReveal direction="up">
        <section id="blog-preview-section" className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-3 max-w-2xl text-start">
                <span className="font-eyebrow text-[#db5434] uppercase">
                  {t.blog.tag}
                </span>
                <h2 className="font-display-h2 text-[#27272a]">
                  {t.blog.title}
                </h2>
                <p className="text-base text-[#71717a] leading-relaxed max-w-[65ch]">
                  {t.blog.subtitle}
                </p>
              </div>

              <button
                onClick={() => onNavigate('blog')}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#6a5ed9] hover:text-[#3f71d4] transition-colors self-start md:self-auto cursor-pointer"
              >
                <span>{language === 'ar' ? 'عرض كافة المقالات' : 'Explore All Insights'}</span>
                <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {previewBlogPosts.map((post) => (
                <article
                  key={post.id}
                  id={`blog-card-${post.id}`}
                  className="group rounded-2xl border border-[#e4e4e7] bg-[#fafafa] p-6 flex flex-col justify-between hover:border-[#6a5ed9]/40 hover:bg-white hover:shadow-2xs transition-all text-start"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#71717a]">
                      <span className="px-2.5 py-0.5 rounded bg-[#6a5ed9]/10 text-[11px] font-medium text-[#6a5ed9]">
                        {language === 'ar' ? (post.category === 'Technology' ? 'تقنية ومعمارية' : post.category === 'UI/UX' ? 'تصميم تجربة المستخدم' : post.category === 'Business' ? 'استراتيجية الأعمال' : post.category) : post.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3" />
                        {language === 'ar' ? (post.readTime_ar || post.readTime) : (post.readTime_en || post.readTime)}
                      </span>
                    </div>

                    <h3 className="font-card-title text-[#27272a] group-hover:text-[#6a5ed9] transition-colors">
                      {language === 'ar' ? (post.title_ar || post.title) : (post.title_en || post.title)}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed line-clamp-3">
                      {language === 'ar' ? (post.excerpt_ar || post.excerpt) : (post.excerpt_en || post.excerpt)}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#e4e4e7] flex items-center justify-between">
                    <span className="text-[11px] text-[#71717a]">
                      {language === 'ar' ? post.date.replace('Sep', 'سبتمبر').replace('Aug', 'أغسطس').replace('Jul', 'يوليو') : post.date}
                    </span>
                    <button
                      onClick={() => onOpenBlogPost(post.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#6a5ed9] hover:text-[#3f71d4] transition-colors cursor-pointer"
                    >
                      <span>{t.blog.readMore}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 11. CONCLUSION CTA BANNER */}
      <ScrollReveal direction="up" delay={0.1}>
        <CTASection language={language} onNavigate={onNavigate} />
      </ScrollReveal>
    </div>
  );
};
