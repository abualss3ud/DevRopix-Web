import React from 'react';
import { DevRopixLogo } from './DevRopixLogo';
import { Language, PageId } from '../types';
import { translations } from '../translations';
import { 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Music2,
  Github,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  language: Language;
  onNavigate: (page: PageId) => void;
  setLanguage?: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
}) => {
  const t = translations[language];
  const isAr = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about },
    { id: 'blog', label: t.nav.blog },
    { id: 'careers', label: t.footer.careers || (isAr ? 'الوظائف' : 'Careers'), badge: isAr ? 'توظيف' : 'Hiring' },
    { id: 'contact', label: t.nav.contact },
  ];

  const serviceLinks = [
    { title: t.services.webDev?.title || (isAr ? 'تطوير الويب' : 'Web Development') },
    { title: t.services.mobileApp?.title || (isAr ? 'تطبيقات الهواتف' : 'Mobile App Development') },
    { title: t.services.customSoftware?.title || (isAr ? 'البرمجيات المخصصة' : 'Custom Software') },
    { title: t.services.uiux?.title || (isAr ? 'تصميم واجهات وتجربة المستخدم' : 'UI/UX Design') },
    { title: t.services.digitalProduct?.title || (isAr ? 'تطوير المنتجات الرقمية' : 'Digital Product Development') },
    { title: t.services.maintenance?.title || (isAr ? 'الدعم الفني والصيانة' : 'Maintenance & Support') },
  ];

  // Only the 6 requested social platforms: Facebook, Instagram, LinkedIn, X, TikTok, GitHub
  const socialLinks = [
    {
      name: 'Facebook',
      label_ar: 'فيسبوك',
      href: 'https://facebook.com/devropix',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      label_ar: 'انستجرام',
      href: 'https://instagram.com/devropix',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      label_ar: 'لينكدين',
      href: 'https://linkedin.com/company/devropix',
      icon: Linkedin,
    },
    {
      name: 'X (Twitter)',
      label_ar: 'إكس (تويتر سابقاً)',
      href: 'https://x.com/devropix',
      icon: Twitter,
    },
    {
      name: 'TikTok',
      label_ar: 'تيكتوك',
      href: 'https://tiktok.com/@devropix',
      icon: Music2,
    },
    {
      name: 'GitHub',
      label_ar: 'جيت هاب',
      href: 'https://github.com/devropix',
      icon: Github,
    },
  ];

  return (
    <footer
      id="main-footer"
      className="bg-white border-t border-[#e4e4e7] pt-16 pb-10 text-[#27272a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: 12-column responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#e4e4e7] text-start">
          {/* Col 1: Brand, Description & Socials (4 columns on lg) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5">
            <button
              onClick={() => {
                onNavigate('home');
                scrollToTop();
              }}
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] rounded-lg p-0.5 text-start cursor-pointer group"
              aria-label="DevRopix Home"
            >
              <DevRopixLogo size="lg" isLight={false} />
            </button>

            <p className="text-xs sm:text-sm text-[#71717a] max-w-sm leading-relaxed font-normal">
              {t.footer.desc}
            </p>

            {/* Social Network Channels: Facebook, Instagram, LinkedIn, X, TikTok, GitHub */}
            <div className="pt-2">
              <span className="block text-[11px] font-semibold text-[#71717a] mb-2.5">
                {isAr ? 'منصات التواصل الاجتماعي' : 'Connect With Us'}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center text-[#71717a] hover:text-[#6a5ed9] hover:border-[#6a5ed9]/40 hover:bg-white transition-all shadow-2xs"
                      aria-label={social.name}
                      title={isAr ? social.label_ar : social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 2: Navigation / Company (2 columns on lg) */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-4">
            <h3 className={`text-xs font-bold text-[#27272a] ${isAr ? 'font-sans' : 'font-mono uppercase tracking-wider'}`}>
              {t.footer.company}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      scrollToTop();
                    }}
                    className="group inline-flex items-center gap-2 text-[#71717a] hover:text-[#6a5ed9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] rounded py-0.5 cursor-pointer text-start w-full font-medium"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Sparkles className="w-2.5 h-2.5" />
                        {link.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Core Capabilities / Services (3 columns on lg) */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-4">
            <h3 className={`text-xs font-bold text-[#27272a] ${isAr ? 'font-sans' : 'font-mono uppercase tracking-wider'}`}>
              {t.footer.services}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {serviceLinks.map((serv, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      onNavigate('services');
                      scrollToTop();
                    }}
                    className="text-[#71717a] hover:text-[#6a5ed9] transition-colors cursor-pointer text-start w-full font-medium"
                  >
                    {serv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Regions (3 columns on lg) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h3 className={`text-xs font-bold text-[#27272a] ${isAr ? 'font-sans' : 'font-mono uppercase tracking-wider'}`}>
              {t.footer.contact}
            </h3>
            <div className="space-y-3.5 text-xs sm:text-sm text-[#71717a]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center text-[#6a5ed9] flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a
                  href={`mailto:${t.contact.emailValue}`}
                  className="hover:text-[#6a5ed9] font-mono transition-colors font-medium text-xs sm:text-sm text-[#27272a]"
                >
                  {t.contact.emailValue}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center text-[#3f71d4] flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium leading-relaxed text-xs sm:text-sm">
                  {t.contact.locationValue}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center text-[#1bb152] flex-shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium leading-relaxed text-xs">
                  {t.contact.hoursValue}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Scroll to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#71717a] font-medium">
          <div>
            © {new Date().getFullYear()} DevRopix. {t.footer.rights}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <button
              onClick={() => {
                onNavigate('privacy');
                scrollToTop();
              }}
              className="hover:text-[#6a5ed9] transition-colors cursor-pointer"
            >
              {t.footer.privacy}
            </button>
            <button
              onClick={() => {
                onNavigate('terms');
                scrollToTop();
              }}
              className="hover:text-[#6a5ed9] transition-colors cursor-pointer"
            >
              {t.footer.terms}
            </button>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[#71717a] hover:text-[#27272a] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
              aria-label={isAr ? 'العودة للأعلى' : 'Back to top'}
              title={isAr ? 'العودة للأعلى' : 'Back to top'}
            >
              <span>{isAr ? 'للأعلى' : 'Top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
