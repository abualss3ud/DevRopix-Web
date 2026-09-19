import React, { useState } from 'react';
import { Language, PageId, ProjectItem } from '../types';
import { translations } from '../translations';
import { cmsStore } from '../services/cmsStore';
import { CTASection } from '../components/CTASection';
import { ScrollReveal } from '../components/ScrollReveal';
import { ArrowUpRight, CheckCircle2, Sparkles, Filter, Award } from 'lucide-react';

interface ProjectsPageProps {
  language: Language;
}

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

interface ProjectsPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
  onOpenProjectModal: (project: ProjectItem) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  language,
  onNavigate,
  onOpenProjectModal,
}) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'customSoftware', label: language === 'ar' ? 'البرمجيات المخصصة' : 'Custom Software' },
    { id: 'mobileApp', label: language === 'ar' ? 'تطبيقات الجوال' : 'Mobile Apps' },
    { id: 'webDev', label: language === 'ar' ? 'تطبيقات الويب' : 'Web Applications' },
    { id: 'uiux', label: language === 'ar' ? 'تصميم الواجهات' : 'UI/UX Design' },
    { id: 'digitalProduct', label: language === 'ar' ? 'المنتجات الرقمية' : 'Digital Products' },
  ];

  const allProjects = cmsStore.getProjects();

  const filteredProjects =
    selectedCategory === 'all'
      ? allProjects
      : allProjects.filter((p) => p.categoryKey === selectedCategory);

  const featured = allProjects.find((p) => p.featured) || allProjects[0];

  return (
    <div id="projects-page" className="w-full pt-28 pb-20">
      {/* Header */}
      <ScrollReveal direction="up">
        <section className="relative py-20 bg-white border-b border-[#e4e4e7] overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-30 mask-radial pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3f71d4]/20 bg-[#3f71d4]/10 font-eyebrow text-[#3f71d4]">
              <span>{t.projects.tag}</span>
            </div>
            <h1 className="font-display-hero text-[#27272a]">
              {t.projects.title}
            </h1>
            <p className="text-base sm:text-lg text-[#71717a] max-w-3xl leading-relaxed">
              {t.projects.subtitle}
            </p>

            {/* Category Filter Pills */}
            <div className="pt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#71717a] me-2 flex items-center gap-1 font-medium">
                <Filter className="w-3.5 h-3.5 text-[#6a5ed9]" />
                {language === 'ar' ? 'تصنيف حسب:' : 'Filter:'}
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#27272a] text-white shadow-xs'
                      : 'bg-[#f4f4f5] border border-[#e4e4e7] text-[#71717a] hover:text-[#27272a] hover:border-[#d4d4d8]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Project Showcase */}
      {selectedCategory === 'all' && featured && (
        <ScrollReveal direction="up" delay={0.05}>
          <section className="py-16 bg-[#fafafa] border-b border-[#e4e4e7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl border border-[#e4e4e7] bg-white p-6 sm:p-10 lg:p-12 shadow-xs text-start overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#6a5ed9]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1bb152]/10 border border-[#1bb152]/20 font-mono text-[10px] font-bold text-[#1bb152] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.projects.featuredBadge}</span>
                    </div>

                    <h2 className="font-display-h2 text-[#27272a]">
                      {language === 'ar' ? (featured.name_ar || featured.name) : (featured.name_en || featured.name)}
                    </h2>

                    <p className="text-sm sm:text-base text-[#71717a] leading-relaxed">
                      {language === 'ar' ? (featured.summary_ar || featured.summary) : (featured.summary_en || featured.summary)}
                    </p>

                    <div className="space-y-2.5 pt-2">
                      {(Array.isArray(featured.results_ar || featured.results)
                        ? (language === 'ar' ? (featured.results_ar as string[]) : (featured.results_en as string[] || featured.results))
                        : (featured.results || [])
                      ).slice(0, 3).map((res, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#27272a]">
                          <CheckCircle2 className="w-4 h-4 text-[#1bb152] flex-shrink-0 mt-0.5" />
                          <span className="text-[#71717a] font-medium">{res}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => onOpenProjectModal(featured)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6a5ed9] text-xs font-semibold text-white hover:bg-[#584dc7] shadow-md shadow-[#6a5ed9]/20 transition-all active:scale-98 cursor-pointer animate-pulse"
                      >
                        <span>{t.projects.viewDetails}</span>
                        <ArrowUpRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
                      </button>
                      <span className="text-xs text-[#71717a] font-medium">
                        {language === 'ar' ? 'القطاع:' : 'Sector:'} <span className="text-slate-800 font-semibold">{featured.clientType}</span>
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 rounded-2xl border border-[#e4e4e7] overflow-hidden shadow-sm group/feat bg-[#f4f4f5]">
                    <div className="h-48 sm:h-56 overflow-hidden relative">
                      <img
                        src={getDefaultProjectImage(featured)}
                        alt={featured.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/feat:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-4 start-4 px-2.5 py-1 rounded bg-white text-xs font-mono font-bold text-[#6a5ed9] shadow-xs">
                        {featured.category}
                      </span>
                    </div>
                    <div className="p-6 bg-white space-y-4 text-start">
                      <div>
                        <div className="font-mono text-[10px] font-bold text-[#6a5ed9] uppercase tracking-wider mb-2">
                          {t.projects.technologiesTitle}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(featured.techStack || []).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg bg-slate-50 border border-[#e4e4e7] text-[11px] font-mono text-slate-600 shadow-2xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#e4e4e7]">
                        <div className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                          {t.projects.deliverablesTitle}
                        </div>
                        <div className="space-y-1.5">
                          {(featured.deliverables || []).map((item, idx) => (
                            <div key={idx} className="text-xs text-slate-600 flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6a5ed9]" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Projects Grid */}
      <ScrollReveal direction="up">
        <section className="relative py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
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

                      {/* Highlights - Key Outcome */}
                      {project.results && project.results[0] && (
                        <div className="p-3.5 rounded-xl bg-[#6a5ed9]/5 border border-[#6a5ed9]/10 space-y-1 shadow-2xs">
                          <div className="text-[10px] uppercase font-mono font-bold text-[#6a5ed9] tracking-wider flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            <span>{language === 'ar' ? 'النتيجة الرئيسية' : 'Key Outcome'}</span>
                          </div>
                          <div className="text-xs text-[#27272a] font-semibold leading-relaxed">
                            {project.results[0]}
                          </div>
                        </div>
                      )}

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
                      id={`open-project-modal-${project.id}`}
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

      {/* CTA */}
      <ScrollReveal direction="up" delay={0.05}>
        <CTASection language={language} onNavigate={onNavigate} />
      </ScrollReveal>
    </div>
  );
};
