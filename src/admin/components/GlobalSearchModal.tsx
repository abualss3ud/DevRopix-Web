import React, { useState, useEffect } from 'react';
import { Search, X, FolderKanban, Briefcase, FileText, MessageSquare, Star, Users, ArrowRight } from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';
import { AdminSection } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (section: AdminSection, highlightId?: string) => void;
  language: 'en' | 'ar';
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  language,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  // Search in Collections
  const projects = cleanQuery
    ? cmsStore.getProjects().filter(
        (p) =>
          p.name_en.toLowerCase().includes(cleanQuery) ||
          p.name_ar.toLowerCase().includes(cleanQuery) ||
          p.summary_en.toLowerCase().includes(cleanQuery)
      )
    : [];

  const services = cleanQuery
    ? cmsStore.getServices().filter(
        (s) =>
          s.title_en.toLowerCase().includes(cleanQuery) ||
          s.title_ar.toLowerCase().includes(cleanQuery) ||
          s.shortDesc_en.toLowerCase().includes(cleanQuery)
      )
    : [];

  const blogPosts = cleanQuery
    ? cmsStore.getBlogPosts().filter(
        (b) =>
          b.title_en.toLowerCase().includes(cleanQuery) ||
          b.title_ar.toLowerCase().includes(cleanQuery) ||
          b.excerpt_en.toLowerCase().includes(cleanQuery)
      )
    : [];

  const messages = cleanQuery
    ? cmsStore.getMessages().filter(
        (m) =>
          m.name.toLowerCase().includes(cleanQuery) ||
          m.email.toLowerCase().includes(cleanQuery) ||
          m.message.toLowerCase().includes(cleanQuery)
      )
    : [];

  const testimonials = cleanQuery
    ? cmsStore.getTestimonials().filter(
        (t) =>
          t.author.toLowerCase().includes(cleanQuery) ||
          t.company.toLowerCase().includes(cleanQuery) ||
          t.quote_en.toLowerCase().includes(cleanQuery)
      )
    : [];

  const clients = cleanQuery
    ? cmsStore.getClients().filter((c) => c.name.toLowerCase().includes(cleanQuery))
    : [];

  const totalResults =
    projects.length +
    services.length +
    blogPosts.length +
    messages.length +
    testimonials.length +
    clients.length;

  return (
    <div
      id="global-search-modal"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl border border-[#e4e4e7] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#e4e4e7] gap-3">
          <Search className="w-5 h-5 text-[#6a5ed9] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'ar'
                ? 'ابحث في المشاريع، الخدمات، المقالات، الرسائل والعملاء...'
                : 'Search projects, services, blog posts, messages, clients...'
            }
            className="w-full text-sm text-[#27272a] focus:outline-none placeholder:text-[#a1a1aa]"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium text-[#71717a] bg-[#f4f4f5] border border-[#e4e4e7] rounded">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#27272a]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!cleanQuery ? (
            <div className="py-8 text-center space-y-2">
              <Search className="w-8 h-8 text-[#d4d4d8] mx-auto" />
              <p className="text-xs text-[#71717a]">
                {language === 'ar'
                  ? 'ابدأ بالكتابة للبحث الفوري في كافة أقسام النظام'
                  : 'Start typing to search instantly across all site collections'}
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center space-y-1">
              <p className="text-sm font-semibold text-[#27272a]">
                {language === 'ar' ? 'لا توجد نتائج مطابقة' : 'No matching results found'}
              </p>
              <p className="text-xs text-[#71717a]">
                {language === 'ar' ? `لم نعثر على أي عنصر يطابق "${query}"` : `We could not find anything matching "${query}"`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Projects */}
              {projects.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider flex items-center gap-1.5 px-2">
                    <FolderKanban className="w-3.5 h-3.5 text-[#6a5ed9]" />
                    <span>{language === 'ar' ? 'المشاريع' : 'Projects'} ({projects.length})</span>
                  </span>
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onNavigateSection('projects', p.id);
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-[#f4f4f5] flex items-center justify-between text-start transition-colors cursor-pointer group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-[#27272a] group-hover:text-[#6a5ed9]">
                          {language === 'ar' ? p.name_ar : p.name_en}
                        </p>
                        <p className="text-[11px] text-[#71717a] truncate max-w-md">
                          {language === 'ar' ? p.summary_ar : p.summary_en}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#a1a1aa] group-hover:text-[#6a5ed9] transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              )}

              {/* Services */}
              {services.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider flex items-center gap-1.5 px-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#3f71d4]" />
                    <span>{language === 'ar' ? 'الخدمات' : 'Services'} ({services.length})</span>
                  </span>
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onNavigateSection('services', s.id);
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-[#f4f4f5] flex items-center justify-between text-start transition-colors cursor-pointer group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-[#27272a] group-hover:text-[#3f71d4]">
                          {language === 'ar' ? s.title_ar : s.title_en}
                        </p>
                        <p className="text-[11px] text-[#71717a] truncate max-w-md">
                          {language === 'ar' ? s.shortDesc_ar : s.shortDesc_en}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#a1a1aa] group-hover:text-[#3f71d4] transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              )}

              {/* Blog Posts */}
              {blogPosts.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider flex items-center gap-1.5 px-2">
                    <FileText className="w-3.5 h-3.5 text-[#1bb152]" />
                    <span>{language === 'ar' ? 'المدونة' : 'Blog Posts'} ({blogPosts.length})</span>
                  </span>
                  {blogPosts.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        onNavigateSection('blog', b.id);
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-[#f4f4f5] flex items-center justify-between text-start transition-colors cursor-pointer group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-[#27272a] group-hover:text-[#1bb152]">
                          {language === 'ar' ? b.title_ar : b.title_en}
                        </p>
                        <p className="text-[11px] text-[#71717a] truncate max-w-md">
                          {language === 'ar' ? b.excerpt_ar : b.excerpt_en}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#a1a1aa] group-hover:text-[#1bb152] transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              )}

              {/* Messages */}
              {messages.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider flex items-center gap-1.5 px-2">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                    <span>{language === 'ar' ? 'الرسائل' : 'Messages'} ({messages.length})</span>
                  </span>
                  {messages.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        onNavigateSection('messages', m.id);
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-[#f4f4f5] flex items-center justify-between text-start transition-colors cursor-pointer group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-[#27272a] group-hover:text-amber-600">
                          {m.name} ({m.email})
                        </p>
                        <p className="text-[11px] text-[#71717a] truncate max-w-md">{m.message}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#a1a1aa] group-hover:text-amber-600 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              )}

              {/* Testimonials */}
              {testimonials.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider flex items-center gap-1.5 px-2">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span>{language === 'ar' ? 'آراء العملاء' : 'Testimonials'} ({testimonials.length})</span>
                  </span>
                  {testimonials.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onNavigateSection('testimonials', t.id);
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-[#f4f4f5] flex items-center justify-between text-start transition-colors cursor-pointer group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-[#27272a]">
                          {t.author} — {t.company}
                        </p>
                        <p className="text-[11px] text-[#71717a] truncate max-w-md">
                          {language === 'ar' ? t.quote_ar : t.quote_en}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#a1a1aa] transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              )}

              {/* Clients */}
              {clients.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider flex items-center gap-1.5 px-2">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{language === 'ar' ? 'الشركاء والعملاء' : 'Partners & Clients'} ({clients.length})</span>
                  </span>
                  {clients.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onNavigateSection('clients', c.id);
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-[#f4f4f5] flex items-center justify-between text-start transition-colors cursor-pointer group"
                    >
                      <p className="text-xs font-semibold text-[#27272a]">{c.name}</p>
                      <ArrowRight className="w-4 h-4 text-[#a1a1aa] transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
