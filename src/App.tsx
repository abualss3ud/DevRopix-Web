/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, PageId, ProjectItem, ServiceItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ServiceModal } from './components/ServiceModal';
import { ProjectModal } from './components/ProjectModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { ToastProvider } from './admin/context/ToastContext';
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/components/AdminLogin';
import { authService, AdminUser } from './services/authService';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(
    authService.getCurrentUser()
  );

  // Synchronize HTML attributes for RTL/LTR & language
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  // Synchronize dynamic Page Titles for SEO & UX
  useEffect(() => {
    const pageTitles: Record<PageId, { en: string; ar: string }> = {
      home: {
        en: 'DevRopix – Modern Software Engineering & Digital Products',
        ar: 'ديف روبيكس – هندسة البرمجيات وتطوير المنتجات الرقمية',
      },
      services: {
        en: 'Services & Capabilities – DevRopix',
        ar: 'خدماتنا وقدراتنا البرمجية – ديف روبيكس',
      },
      projects: {
        en: 'Selected Work & Case Studies – DevRopix',
        ar: 'أعمالنا ودراسات الحالة – ديف روبيكس',
      },
      about: {
        en: 'About DevRopix – Technology Partner',
        ar: 'من نحن – ديف روبيكس',
      },
      blog: {
        en: 'Insights & Technology Architecture – DevRopix',
        ar: 'المدونة والرؤى الهندسية – ديف روبيكس',
      },
      contact: {
        en: 'Start a Project – Contact DevRopix',
        ar: 'ابدأ مشروعك – تواصل مع ديف روبيكس',
      },
      privacy: {
        en: 'Privacy Policy – DevRopix',
        ar: 'سياسة الخصوصية – ديف روبيكس',
      },
      terms: {
        en: 'Terms & Conditions – DevRopix',
        ar: 'الشروط والأحكام – ديف روبيكس',
      },
      admin: {
        en: 'DevRopix Admin Dashboard – Control Center',
        ar: 'لوحة تحكم ديف روبيكس – مركز الإدارة',
      },
    };

    if (pageTitles[currentPage]) {
      document.title = pageTitles[currentPage][language];
    }
  }, [currentPage, language]);

  // Handle URL hash changes for browser history & direct link navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'services',
        'projects',
        'about',
        'blog',
        'contact',
        'privacy',
        'terms',
        'admin',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    navigateTo('contact');
  };

  const handleOpenBlogPost = (postId: string) => {
    setSelectedBlogPostId(postId);
    navigateTo('blog');
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentAdminUser(user);
    navigateTo('admin');
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentAdminUser(null);
    navigateTo('home');
  };

  return (
    <ToastProvider>
      {/* ADMIN PORTAL VIEW */}
      {currentPage === 'admin' ? (
        currentAdminUser ? (
          <AdminLayout
            language={language}
            setLanguage={setLanguage}
            onExitAdmin={() => navigateTo('home')}
            currentUser={currentAdminUser}
            onLogout={handleLogout}
          />
        ) : (
          <AdminLogin
            language={language}
            onLoginSuccess={handleLoginSuccess}
            onBackToSite={() => navigateTo('home')}
          />
        )
      ) : (
        /* PUBLIC SITE VIEW */
        <div
          id="devropix-app-root"
          className="min-h-screen bg-white text-[#0B1220] flex flex-col justify-between selection:bg-[#6a5ed9]/20 selection:text-[#0B1220]"
        >
          {/* Global Sticky Header */}
          <Header
            currentPage={currentPage}
            setCurrentPage={navigateTo}
            language={language}
            setLanguage={setLanguage}
          />

          {/* Main View Router */}
          <main className="flex-1 w-full">
            {currentPage === 'home' && (
              <HomePage
                language={language}
                onNavigate={navigateTo}
                onOpenServiceModal={(service) => setActiveServiceModal(service)}
                onOpenProjectModal={(project) => setActiveProjectModal(project)}
                onOpenBlogPost={handleOpenBlogPost}
              />
            )}

            {currentPage === 'services' && (
              <ServicesPage
                language={language}
                onNavigate={navigateTo}
                onSelectServiceForContact={handleSelectServiceForContact}
                onOpenServiceModal={(service) => setActiveServiceModal(service)}
              />
            )}

            {currentPage === 'projects' && (
              <ProjectsPage
                language={language}
                onNavigate={navigateTo}
                onOpenProjectModal={(project) => setActiveProjectModal(project)}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage language={language} onNavigate={navigateTo} />
            )}

            {currentPage === 'blog' && (
              <BlogPage
                language={language}
                onNavigate={navigateTo}
                selectedPostId={selectedBlogPostId}
                setSelectedPostId={setSelectedBlogPostId}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage
                language={language}
                onNavigate={navigateTo}
                preselectedService={preselectedService}
              />
            )}

            {(currentPage === 'privacy' || currentPage === 'terms') && (
              <LegalPage
                type={currentPage}
                language={language}
                onNavigate={navigateTo}
              />
            )}
          </main>

          {/* Global Multi-Column Footer */}
          <Footer
            language={language}
            onNavigate={navigateTo}
            setLanguage={setLanguage}
          />

          {/* Service Detail Modal */}
          {activeServiceModal && (
            <ServiceModal
              service={activeServiceModal}
              onClose={() => setActiveServiceModal(null)}
              language={language}
              onSelectServiceForContact={handleSelectServiceForContact}
            />
          )}

          {/* Project Case Study Modal */}
          {activeProjectModal && (
            <ProjectModal
              project={activeProjectModal}
              onClose={() => setActiveProjectModal(null)}
              language={language}
              onStartProjectClick={() => {
                setPreselectedService(activeProjectModal.category);
                navigateTo('contact');
              }}
            />
          )}
        </div>
      )}
    </ToastProvider>
  );
}
