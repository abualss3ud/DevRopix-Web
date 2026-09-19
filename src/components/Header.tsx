import React, { useState, useEffect } from 'react';
import { DevRopixLogo } from './DevRopixLogo';
import { Language, PageId } from '../types';
import { translations } from '../translations';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenContactModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  language,
  setLanguage,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about },
    { id: 'blog', label: t.nav.blog },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#e4e4e7] shadow-sm py-2.5 sm:py-3'
          : 'bg-[#fafafa]/85 backdrop-blur-xs border-b border-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="header-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] rounded-lg p-1 text-start cursor-pointer group"
            aria-label="DevRopix Home"
          >
            <DevRopixLogo size="md" isLight={false} />
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9] ${
                    isActive
                      ? 'text-[#27272a] bg-[#f4f4f5]'
                      : 'text-[#71717a] hover:text-[#27272a] hover:bg-[#f4f4f5]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#6a5ed9] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language Switcher & Iris CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              id="language-switcher-btn"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#e4e4e7] bg-[#f4f4f5] text-[#27272a] hover:bg-[#e4e4e7] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9]"
              aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
            >
              <Globe className="w-3.5 h-3.5 text-[#6a5ed9]" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Primary Iris CTA Button */}
            <button
              id="header-cta-btn"
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl bg-[#6a5ed9] text-white shadow-xs hover:bg-[#584dc7] active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9]"
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>

          {/* Mobile Menu Trigger & Quick Lang Switch */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-language-btn"
              onClick={toggleLanguage}
              className="min-h-[40px] min-w-[40px] px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#e4e4e7] bg-[#f4f4f5] text-[#27272a] active:bg-[#e4e4e7] transition-colors flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9]"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'عربي' : 'EN'}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-h-[40px] min-w-[40px] p-2 rounded-lg border border-[#e4e4e7] bg-[#f4f4f5] text-[#27272a] hover:bg-[#e4e4e7] active:scale-95 transition-all flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5ed9]"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden border-b border-[#e4e4e7] bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <nav className="flex flex-col gap-1.5 mb-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full min-h-[44px] px-4 py-3 rounded-xl text-base font-medium transition-colors text-start cursor-pointer ${
                    isActive
                      ? 'bg-[#f4f4f5] text-[#6a5ed9] font-semibold ltr:border-l-4 rtl:border-r-4 border-[#6a5ed9]'
                      : 'text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#27272a]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#6a5ed9]" />}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#e4e4e7] flex flex-col gap-3">
            <button
              id="mobile-drawer-cta-btn"
              onClick={() => handleNavClick('contact')}
              className="flex items-center justify-center gap-2 w-full min-h-[44px] py-3 px-4 rounded-xl bg-[#6a5ed9] text-white font-medium text-center hover:bg-[#584dc7] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
            </button>
            <div className="flex items-center justify-between text-xs text-[#71717a] px-2 py-1">
              <span>{language === 'en' ? 'Language: English' : 'اللغة: العربية'}</span>
              <button
                onClick={toggleLanguage}
                className="text-[#6a5ed9] font-medium underline underline-offset-4 py-1 cursor-pointer"
              >
                {language === 'en' ? 'تغيير إلى العربية' : 'Switch to English'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
