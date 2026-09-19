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
  // Modern, refined SaaS navbar proportions
  const defaultHeights = {
    sm: 'h-5 max-h-5',
    md: 'h-6 sm:h-7 max-h-7',
    lg: 'h-8 sm:h-9 max-h-9',
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

  // Full Vector Logo & Wordmark (Zero external HTTP requests, guaranteed 100% load everywhere)
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        id="devropix-logo-full"
        viewBox="0 0 540 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${defaultHeights} w-auto object-contain block transition-transform duration-200 group-hover:opacity-90 ${imgClassName}`}
        aria-label="DevRopix"
      >
        <defs>
          <linearGradient id="full-d-grad" x1="0%" y1="30%" x2="85%" y2="70%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="25%" stopColor="#4F46E5" />
            <stop offset="55%" stopColor="#6366F1" />
            <stop offset="85%" stopColor={isLight ? '#E0E7FF' : '#1E1B4B'} />
            <stop offset="100%" stopColor={isLight ? '#FFFFFF' : '#0B1220'} />
          </linearGradient>
          <linearGradient id="full-x-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="30%" stopColor="#4F46E5" />
            <stop offset="65%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {/* Stylized D with wing */}
        <path
          d="M 4 18 L 74 18 C 102 18 120 34 120 55 C 120 76 102 92 74 92 L 24 92 L 24 82 L 44 62 L 44 72 L 72 72 C 86 72 96 65 96 55 C 96 45 86 38 72 38 L 44 38 L 44 50 L 24 70 L 24 38 L 4 18 Z"
          fill="url(#full-d-grad)"
        />

        {/* Wordmark typography */}
        <text
          x="130"
          y="91"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontSize="74"
          fontWeight="800"
          letterSpacing="-0.025em"
          fill={isLight ? '#FFFFFF' : '#0B1220'}
        >
          evropi
        </text>

        {/* Stylized X */}
        <polygon
          points="444,40 461,40 500,92 483,92"
          fill={isLight ? '#FFFFFF' : '#0B1220'}
        />
        <polygon
          points="444,92 461,92 500,40 483,40"
          fill="url(#full-x-grad)"
        />
      </svg>
    </div>
  );
};
