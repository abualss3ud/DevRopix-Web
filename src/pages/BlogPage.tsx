import React, { useState, useMemo } from 'react';
import { BlogPost, Language, PageId } from '../types';
import { translations } from '../translations';
import { blogPostsData } from '../data';
import { CTASection } from '../components/CTASection';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Search,
  Clock,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  Tag,
  User,
  Calendar,
  X,
} from 'lucide-react';

interface BlogPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  language,
  onNavigate,
  selectedPostId,
  setSelectedPostId,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'all', label: t.blog.filterAll },
    { id: 'Technology', label: language === 'ar' ? 'التقنية والمعمارية' : 'Technology' },
    { id: 'UI/UX', label: language === 'ar' ? 'تصميم تجربة المستخدم' : 'UI/UX Design' },
    { id: 'Business', label: language === 'ar' ? 'استراتيجية الأعمال' : 'Business Strategy' },
  ];

  const filteredPosts = useMemo(() => {
    return blogPostsData.filter((post) => {
      const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
      const titleText = language === 'ar' ? (post.title_ar || '') : (post.title_en || '');
      const excerptText = language === 'ar' ? (post.excerpt_ar || '') : (post.excerpt_en || '');
      const matchesSearch =
        titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excerptText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags || []).some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory, language]);

  const activePost = useMemo(() => {
    if (!selectedPostId) return null;
    return blogPostsData.find((p) => p.id === selectedPostId) || null;
  }, [selectedPostId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="blog-page" className="w-full pt-28 pb-20">
      {/* Header */}
      <ScrollReveal direction="up">
        <section className="relative py-20 bg-white border-b border-[#e4e4e7] overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-30 mask-radial pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#db5434]/20 bg-[#db5434]/10 font-eyebrow text-[#db5434]">
              <span>{t.blog.tag}</span>
            </div>
            <h1 className="font-display-hero text-[#27272a]">
              {t.blog.title}
            </h1>
            <p className="text-base sm:text-lg text-[#71717a] max-w-3xl leading-relaxed">
              {t.blog.subtitle}
            </p>

            {/* Search & Category Filter Bar */}
            <div className="pt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#a1a1aa] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.blog.searchPlaceholder}
                  className="w-full ps-10 pe-9 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-xs text-[#27272a] placeholder-[#a1a1aa] focus:outline-none focus:border-[#6a5ed9] focus:bg-white transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#27272a]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#27272a] text-white shadow-xs'
                        : 'bg-[#fafafa] border border-[#e4e4e7] text-[#71717a] hover:text-[#27272a] hover:border-[#d4d4d8]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Active Article Detail View if selected */}
      {activePost ? (
        <ScrollReveal direction="up" delay={0.05}>
          <article className="relative py-16 bg-white min-h-[60vh]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-8">
              {/* Back button */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedPostId(null)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#6a5ed9] hover:text-[#3f71d4] transition-colors cursor-pointer"
                >
                  <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                  <span>{t.blog.backToList}</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-xs font-medium text-[#71717a] hover:text-[#27272a] hover:bg-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#1bb152]" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? t.blog.copied : t.blog.shareArticle}</span>
                </button>
              </div>

              {/* Meta header */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-[#71717a]">
                  <span className="px-2.5 py-1 rounded bg-[#6a5ed9]/10 text-[#6a5ed9] font-semibold">
                    {language === 'ar' ? (activePost.category === 'Technology' ? 'تقنية ومعمارية' : activePost.category === 'UI/UX' ? 'تصميم تجربة المستخدم' : activePost.category === 'Business' ? 'استراتيجية الأعمال' : activePost.category) : activePost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {language === 'ar' ? (activePost.date || '').replace('Sep', 'سبتمبر').replace('Aug', 'أغسطس').replace('Jul', 'يوليو') : (activePost.date || '')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {language === 'ar' ? (activePost.readTime_ar || activePost.readTime) : (activePost.readTime_en || activePost.readTime)}
                  </span>
                </div>

                <h1 className="font-display-h2 text-[#27272a]">
                  {language === 'ar' ? (activePost.title_ar || activePost.title) : (activePost.title_en || activePost.title)}
                </h1>

                {/* Author badge */}
                <div className="flex items-center gap-3 py-4 border-y border-[#e4e4e7]">
                  <div className="w-10 h-10 rounded-full bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center text-[#6a5ed9] font-bold text-sm shadow-2xs">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#27272a]">
                      {language === 'ar' ? (activePost.author?.name === 'Sultan Al-Rashid' ? 'سلطان الرشيد' : activePost.author?.name === 'DevRopix Architecture Group' ? 'مجموعة معمارية البرمجيات في ديف روبيكس' : activePost.author?.name === 'DevRopix Product Studio' ? 'ستوديو المنتجات في ديف روبيكس' : (activePost.author?.name || 'فريق ديف روبيكس')) : (activePost.author?.name || 'DevRopix Team')}
                    </div>
                    <div className="text-[11px] text-[#71717a]">
                      {language === 'ar' ? (activePost.author?.role_ar || activePost.author?.role) : (activePost.author?.role_en || activePost.author?.role)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="space-y-6 text-sm sm:text-base text-[#71717a] leading-relaxed">
                {(Array.isArray(language === 'ar' ? (activePost.content_ar || activePost.content) : (activePost.content_en || activePost.content))
                  ? (language === 'ar' ? (activePost.content_ar || activePost.content) : (activePost.content_en || activePost.content)) as string[]
                  : typeof (language === 'ar' ? (activePost.content_ar || activePost.content) : (activePost.content_en || activePost.content)) === 'string'
                  ? ((language === 'ar' ? (activePost.content_ar || activePost.content) : (activePost.content_en || activePost.content)) as string).split('\n\n')
                  : []
                ).map((paragraph: string, idx: number) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-[#e4e4e7] space-y-3">
                <div className="font-eyebrow text-[#27272a] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#6a5ed9]" />
                  <span>{language === 'ar' ? 'الكلمات المفتاحية' : 'Topics & Tags'}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(activePost.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md bg-[#fafafa] border border-[#e4e4e7] text-xs font-mono text-[#71717a]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Back to list trigger */}
              <div className="pt-8">
                <button
                  onClick={() => {
                    setSelectedPostId(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-xs font-medium text-[#27272a] hover:bg-[#e4e4e7] transition-colors cursor-pointer"
                >
                  {t.blog.backToList}
                </button>
              </div>
            </div>
          </article>
        </ScrollReveal>
      ) : (
        /* Blog Posts Grid */
        <ScrollReveal direction="up" delay={0.05}>
          <section className="py-20 bg-[#fafafa]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {filteredPosts.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <p className="text-lg font-bold text-[#27272a]">
                    {language === 'ar' ? 'لم يتم العثور على مقالات مطابقة' : 'No articles matched your query'}
                  </p>
                  <p className="text-xs text-[#71717a]">
                    {language === 'ar' ? 'جرب البحث بكلمات أخرى أو تصفح كافة المواضيع.' : 'Try adjusting your search keywords or resetting filters.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-white border border-[#e4e4e7] text-xs font-medium text-[#27272a] shadow-2xs cursor-pointer"
                  >
                    {language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <article
                      key={post.id}
                      id={`blog-card-${post.id}`}
                      className="group rounded-2xl border border-[#e4e4e7] bg-white p-7 flex flex-col justify-between hover:border-[#6a5ed9]/40 transition-all hover:-translate-y-1 shadow-2xs hover:shadow-xs text-start"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between text-xs text-[#71717a]">
                          <span className="px-2.5 py-0.5 rounded bg-[#fafafa] border border-[#e4e4e7] text-[11px] font-semibold text-[#6a5ed9]">
                            {language === 'ar' ? (post.category === 'Technology' ? 'تقنية ومعمارية' : post.category === 'UI/UX' ? 'تصميم تجربة المستخدم' : post.category === 'Business' ? 'استراتيجية الأعمال' : post.category) : post.category}
                          </span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <Clock className="w-3.5 h-3.5" />
                            {language === 'ar' ? (post.readTime_ar || post.readTime) : (post.readTime_en || post.readTime)}
                          </span>
                        </div>

                        <h2 className="font-card-title text-[#27272a] group-hover:text-[#6a5ed9] transition-colors">
                          {language === 'ar' ? (post.title_ar || post.title) : (post.title_en || post.title)}
                        </h2>

                        <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed line-clamp-3">
                          {language === 'ar' ? (post.excerpt_ar || post.excerpt) : (post.excerpt_en || post.excerpt)}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-[#71717a] pt-2">
                          <span className="font-medium text-[#27272a]">
                            {language === 'ar' ? (post.author?.name === 'Sultan Al-Rashid' ? 'سلطان الرشيد' : post.author?.name === 'DevRopix Architecture Group' ? 'مجموعة معمارية البرمجيات في ديف روبيكس' : post.author?.name === 'DevRopix Product Studio' ? 'ستوديو المنتجات في ديف روبيكس' : (post.author?.name || 'فريق ديف روبيكس')) : (post.author?.name || 'DevRopix Team')}
                          </span>
                          <span>•</span>
                          <span>{language === 'ar' ? (post.date || '').replace('Sep', 'سبتمبر').replace('Aug', 'أغسطس').replace('Jul', 'يوليو') : (post.date || '')}</span>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-[#e4e4e7] flex items-center justify-between">
                        <button
                          onClick={() => {
                            setSelectedPostId(post.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6a5ed9] hover:text-[#3f71d4] transition-colors cursor-pointer"
                        >
                          <span>{t.blog.readMore}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* CTA */}
      <ScrollReveal direction="up" delay={0.05}>
        <CTASection language={language} onNavigate={onNavigate} />
      </ScrollReveal>
    </div>
  );
};
