import React from 'react';
import { Globe, Search, ShieldCheck } from 'lucide-react';

interface SeoFieldsProps {
  seoTitle: string;
  setSeoTitle: (val: string) => void;
  seoDesc: string;
  setSeoDesc: (val: string) => void;
  keywords?: string;
  setKeywords?: (val: string) => void;
  canonicalUrl?: string;
  setCanonicalUrl?: (val: string) => void;
  ogImage?: string;
  setOgImage?: (val: string) => void;
  language?: 'en' | 'ar';
}

export const SeoFields: React.FC<SeoFieldsProps> = ({
  seoTitle,
  setSeoTitle,
  seoDesc,
  setSeoDesc,
  keywords,
  setKeywords,
  canonicalUrl,
  setCanonicalUrl,
  ogImage,
  setOgImage,
  language = 'en',
}) => {
  const isAr = language === 'ar';
  const titleLimit = 60;
  const descLimit = 160;

  return (
    <div className="rounded-xl border border-[#e4e4e7] bg-[#fafafa] p-4 sm:p-5 space-y-4 text-start">
      <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#6a5ed9]" />
          <h4 className="text-xs font-bold text-[#27272a] uppercase tracking-wider">
            {isAr ? 'بيانات محركات البحث (SEO)' : 'Search Engine Optimization (SEO)'}
          </h4>
        </div>
        <span className="text-[11px] text-[#71717a] flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#1bb152]" />
          {isAr ? 'فحص جاهزية الفهرسة' : 'Indexing Ready'}
        </span>
      </div>

      {/* Meta Title */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#27272a]">
            {isAr ? 'عنوان الصفحة (Meta Title)' : 'Meta Title'}
          </label>
          <span
            className={`text-[11px] font-mono ${
              seoTitle.length > titleLimit ? 'text-amber-600 font-semibold' : 'text-[#71717a]'
            }`}
          >
            {seoTitle.length} / {titleLimit}
          </span>
        </div>
        <input
          type="text"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          placeholder={isAr ? 'عنوان واضح وجذاب لمحركات البحث...' : 'Catchy, keyword-focused title...'}
          maxLength={80}
          className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#e4e4e7] bg-white text-[#27272a] focus:outline-none focus:border-[#6a5ed9] focus:ring-1 focus:ring-[#6a5ed9]"
        />
      </div>

      {/* Meta Description */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#27272a]">
            {isAr ? 'الوصف المقتضب (Meta Description)' : 'Meta Description'}
          </label>
          <span
            className={`text-[11px] font-mono ${
              seoDesc.length > descLimit ? 'text-amber-600 font-semibold' : 'text-[#71717a]'
            }`}
          >
            {seoDesc.length} / {descLimit}
          </span>
        </div>
        <textarea
          rows={3}
          value={seoDesc}
          onChange={(e) => setSeoDesc(e.target.value)}
          placeholder={isAr ? 'ملخص المقال أو الصفحة لجذب النقرات من نتائج البحث...' : 'Concise summary to appear in search engine snippets...'}
          maxLength={200}
          className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#e4e4e7] bg-white text-[#27272a] focus:outline-none focus:border-[#6a5ed9] focus:ring-1 focus:ring-[#6a5ed9]"
        />
      </div>

      {/* Optional Keywords / Canonical */}
      {(setKeywords || setCanonicalUrl || setOgImage) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {setKeywords && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#27272a]">
                {isAr ? 'الكلمات المفتاحية (Keywords)' : 'Focus Keywords'}
              </label>
              <input
                type="text"
                value={keywords || ''}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="software, react, engineering"
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#e4e4e7] bg-white text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
              />
            </div>
          )}
          {setCanonicalUrl && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#27272a]">
                {isAr ? 'الرابط الأساسي (Canonical URL)' : 'Canonical URL'}
              </label>
              <input
                type="url"
                value={canonicalUrl || ''}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://devropix.com/..."
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#e4e4e7] bg-white text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
              />
            </div>
          )}
        </div>
      )}

      {/* Live Google SERP Preview Card */}
      <div className="pt-2">
        <p className="text-[11px] font-semibold text-[#71717a] mb-1.5 flex items-center gap-1.5">
          <Search className="w-3 h-3 text-[#6a5ed9]" />
          <span>{isAr ? 'معاينة النتيجة في جوجل' : 'Google Search Snippet Preview'}</span>
        </p>
        <div className="p-3.5 rounded-xl bg-white border border-[#e4e4e7] space-y-1 text-start">
          <span className="text-[11px] text-[#1bb152] font-mono truncate block">
            https://devropix.com › {seoTitle ? seoTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20) : 'page'}
          </span>
          <h5 className="text-sm font-medium text-[#1a0dab] hover:underline cursor-pointer truncate">
            {seoTitle || (isAr ? 'عنوان الصفحة يظهر هنا' : 'Your Page Title Will Appear Here')}
          </h5>
          <p className="text-xs text-[#545454] line-clamp-2 leading-relaxed">
            {seoDesc || (isAr ? 'وصف الصفحة يظهر هنا في نتائج البحث بطريقة جذابة ومحفزة على النقر...' : 'The page meta description will be displayed here in search engine result pages.')}
          </p>
        </div>
      </div>
    </div>
  );
};
