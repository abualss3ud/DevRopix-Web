import React, { useState } from 'react';

interface DevRopixLogoProps {
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isLight?: boolean;
  imgClassName?: string;
}

// Official DevRopix logo cropped precisely to the artwork bounding box
const LOGO_CROPPED_URL = 'https://res.cloudinary.com/oe19gniu/image/upload/c_crop,w_6694,h_1208,x_1153,y_3896/f_auto,q_auto/PNG_1';
const LOGO_RAW_URL = 'https://res.cloudinary.com/oe19gniu/image/upload/f_auto,q_auto/PNG_1';

export const DevRopixLogo: React.FC<DevRopixLogoProps> = ({
  showWordmark = true,
  size = 'md',
  className = '',
  isLight = false,
  imgClassName = '',
}) => {
  const [useRawFallback, setUseRawFallback] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Modern, refined SaaS navbar proportions (height 20px-24px, optical balance with 14px-16px text)
  const defaultHeights = {
    sm: 'h-4.5 sm:h-5 max-h-5 max-w-[110px]',
    md: 'h-5 sm:h-[22px] md:h-6 max-h-6 max-w-[130px]',
    lg: 'h-6 sm:h-7 max-h-7 max-w-[150px]',
  }[size];

  if (!showWordmark) {
    // Standalone Stylized 'D' Icon
    return (
      <svg
        id="devropix-icon-mark"
        viewBox="0 0 130 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`flex-shrink-0 ${defaultHeights} w-auto ${className}`}
        aria-label="DevRopix"
      >
        <defs>
          <linearGradient id="icon-dev-d-grad" x1="0%" y1="30%" x2="85%" y2="70%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="25%" stopColor="#4F46E5" />
            <stop offset="55%" stopColor="#6366F1" />
            <stop offset="85%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#0B1220" />
          </linearGradient>
        </defs>
        <path
          d="M 4 18 L 74 18 C 102 18 120 34 120 55 C 120 76 102 92 74 92 L 24 92 L 24 82 L 44 62 L 44 72 L 72 72 C 86 72 96 65 96 55 C 96 45 86 38 72 38 L 44 38 L 44 50 L 24 70 L 24 38 L 4 18 Z"
          fill="url(#icon-dev-d-grad)"
        />
      </svg>
    );
  }

  const currentSrc = !useRawFallback ? LOGO_CROPPED_URL : LOGO_RAW_URL;

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {!imgError ? (
        <img
          id="devropix-logo-img"
          src={currentSrc}
          alt="DevRopix"
          className={`${defaultHeights} w-auto object-contain block transition-transform duration-200 group-hover:opacity-90 ${imgClassName}`}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => {
            if (!useRawFallback) {
              setUseRawFallback(true);
            } else {
              setImgError(true);
            }
          }}
        />
      ) : (
        <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#0B1220] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded bg-[#6366F1]" />
          <span>Dev<span className="text-[#6366F1]">Ropix</span></span>
        </span>
      )}
    </div>
  );
};
