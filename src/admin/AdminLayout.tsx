import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminServices } from './pages/AdminServices';
import { AdminProjects } from './pages/AdminProjects';
import { AdminProjectCategories } from './pages/AdminProjectCategories';
import { AdminBlog } from './pages/AdminBlog';
import { AdminBlogCategories } from './pages/AdminBlogCategories';
import { AdminTestimonials } from './pages/AdminTestimonials';
import { AdminClients } from './pages/AdminClients';
import { AdminMessages } from './pages/AdminMessages';
import { AdminMedia } from './pages/AdminMedia';
import { AdminHomepage } from './pages/AdminHomepage';
import { AdminSettings } from './pages/AdminSettings';
import { AdminProfile } from './pages/AdminProfile';
import { authService, AdminUser } from '../services/authService';

interface AdminLayoutProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  onExitAdmin: () => void;
  currentUser: AdminUser;
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  language,
  setLanguage,
  onExitAdmin,
  currentUser,
  onLogout,
}) => {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [highlightItemId, setHighlightItemId] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync keyboard shortcut for global search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: string, itemId?: string) => {
    setCurrentPage(page);
    setHighlightItemId(itemId);
    setIsSidebarOpen(false); // Close mobile drawer on navigation
  };

  const isAr = language === 'ar';

  return (
    <div
      id="admin-root-layout"
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#f4f4f5] text-[#27272a] font-sans antialiased flex flex-col"
    >
      {/* 
        This wrapper is forced to dir="rtl" to layout the sidebar on the right and content on the left.
        Then, the sidebar and content are individually set back to the active language dir.
      */}
      <div className="flex flex-1 relative overflow-hidden" dir="rtl">
        {/* Mobile Sidebar Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-30 lg:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Navigation Sidebar */}
        <AdminSidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          language={language}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onExitAdmin={onExitAdmin}
        />

        {/* Main Content Area */}
        <div
          dir={isAr ? 'rtl' : 'ltr'}
          className="flex-1 flex flex-col min-w-0 transition-all duration-200"
        >
          {/* Top Header */}
          <AdminHeader
            language={language}
            setLanguage={setLanguage}
            currentPage={currentPage}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onNavigate={handleNavigate}
            onExitAdmin={onExitAdmin}
            currentUser={currentUser}
            onLogout={onLogout}
          />

          {/* Dynamic Content Views */}
          <main className="flex-1 overflow-y-auto pb-12">
            {currentPage === 'dashboard' && (
              <AdminDashboard
                language={language}
                onNavigateSection={handleNavigate}
              />
            )}
            {currentPage === 'services' && (
              <AdminServices language={language} highlightId={highlightItemId} />
            )}
            {currentPage === 'projects' && (
              <AdminProjects language={language} highlightId={highlightItemId} />
            )}
            {currentPage === 'project-categories' && (
              <AdminProjectCategories language={language} />
            )}
            {currentPage === 'blog' && (
              <AdminBlog language={language} highlightId={highlightItemId} />
            )}
            {currentPage === 'blog-categories' && (
              <AdminBlogCategories language={language} />
            )}
            {currentPage === 'testimonials' && (
              <AdminTestimonials language={language} highlightId={highlightItemId} />
            )}
            {currentPage === 'clients' && (
              <AdminClients language={language} highlightId={highlightItemId} />
            )}
            {currentPage === 'messages' && (
              <AdminMessages language={language} highlightId={highlightItemId} />
            )}
            {currentPage === 'media' && <AdminMedia language={language} />}
            {currentPage === 'homepage' && <AdminHomepage language={language} />}
            {currentPage === 'settings' && <AdminSettings language={language} />}
            {currentPage === 'profile' && <AdminProfile language={language} />}
          </main>
        </div>
      </div>

      {/* Global Quick Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        language={language}
        onNavigate={handleNavigate}
      />
    </div>
  );
};
