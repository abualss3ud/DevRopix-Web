import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Globe,
  Bell,
  Plus,
  ExternalLink,
  User,
  LogOut,
  Settings,
  ChevronDown,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { AdminSection, AdminUser } from '../../types';
import { cmsStore } from '../../services/cmsStore';

interface AdminHeaderProps {
  currentSection?: AdminSection | string;
  currentPage?: string;
  onSelectSection?: (section: AdminSection) => void;
  onNavigate?: (section: string, itemId?: string) => void;
  onOpenSearch?: () => void;
  onOpenNewModal?: (type: 'project' | 'service' | 'blog') => void;
  onToggleMobileSidebar?: () => void;
  onToggleSidebar?: () => void;
  onExitAdmin?: () => void;
  user?: AdminUser | null;
  currentUser?: AdminUser | null;
  onLogout?: () => void;
  language?: 'en' | 'ar';
  setLanguage?: (lang: 'en' | 'ar') => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = (props) => {
  const language = props.language || 'en';
  const isAr = language === 'ar';
  const setLanguage = props.setLanguage || (() => {});
  const onOpenSearch = props.onOpenSearch || (() => {});
  const onExitAdmin = props.onExitAdmin || (() => {});
  const onLogout = props.onLogout || (() => {});
  const user = props.user || props.currentUser || null;
  const currentSection = (props.currentSection || props.currentPage || 'dashboard') as AdminSection;
  const onOpenNewModal = props.onOpenNewModal;

  const handleSelectSection = (sec: AdminSection) => {
    if (typeof props.onSelectSection === 'function') {
      props.onSelectSection(sec);
    } else if (typeof props.onNavigate === 'function') {
      props.onNavigate(sec);
    }
  };

  const handleToggleMobileSidebar = () => {
    if (typeof props.onToggleMobileSidebar === 'function') {
      props.onToggleMobileSidebar();
    } else if (typeof props.onToggleSidebar === 'function') {
      props.onToggleSidebar();
    }
  };
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadMessages = cmsStore.getMessages().filter((m) => m.status === 'unread');
  const recentActivities = cmsStore.getActivityLogs().slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sectionTitles: Record<AdminSection, { en: string; ar: string; desc_en: string; desc_ar: string }> = {
    dashboard: {
      en: 'Dashboard Overview',
      ar: 'نظرة عامة على لوحة التحكم',
      desc_en: 'Real-time site metrics, activity feed, and content distribution',
      desc_ar: 'إحصائيات الموقع في الوقت الفعلي وسجل النشاطات وتوزيع المحتوى',
    },
    services: {
      en: 'Services Management',
      ar: 'إدارة الخدمات البرمجية',
      desc_en: 'Create, modify, and publish engineering services and deliverables',
      desc_ar: 'إضافة وتعديل ونشر الخدمات البرمجية ومخرجاتها الهندسية',
    },
    projects: {
      en: 'Projects & Portfolio',
      ar: 'المشاريع ودراسات الحالة',
      desc_en: 'Manage client case studies, gallery assets, and SEO metadata',
      desc_ar: 'إدارة سابقة الأعمال ودراسات الحالة ومعرض الصور وبيانات SEO',
    },
    'project-categories': {
      en: 'Project Categories',
      ar: 'تصنيفات المشاريع',
      desc_en: 'Organize portfolio projects into structured service groups',
      desc_ar: 'تنظيم وتصنيف المشاريع البرمجية حسب القطاعات والمجالات',
    },
    blog: {
      en: 'Blog Articles & CMS',
      ar: 'إدارة مقالات المدونة',
      desc_en: 'Write and publish technical engineering insights and articles',
      desc_ar: 'كتابة ونشر المقالات التقنية والرؤى الهندسية',
    },
    'blog-categories': {
      en: 'Blog Categories',
      ar: 'تصنيفات المدونة',
      desc_en: 'Manage blog topic categories and taxonomies',
      desc_ar: 'إدارة أقسام وتصنيفات مواضيع المدونة',
    },
    testimonials: {
      en: 'Client Testimonials',
      ar: 'آراء وتقييمات العملاء',
      desc_en: 'Manage executive quotes, ratings, and client endorsements',
      desc_ar: 'إدارة تقييمات الشركاء والعملاء وآرائهم في المشاريع',
    },
    clients: {
      en: 'Clients & Partners',
      ar: 'الشركاء والعملاء',
      desc_en: 'Manage company brand logos in the Trusted By section',
      desc_ar: 'إدارة شعارات وشركاء النجاح الظاهرين في الصفحة الرئيسية',
    },
    messages: {
      en: 'Contact Messages & Inquiries',
      ar: 'صندوق رسائل واستفسارات التواصل',
      desc_en: 'Review and manage project requests and leads from the contact form',
      desc_ar: 'مراجعة ومتابعة طلبات المشاريع والعملاء الواردة من الموقع',
    },
    media: {
      en: 'Media Assets Library',
      ar: 'مكتبة الوسائط والملفات',
      desc_en: 'Upload, organize, and copy URLs of website images and assets',
      desc_ar: 'رفع وإدارة ونسخ روابط الصور والملفات الخاصة بالموقع',
    },
    homepage: {
      en: 'Homepage CMS Editor',
      ar: 'محرر محتوى الصفحة الرئيسية',
      desc_en: 'Customize Hero text, CTA banners, stats, and process steps',
      desc_ar: 'تخصيص نصوص قسم الهيرو، والإحصائيات، وخطوات العمل، والـ CTA',
    },
    settings: {
      en: 'Global Site Settings',
      ar: 'الإعدادات العامة للموقع',
      desc_en: 'Manage company information, social links, and SEO defaults',
      desc_ar: 'إدارة بيانات الشركة، وروابط التواصل الاجتماعي، وإعدادات SEO',
    },
    profile: {
      en: 'Admin Profile & Security',
      ar: 'الملف الشخصي والأمان',
      desc_en: 'Update admin credentials, email, avatar, and password',
      desc_ar: 'تحديث بيانات الدخول، والبريد الإلكتروني، وكلمة المرور',
    },
  };

  const currentInfo = sectionTitles[currentSection] || {
    en: 'Admin Panel',
    ar: 'لوحة التحكم',
    desc_en: 'DevRopix CMS',
    desc_ar: 'نظام إدارة المحتوى',
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ar' : 'en';
    setLanguage(nextLang);
    document.documentElement.setAttribute('lang', nextLang);
    document.documentElement.setAttribute('dir', nextLang === 'ar' ? 'rtl' : 'ltr');
  };

  return (
    <header
      id="admin-topbar"
      className="sticky top-0 z-20 h-16 bg-white border-b border-[#e4e4e7] px-4 sm:px-6 flex items-center justify-between shadow-xs select-none"
    >
      {/* Left: Mobile Trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#27272a] transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="text-start">
          <div className="flex items-center gap-1.5 text-[11px] text-[#71717a]">
            <span>{isAr ? 'لوحة التحكم' : 'Admin'}</span>
            <span>/</span>
            <span className="font-semibold text-[#6a5ed9]">
              {isAr ? currentInfo.ar : currentInfo.en}
            </span>
          </div>
          <h1 className="text-sm sm:text-base font-bold text-[#27272a] leading-tight truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {isAr ? currentInfo.ar : currentInfo.en}
          </h1>
        </div>
      </div>

      {/* Right: Actions, Search, Notifications, Language, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Button */}
        <button
          id="admin-global-search-btn"
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] hover:bg-[#f4f4f5] text-xs text-[#71717a] hover:text-[#27272a] transition-all cursor-pointer shadow-2xs"
          title="Search anything (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-[#6a5ed9]" />
          <span className="hidden sm:inline">
            {isAr ? 'بحث سريع...' : 'Quick search...'}
          </span>
          <kbd className="hidden md:inline-block text-[10px] font-mono text-[#a1a1aa] bg-white px-1.5 py-0.5 rounded border border-[#e4e4e7]">
            ⌘K
          </kbd>
        </button>

        {/* Quick Action Add (Dropdown/Shortcut) */}
        {onOpenNewModal && (
          <div className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => onOpenNewModal('project')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[#6a5ed9]/10 text-[#6a5ed9] hover:bg-[#6a5ed9]/20 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAr ? 'مشروع جديد' : 'New Project'}</span>
            </button>
          </div>
        )}

        {/* Live Website Preview Button */}
        <button
          onClick={onExitAdmin}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e4e4e7] bg-white text-xs font-medium text-[#27272a] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
          title={isAr ? 'معاينة الموقع الحقيقي' : 'Preview Live Website'}
        >
          <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isAr ? 'الموقع' : 'Live Site'}</span>
        </button>

        {/* Language Switcher */}
        <button
          id="admin-lang-toggle-btn"
          onClick={toggleLanguage}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] hover:bg-[#e4e4e7] transition-colors cursor-pointer"
          title={isAr ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}
        >
          <Globe className="w-3.5 h-3.5 text-[#6a5ed9]" />
          <span>{language === 'en' ? 'العربية' : 'EN'}</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            id="admin-notifications-btn"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-lg border border-[#e4e4e7] bg-white text-[#71717a] hover:text-[#27272a] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadMessages.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#6a5ed9] text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadMessages.length}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div
              className={`absolute top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-[#e4e4e7] shadow-2xl p-4 space-y-3 z-50 text-start animate-in fade-in-50 zoom-in-95 duration-150 ${
                isAr ? 'left-0' : 'right-0'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-2.5">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#6a5ed9]" />
                  <h4 className="text-xs font-bold text-[#27272a]">
                    {isAr ? 'التنبيهات والرسائل الواردة' : 'Notifications & Activity'}
                  </h4>
                </div>
                <span className="text-[10px] font-semibold text-[#6a5ed9] bg-[#6a5ed9]/10 px-2 py-0.5 rounded-full">
                  {unreadMessages.length} {isAr ? 'جديدة' : 'unread'}
                </span>
              </div>

              {/* Messages preview */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {unreadMessages.length > 0 ? (
                  unreadMessages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => {
                        handleSelectSection('messages');
                        setIsNotificationsOpen(false);
                      }}
                      className="p-2.5 rounded-xl bg-[#fafafa] hover:bg-[#f4f4f5] border border-[#e4e4e7] transition-colors cursor-pointer text-start space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[#27272a] truncate">{msg.name}</p>
                        <span className="text-[10px] text-[#71717a]">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#52525b] truncate">{msg.service}</p>
                      <p className="text-[11px] text-[#71717a] line-clamp-1">{msg.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-xs text-[#71717a] flex flex-col items-center gap-1">
                    <CheckCircle2 className="w-6 h-6 text-[#1bb152]" />
                    <span>{isAr ? 'جميع الرسائل مقروءة' : 'All messages are read'}</span>
                  </div>
                )}
              </div>

              {/* Recent System Activity */}
              <div className="pt-2 border-t border-[#e4e4e7]">
                <p className="text-[10px] font-bold text-[#71717a] uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#6a5ed9]" />
                  <span>{isAr ? 'آخر النشاطات' : 'Recent Activity'}</span>
                </p>
                <div className="space-y-1.5">
                  {recentActivities.slice(0, 3).map((act) => (
                    <div key={act.id} className="text-[11px] flex items-center justify-between text-[#52525b]">
                      <span className="truncate">
                        <strong className="text-[#27272a]">{act.action}</strong>: {act.entityTitle}
                      </span>
                      <span className="text-[10px] text-[#a1a1aa] shrink-0">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            id="admin-profile-menu-btn"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] transition-colors cursor-pointer"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt="Admin"
              className="w-6 h-6 rounded-lg object-cover border border-[#e4e4e7]"
            />
            <span className="hidden sm:inline text-xs font-semibold text-[#27272a] truncate max-w-[90px]">
              {user?.name || 'Admin'}
            </span>
            <ChevronDown className="w-3 h-3 text-[#71717a]" />
          </button>

          {isProfileOpen && (
            <div
              className={`absolute top-full mt-2 w-56 bg-white rounded-2xl border border-[#e4e4e7] shadow-2xl p-2 z-50 text-start animate-in fade-in-50 zoom-in-95 duration-150 ${
                isAr ? 'left-0' : 'right-0'
              }`}
            >
              <div className="p-2 border-b border-[#e4e4e7] mb-1">
                <p className="text-xs font-bold text-[#27272a] truncate">{user?.name || 'DevRopix Admin'}</p>
                <p className="text-[11px] text-[#71717a] truncate">{user?.email || 'admin@devropix.com'}</p>
                <span className="inline-block mt-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-50 text-[#6a5ed9] font-semibold border border-purple-200">
                  {user?.role || 'superadmin'}
                </span>
              </div>

              <button
                onClick={() => {
                  handleSelectSection('profile');
                  setIsProfileOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#27272a] hover:bg-[#f4f4f5] rounded-xl transition-colors text-start cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#71717a]" />
                <span>{isAr ? 'تعديل الملف الشخصي' : 'Account Profile'}</span>
              </button>

              <button
                onClick={() => {
                  handleSelectSection('settings');
                  setIsProfileOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#27272a] hover:bg-[#f4f4f5] rounded-xl transition-colors text-start cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-[#71717a]" />
                <span>{isAr ? 'إعدادات الموقع' : 'Site Settings'}</span>
              </button>

              <div className="border-t border-[#e4e4e7] my-1" />

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors text-start cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
