import React from 'react';
import { Language } from '../types';

interface HeroVisualProps {
  language: Language;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] mx-auto flex items-center justify-center select-none py-2">
      {/* Soft Ambient Brand Glow behind the illustration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[360px] h-[300px] bg-gradient-to-tr from-[#6a5ed9]/12 via-[#3f71d4]/08 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Pure Vector Illustration with balanced, elegant size */}
      <img
        src="./data-extraction-amico.svg"
        alt={isAr ? 'رسم توضيحي لأنظمة واستخراج البيانات ديف روبيكس' : 'Data extraction and engineering illustration'}
        referrerPolicy="no-referrer"
        className="relative z-10 w-full h-auto max-h-[320px] sm:max-h-[350px] object-contain drop-shadow-xs transition-transform duration-300 hover:scale-[1.02]"
        loading="eager"
      />
    </div>
  );
};
