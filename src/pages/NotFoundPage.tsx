import React from 'react';
import { Language, PageId } from '../types';
import { ArrowLeft, Home, Compass } from 'lucide-react';

interface NotFoundPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ language, onNavigate }) => {
  return (
    <div className="relative w-full min-h-[70vh] flex items-center justify-center pt-32 pb-20 px-4 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-tech-grid opacity-30 mask-radial pointer-events-none" />
      <div className="relative max-w-md w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 sm:p-10 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#6366F1] mx-auto shadow-2xs">
          <Compass className="w-8 h-8" />
        </div>

        <div>
          <span className="text-4xl font-extrabold font-mono text-[#6366F1]">404</span>
          <h1 className="text-2xl font-bold text-[#0B1220] mt-2">
            {language === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
            {language === 'ar'
              ? 'يبدو أن المسار الذي تبحث عنه غير موجود أو تم نقله. يمكنك العودة إلى الصفحة الرئيسية.'
              : 'The requested route does not exist or has been relocated. Return to the home experience.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#6366F1] text-xs font-semibold text-white hover:bg-[#7C3AED] shadow-sm shadow-[#6366F1]/20 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{language === 'ar' ? 'الرئيسية' : 'Back to Home'}</span>
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#475569] hover:text-[#0B1220] hover:border-[#CBD5E1] transition-colors"
          >
            <span>{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
