import React from 'react';
import { DevRopixLogo } from './DevRopixLogo';
import { Language, PageId } from '../types';
import { translations } from '../translations';
import { 
  Mail, 
  MapPin, 
  Globe, 
  Lock,
} from 'lucide-react';

interface FooterProps {
  language: Language;
  onNavigate: (page: PageId) => void;
  setLanguage: (lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  setLanguage,
}) => {
  const t = translations[language];

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
  };

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about },
    { id: 'blog', label: t.nav.blog },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <footer
      id="main-footer"
      className="bg-white border-t border-slate-200/80 pt-20 pb-12 text-[#27272a] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-100 text-start">
          {/* Col 1: Brand and Bio (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] rounded-lg p-0.5 text-start cursor-pointer"
              aria-label="DevRopix Home"
            >
              <DevRopixLogo size="md" isLight={false} />
            </button>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed font-normal">
              {t.footer.desc}
            </p>

            {/* Quick Status / Guarantee Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50/50 border border-emerald-100/70 text-xs text-emerald-800 font-mono font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1bb152] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1bb152]"></span>
              </span>
              <span>{language === 'ar' ? 'جميع الخدمات مشمولة بضمانات جودة SLA' : 'Enterprise SLA & Zero-Downtime Guarantee'}</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              {t.footer.company}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-500 hover:text-[#6a5ed9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] rounded py-0.5 cursor-pointer text-start w-full font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Core Capabilities */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              {t.footer.services}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-500 hover:text-[#6a5ed9] transition-colors cursor-pointer text-start w-full font-medium"
                >
                  {t.services.webDev.title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-500 hover:text-[#6a5ed9] transition-colors cursor-pointer text-start w-full font-medium"
                >
                  {t.services.mobileApp.title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-500 hover:text-[#6a5ed9] transition-colors cursor-pointer text-start w-full font-medium"
                >
                  {t.services.customSoftware.title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-500 hover:text-[#6a5ed9] transition-colors cursor-pointer text-start w-full font-medium"
                >
                  {t.services.uiux.title}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              {t.footer.contact}
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6a5ed9]" />
                <a
                  href={`mailto:${t.contact.emailValue}`}
                  className="hover:text-[#6a5ed9] font-mono transition-colors font-medium"
                >
                  {t.contact.emailValue}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#3f71d4] flex-shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{t.contact.locationValue}</span>
              </div>

              {/* Language Switcher in footer */}
              <div className="pt-2">
                <button
                  onClick={toggleLanguage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-[#6a5ed9]" />
                  <span>{language === 'en' ? 'العربية' : 'English'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div>
            © {new Date().getFullYear()} DevRopix. {t.footer.rights}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <button
              onClick={() => {
                onNavigate('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#6a5ed9] transition-colors cursor-pointer"
            >
              {t.footer.privacy}
            </button>
            <button
              onClick={() => {
                onNavigate('terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#6a5ed9] transition-colors cursor-pointer"
            >
              {t.footer.terms}
            </button>
            <button
              id="footer-admin-link"
              onClick={() => {
                onNavigate('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-400 hover:text-[#6a5ed9] transition-all cursor-pointer"
              title="DevRopix Admin Dashboard"
            >
              <Lock className="w-3 h-3" />
              <span className="text-[10px] font-mono font-bold tracking-wider">{language === 'ar' ? 'لوحة التحكم' : 'ADMIN PORTAL'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
