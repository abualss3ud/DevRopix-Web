import React, { useState, useEffect } from 'react';
import {
  LayoutTemplate,
  Save,
  Sparkles,
  Layers,
  TrendingUp,
  Workflow,
  Megaphone,
  CheckCircle2,
  Undo2,
} from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';
import { HomepageContent } from '../../types';
import { useToast } from '../context/ToastContext';

interface AdminHomepageProps {
  language: 'en' | 'ar';
}

export const AdminHomepage: React.FC<AdminHomepageProps> = ({ language }) => {
  const isAr = language === 'ar';
  const { showToast } = useToast();
  const [, setTick] = useState(0);

  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'process' | 'cta'>('hero');
  const [content, setContent] = useState<HomepageContent>(cmsStore.getHomepage());

  useEffect(() => {
    return cmsStore.subscribe(() => {
      setTick((t) => t + 1);
      setContent(cmsStore.getHomepage());
    });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.updateHomepage(content);
    showToast(
      isAr ? 'تم حفظ وتحديث محتوى الصفحة الرئيسية فوراً' : 'Homepage content saved and updated live',
      'success'
    );
  };

  const handleResetToDefault = () => {
    const current = cmsStore.getHomepage();
    setContent(current);
    showToast(isAr ? 'تمت إعادة ضبط التعديلات غير المحفوظة' : 'Reverted unsaved changes', 'info');
  };

  return (
    <div id="admin-homepage-cms" className="p-4 sm:p-6 lg:p-8 space-y-6 text-start max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#27272a]">
            {isAr ? 'محرر محتوى الصفحة الرئيسية (Homepage CMS)' : 'Homepage CMS Content Editor'}
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            {isAr
              ? 'تحكم فوري في نصوص الهيرو، الإحصائيات، خطوات العمل وقسم الـ CTA'
              : 'Customize Hero headlines, metrics, workflow stages, and conversion banners in real time'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#e4e4e7] bg-white text-xs font-medium text-[#71717a] hover:text-[#27272a] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'إعادة ضبط' : 'Reset'}</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-xs active:scale-98 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isAr ? 'حفظ ونشر التغييرات' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e4e4e7] gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-[1px] flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'hero'
              ? 'border-[#6a5ed9] text-[#6a5ed9]'
              : 'border-transparent text-[#71717a] hover:text-[#27272a]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAr ? 'قسم الهيرو (Hero Banner)' : 'Hero Section'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-[1px] flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'stats'
              ? 'border-[#6a5ed9] text-[#6a5ed9]'
              : 'border-transparent text-[#71717a] hover:text-[#27272a]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{isAr ? 'الأرقام والإحصائيات (Stats)' : 'Impact Numbers'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('process')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-[1px] flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'process'
              ? 'border-[#6a5ed9] text-[#6a5ed9]'
              : 'border-transparent text-[#71717a] hover:text-[#27272a]'
          }`}
        >
          <Workflow className="w-4 h-4" />
          <span>{isAr ? 'منهجية العمل (Workflow)' : 'Engineering Process'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cta')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-[1px] flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'cta'
              ? 'border-[#6a5ed9] text-[#6a5ed9]'
              : 'border-transparent text-[#71717a] hover:text-[#27272a]'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>{isAr ? 'دعوة لاتخاذ إجراء (CTA Banner)' : 'CTA Banner'}</span>
        </button>
      </div>

      {/* Content Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e4e7] space-y-6 animate-in fade-in duration-100 shadow-xs">
            <h3 className="text-sm font-bold text-[#27272a] border-b border-[#e4e4e7] pb-3">
              {isAr ? 'نصوص وعناوين قسم الهيرو' : 'Hero Headlines & Call to Actions'}
            </h3>

            {/* Badge texts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Hero Badge Text (EN)</label>
                <input
                  type="text"
                  value={content.hero.badge_en}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, badge_en: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">شارة الهيرو العلوية (AR)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={content.hero.badge_ar}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, badge_ar: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
            </div>

            {/* Main Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Main Title (EN)</label>
                <input
                  type="text"
                  value={content.hero.title_en}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, title_en: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">العنوان الرئيسي (AR)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={content.hero.title_ar}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, title_ar: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
            </div>

            {/* Subtitles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Subtitle / Paragraph (EN)</label>
                <textarea
                  rows={3}
                  value={content.hero.subtitle_en}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, subtitle_en: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">الوصف والفقرة الفرعية (AR)</label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={content.hero.subtitle_ar}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, subtitle_ar: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#e4e4e7]">
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#6a5ed9]">Primary CTA Button</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Button Text EN"
                    value={content.hero.primaryCtaText_en}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryCtaText_en: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e4e4e7]"
                  />
                  <input
                    type="text"
                    dir="rtl"
                    placeholder="نص الزر بالعربية"
                    value={content.hero.primaryCtaText_ar}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryCtaText_ar: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e4e4e7]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Target Link (e.g. #contact or #services)"
                  value={content.hero.primaryCtaLink}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, primaryCtaLink: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e4e4e7] font-mono"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#52525b]">Secondary CTA Button</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Secondary Button EN"
                    value={content.hero.secondaryCtaText_en}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryCtaText_en: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e4e4e7]"
                  />
                  <input
                    type="text"
                    dir="rtl"
                    placeholder="الزر الثانوي بالعربية"
                    value={content.hero.secondaryCtaText_ar}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryCtaText_ar: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e4e4e7]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Target Link (e.g. #portfolio)"
                  value={content.hero.secondaryCtaLink}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, secondaryCtaLink: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e4e4e7] font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STATS */}
        {activeTab === 'stats' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e4e7] space-y-6 animate-in fade-in duration-100 shadow-xs">
            <h3 className="text-sm font-bold text-[#27272a] border-b border-[#e4e4e7] pb-3">
              {isAr ? 'الأرقام والإحصائيات القياسية' : 'Key Performance Metrics'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[#e4e4e7] bg-[#fafafa] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#6a5ed9]">Stat #{idx + 1}</span>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#27272a]">Value (e.g. 99.9%, 40+, 2.5x)</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...content.stats];
                        updated[idx].value = e.target.value;
                        setContent({ ...content, stats: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e4e4e7] bg-white font-bold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#71717a]">Label (EN)</label>
                      <input
                        type="text"
                        value={stat.label_en}
                        onChange={(e) => {
                          const updated = [...content.stats];
                          updated[idx].label_en = e.target.value;
                          setContent({ ...content, stats: updated });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-[#e4e4e7] bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#71717a]">التسمية (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={stat.label_ar}
                        onChange={(e) => {
                          const updated = [...content.stats];
                          updated[idx].label_ar = e.target.value;
                          setContent({ ...content, stats: updated });
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-[#e4e4e7] bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROCESS */}
        {activeTab === 'process' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e4e7] space-y-6 animate-in fade-in duration-100 shadow-xs">
            <h3 className="text-sm font-bold text-[#27272a] border-b border-[#e4e4e7] pb-3">
              {isAr ? 'مراحل ومنهجية تنفيذ المشاريع' : 'Engineering Workflow Stages'}
            </h3>

            <div className="space-y-4">
              {content.processSteps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[#e4e4e7] bg-[#fafafa] space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#6a5ed9] text-white text-xs font-bold flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <span className="text-xs font-bold text-[#27272a]">Stage {step.stepNumber}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#27272a]">Stage Title (EN)</label>
                      <input
                        type="text"
                        value={step.title_en}
                        onChange={(e) => {
                          const updated = [...content.processSteps];
                          updated[idx].title_en = e.target.value;
                          setContent({ ...content, processSteps: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e4e4e7] bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#27272a]">عنوان المرحلة (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={step.title_ar}
                        onChange={(e) => {
                          const updated = [...content.processSteps];
                          updated[idx].title_ar = e.target.value;
                          setContent({ ...content, processSteps: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e4e4e7] bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#71717a]">Description (EN)</label>
                      <textarea
                        rows={2}
                        value={step.desc_en}
                        onChange={(e) => {
                          const updated = [...content.processSteps];
                          updated[idx].desc_en = e.target.value;
                          setContent({ ...content, processSteps: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e4e4e7] bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#71717a]">الوصف والتفاصيل (AR)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={step.desc_ar}
                        onChange={(e) => {
                          const updated = [...content.processSteps];
                          updated[idx].desc_ar = e.target.value;
                          setContent({ ...content, processSteps: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#e4e4e7] bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CTA BANNER */}
        {activeTab === 'cta' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e4e7] space-y-6 animate-in fade-in duration-100 shadow-xs">
            <h3 className="text-sm font-bold text-[#27272a] border-b border-[#e4e4e7] pb-3">
              {isAr ? 'بانر الدعوة للبدء (CTA Section)' : 'Bottom CTA Conversion Banner'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">CTA Title (EN)</label>
                <input
                  type="text"
                  value={content.ctaBanner.title_en}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      ctaBanner: { ...content.ctaBanner, title_en: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">عنوان الـ CTA (AR)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={content.ctaBanner.title_ar}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      ctaBanner: { ...content.ctaBanner, title_ar: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">CTA Subtitle (EN)</label>
                <textarea
                  rows={2}
                  value={content.ctaBanner.subtitle_en}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      ctaBanner: { ...content.ctaBanner, subtitle_en: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">الوصف الفرعي (AR)</label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={content.ctaBanner.subtitle_ar}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      ctaBanner: { ...content.ctaBanner, subtitle_ar: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Button Text (EN)</label>
                <input
                  type="text"
                  value={content.ctaBanner.buttonText_en}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      ctaBanner: { ...content.ctaBanner, buttonText_en: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">نص الزر (AR)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={content.ctaBanner.buttonText_ar}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      ctaBanner: { ...content.ctaBanner, buttonText_ar: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Link Target</label>
                <input
                  type="text"
                  value={content.ctaBanner.buttonLink}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      ctaBanner: { ...content.ctaBanner, buttonLink: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isAr ? 'حفظ ونشر التغييرات على الرئيسية' : 'Save & Publish Homepage Live'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
