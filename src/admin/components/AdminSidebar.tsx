import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Tags,
  FileText,
  Bookmark,
  Star,
  Users,
  MessageSquare,
  Image as ImageIcon,
  LayoutTemplate,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from 'lucide-react';
import { AdminSection, AdminUser } from '../../types';
import { DevRopixLogo } from '../../components/DevRopixLogo';

interface AdminSidebarProps {
  currentSection?: AdminSection | string;
  currentPage?: string;
  onSelectSection?: (section: AdminSection) => void;
  onNavigate?: (section: string, itemId?: string) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  onToggleCollapse?: () => void;
  unreadMessagesCount?: number;
  user?: AdminUser | null;
  currentUser?: AdminUser | null;
  onLogout?: () => void;
  onExitAdmin?: () => void;
  language?: 'en' | 'ar';
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = (props) => {
  const language = props.language || 'en';
  const isAr = language === 'ar';
  const isOpen = props.isOpen || false;
  const currentSection = props.currentSection || props.currentPage || 'dashboard';
  const [internalCollapsed, setInternalCollapsed] = React.useState(false);
  const isCollapsed = props.isCollapsed !== undefined ? props.isCollapsed : internalCollapsed;
  const unreadMessagesCount = props.unreadMessagesCount || 0;
  const onExitAdmin = props.onExitAdmin || (() => {});
  const user = props.user || props.currentUser || null;
  const onLogout = props.onLogout || (() => {});

  const handleSelectSection = (sec: AdminSection) => {
    if (typeof props.onSelectSection === 'function') {
      props.onSelectSection(sec);
    } else if (typeof props.onNavigate === 'function') {
      props.onNavigate(sec);
    }
  };

  const handleSetCollapsed = (collapsed: boolean) => {
    if (typeof props.setIsCollapsed === 'function') {
      props.setIsCollapsed(collapsed);
    } else if (typeof props.onToggleCollapse === 'function') {
      props.onToggleCollapse();
    } else {
      setInternalCollapsed(collapsed);
    }
  };

  const menuGroups: {
    label_en: string;
    label_ar: string;
    items: {
      id: AdminSection;
      label_en: string;
      label_ar: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: number;
    }[];
  }[] = [
    {
      label_en: 'Overview',
      label_ar: 'نظرة عامة',
      items: [
        {
          id: 'dashboard',
          label_en: 'Dashboard',
          label_ar: 'لوحة التحكم',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label_en: 'Content Management',
      label_ar: 'إدارة المحتوى',
      items: [
        {
          id: 'services',
          label_en: 'Services',
          label_ar: 'الخدمات',
          icon: Briefcase,
        },
        {
          id: 'projects',
          label_en: 'Projects & Portfolio',
          label_ar: 'المشاريع والأعمال',
          icon: FolderKanban,
        },
        {
          id: 'project-categories',
          label_en: 'Project Categories',
          label_ar: 'تصنيفات المشاريع',
          icon: Tags,
        },
        {
          id: 'blog',
          label_en: 'Blog Posts',
          label_ar: 'المقالات والمدونة',
          icon: FileText,
        },
        {
          id: 'blog-categories',
          label_en: 'Blog Categories',
          label_ar: 'تصنيفات المدونة',
          icon: Bookmark,
        },
        {
          id: 'testimonials',
          label_en: 'Testimonials',
          label_ar: 'آراء العملاء',
          icon: Star,
        },
        {
          id: 'clients',
          label_en: 'Clients & Partners',
          label_ar: 'العملاء والشركاء',
          icon: Users,
        },
        {
          id: 'homepage',
          label_en: 'Homepage CMS',
          label_ar: 'محتوى الرئيسية',
          icon: LayoutTemplate,
        },
      ],
    },
    {
      label_en: 'Communication & Assets',
      label_ar: 'التواصل والملفات',
      items: [
        {
          id: 'messages',
          label_en: 'Contact Messages',
          label_ar: 'رسائل التواصل',
          icon: MessageSquare,
          badge: unreadMessagesCount,
        },
        {
          id: 'media',
          label_en: 'Media Library',
          label_ar: 'مكتبة الوسائط',
          icon: ImageIcon,
        },
      ],
    },
    {
      label_en: 'System',
      label_ar: 'النظام',
      items: [
        {
          id: 'settings',
          label_en: 'Global Settings',
          label_ar: 'الإعدادات العامة',
          icon: Settings,
        },
        {
          id: 'profile',
          label_en: 'Admin Profile',
          label_ar: 'الملف الشخصي',
          icon: User,
        },
      ],
    },
  ];

  return (
    <aside
      id="admin-sidebar"
      dir={isAr ? 'rtl' : 'ltr'}
      className={`fixed inset-y-0 right-0 z-40 lg:relative flex flex-col justify-between bg-white text-slate-800 border-l lg:border-r border-[#e4e4e7] transition-all duration-300 select-none ${
        isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full lg:translate-x-0'
      } ${
        isCollapsed ? 'w-20' : 'w-64 sm:w-72 lg:w-64'
      }`}
    >
      {/* Top Brand Header */}
      <div>
        <div className={`h-16 flex items-center border-b border-[#e4e4e7] transition-all duration-300 ${
          isCollapsed ? 'justify-center px-0' : 'justify-between px-4'
        }`}>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <DevRopixLogo size="sm" isLight={false} />
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#6a5ed9]/10 text-[#6a5ed9] border border-[#6a5ed9]/20">
                CMS
              </span>
            </div>
          )}

          <div className="flex items-center gap-1">
            {/* Collapse Toggle Button (Desktop) */}
            <button
              onClick={() => handleSetCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer hidden lg:flex items-center justify-center"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={props.onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer lg:hidden flex items-center justify-center"
              aria-label="Close sidebar"
              title={isAr ? 'إغلاق القائمة' : 'Close menu'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className={`space-y-6 max-h-[calc(100vh-170px)] overflow-y-auto custom-scrollbar transition-all duration-300 ${
          isCollapsed ? 'p-2' : 'p-3'
        }`}>
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {isAr ? group.label_ar : group.label_en}
                </p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentSection === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`sidebar-link-${item.id}`}
                      onClick={() => handleSelectSection(item.id)}
                      className={`w-full flex items-center rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer group relative ${
                        isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-3 py-2.5 text-start'
                      } ${
                        isActive
                          ? 'bg-[#6a5ed9] text-white shadow-md shadow-[#6a5ed9]/20 font-semibold'
                          : 'text-slate-600 hover:text-[#6a5ed9] hover:bg-slate-50'
                      }`}
                      title={isCollapsed ? (isAr ? item.label_ar : item.label_en) : undefined}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#6a5ed9]'
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="flex-1 truncate">
                          {isAr ? item.label_ar : item.label_en}
                        </span>
                      )}
                      {item.badge !== undefined && item.badge > 0 && (
                        isCollapsed ? (
                          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        ) : (
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full shrink-0 ${
                              isActive
                                ? 'bg-white text-[#6a5ed9]'
                                : 'bg-[#6a5ed9] text-white animate-pulse'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions: View Live Site, User Profile & Logout */}
      <div className="p-3 border-t border-[#e4e4e7] space-y-2 bg-[#f9fafb]">
        {/* Quick Link to Public Website */}
        <button
          onClick={onExitAdmin}
          className={`w-full flex items-center rounded-xl text-xs font-medium text-slate-600 hover:text-[#6a5ed9] hover:bg-slate-100 transition-colors cursor-pointer ${
            isCollapsed ? 'justify-center p-3' : 'gap-2 px-3 py-2 text-start'
          }`}
          title={isAr ? 'زيارة الموقع الرئيسي' : 'Visit Live Website'}
        >
          <ExternalLink className="w-4 h-4 text-emerald-500 shrink-0" />
          {!isCollapsed && (
            <span className="truncate">{isAr ? 'زيارة الموقع الرئيسي' : 'Live Website'}</span>
          )}
        </button>

        {/* User Card */}
        <div
          className={`flex items-center rounded-xl border transition-all ${
            isCollapsed 
              ? 'justify-center p-1 bg-transparent border-transparent' 
              : 'gap-3 p-2 bg-slate-100 border-slate-200'
          }`}
        >
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
            alt="Admin"
            className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0 text-start">
              <p className="text-xs font-semibold text-slate-800 truncate">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@devropix.com'}</p>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title={isAr ? 'تسجيل الخروج' : 'Logout'}
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
