import React from 'react';
import { ProjectItem, Language } from '../types';
import { translations } from '../translations';
import { X, CheckCircle2, ArrowUpRight, Cpu, Layers, Award } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
  language: Language;
  onStartProjectClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  language,
  onStartProjectClick,
}) => {
  const t = translations[language];

  return (
    <div
      id="project-case-study-modal"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#27272a]/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white border border-[#e4e4e7] shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[92vh] text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-project-modal-btn"
          onClick={onClose}
          className="absolute top-5 ltr:right-5 rtl:left-5 p-2 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-[#71717a] hover:text-[#27272a] hover:bg-[#e4e4e7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Title */}
        <div className="flex flex-wrap items-center gap-2 mb-2 pe-8">
          <span className="px-2.5 py-1 rounded-md bg-[#6a5ed9]/10 text-[#6a5ed9] font-eyebrow">
            {project.category}
          </span>
          <span className="text-xs text-[#71717a]">• {project.clientType}</span>
        </div>

        <h3 id="project-modal-title" className="font-display-h2 text-[#27272a] mb-3">
          {project.name}
        </h3>

        <p className="text-sm sm:text-base text-[#71717a] leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Problem vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Challenge */}
          <div className="p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7]">
            <h4 className="font-eyebrow text-[#27272a] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#db5434]" />
              {t.projects.challengeTitle}
            </h4>
            <p className="text-xs text-[#71717a] leading-relaxed">{project.challenge}</p>
          </div>

          {/* Solution */}
          <div className="p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7]">
            <h4 className="font-eyebrow text-[#27272a] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3f71d4]" />
              {t.projects.solutionTitle}
            </h4>
            <p className="text-xs text-[#71717a] leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Results & Business Outcomes */}
        <div className="p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7] mb-6">
          <h4 className="font-eyebrow text-[#27272a] mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#1bb152]" />
            {t.projects.resultsTitle}
          </h4>
          <div className="space-y-2">
            {(project.results || []).map((res, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#27272a]">
                <CheckCircle2 className="w-4 h-4 text-[#1bb152] flex-shrink-0 mt-0.5" />
                <span className="text-[#71717a] font-medium">{res}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables and Tech Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <h4 className="font-eyebrow text-[#27272a] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#6a5ed9]" />
              {t.projects.deliverablesTitle}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(project.deliverables || []).map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#fafafa] border border-[#e4e4e7] text-[11px] text-[#71717a]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-eyebrow text-[#27272a] mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#3f71d4]" />
              {t.projects.technologiesTitle}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(project.techStack || []).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#fafafa] border border-[#e4e4e7] text-[11px] font-mono text-[#27272a]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-[#e4e4e7]">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-[#71717a] hover:text-[#27272a] rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] cursor-pointer"
          >
            {t.projects.closeModal}
          </button>
          <button
            onClick={() => {
              onStartProjectClick();
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#6a5ed9] text-xs font-medium text-white hover:bg-[#584dc7] shadow-sm shadow-[#6a5ed9]/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] cursor-pointer"
          >
            <span>{language === 'ar' ? 'ابدأ مشروعاً مشابهاً' : 'Build a Similar Project'}</span>
            <ArrowUpRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
