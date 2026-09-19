import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { cmsStore } from '../services/cmsStore';

interface WhatsAppButtonProps {
  language: 'en' | 'ar';
}

// Company Official WhatsApp Number (+201110428301)
const OFFICIAL_WHATSAPP_DIGITS = '201110428301';

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ language }) => {
  const [phoneNumber, setPhoneNumber] = useState(OFFICIAL_WHATSAPP_DIGITS);
  const isAr = language === 'ar';

  useEffect(() => {
    const updateNumber = () => {
      const settings = cmsStore.getSettings();
      const raw = settings?.contact?.whatsapp || settings?.general?.whatsapp || OFFICIAL_WHATSAPP_DIGITS;
      const digits = raw.replace(/\D/g, '');
      // If empty or old Saudi placeholder (+966), strictly enforce 201110428301
      if (!digits || digits.startsWith('966') || digits.includes('00000000')) {
        setPhoneNumber(OFFICIAL_WHATSAPP_DIGITS);
      } else {
        setPhoneNumber(digits);
      }
    };

    updateNumber();
    return cmsStore.subscribe(updateNumber);
  }, []);

  const defaultMessage = isAr
    ? 'مرحباً، أود الاستفسار عن خدمات ديف روبيكس لتطوير البرمجيات والحلول الرقمية.'
    : 'Hello, I would like to inquire about DevRopix software and digital solutions.';

  const targetDigits = phoneNumber || OFFICIAL_WHATSAPP_DIGITS;
  const whatsappUrl = `https://wa.me/${targetDigits}?text=${encodeURIComponent(defaultMessage)}`;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // In iframe environments (like AI Studio preview), target="_blank" may sometimes be restricted
    // Calling window.open explicitly ensures the link opens in a new browser tab/app
    try {
      if (window.self !== window.top) {
        e.preventDefault();
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    } catch {
      // In case cross-origin check throws, default anchor navigation proceeds
    }
  };

  return (
    <aside
      id="floating-whatsapp-container"
      aria-label={isAr ? 'زر التواصل عبر واتساب' : 'WhatsApp Contact Button'}
      className={`fixed bottom-6 z-50 flex items-center gap-2 transition-all duration-300 ${
        isAr ? 'left-6' : 'right-6'
      } select-none`}
    >
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLinkClick}
        aria-label={isAr ? 'تواصل معنا مباشرة عبر واتساب: +201110428301' : 'Chat with us directly on WhatsApp: +201110428301'}
        title="+201110428301"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-[#25D366]/35 hover:shadow-xl hover:shadow-[#25D366]/45 active:scale-90 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
      >
        {/* Status indicator badge */}
        <span className="absolute top-1 -right-0.5 sm:top-1.5 sm:right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white border-2 border-[#25D366]"></span>
        </span>

        {/* Lucide Message Icon */}
        <MessageCircle className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />

        {/* Hover Tooltip with Phone Number */}
        <span
          className={`absolute ${
            isAr ? 'left-full ml-2.5' : 'right-full mr-2.5'
          } px-2.5 py-1 text-xs font-semibold text-white bg-[#18181b] rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200`}
        >
          {isAr ? 'واتساب: 01110428301 20+' : 'WhatsApp: +201110428301'}
        </span>
      </a>
    </aside>
  );
};
