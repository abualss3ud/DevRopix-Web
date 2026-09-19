import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  Briefcase,
  FileText,
  MessageSquare,
  Star,
  Users,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from 'recharts';
import { cmsStore } from '../../services/cmsStore';
import { AdminSection } from '../../types';

interface AdminDashboardProps {
  onNavigateSection: (section: AdminSection) => void;
  language: 'en' | 'ar';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateSection,
  language,
}) => {
  const isAr = language === 'ar';
  const [, setTick] = useState(0);

  useEffect(() => {
    return cmsStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  const projects = cmsStore.getProjects();
  const services = cmsStore.getServices();
  const blogPosts = cmsStore.getBlogPosts();
  const messages = cmsStore.getMessages();
  const testimonials = cmsStore.getTestimonials();
  const clients = cmsStore.getClients();
  const activityLogs = cmsStore.getActivityLogs();
  const categories = cmsStore.getProjectCategories();

  // Calculations from real data
  const publishedProjects = projects.filter((p) => p.status === 'published').length;
  const draftProjects = projects.length - publishedProjects;

  const publishedServices = services.filter((s) => s.status === 'published').length;
  const draftServices = services.length - publishedServices;

  const publishedPosts = blogPosts.filter((b) => b.status === 'published').length;
  const draftPosts = blogPosts.length - publishedPosts;

  const unreadMessages = messages.filter((m) => m.status === 'unread').length;

  // Chart Data 1: Projects by Category
  const categoryCounts: Record<string, number> = {};
  projects.forEach((p) => {
    const catName = p.category || 'General';
    categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;
  });

  const projectCategoryData = Object.keys(categoryCounts).map((cat) => ({
    name: cat,
    count: categoryCounts[cat],
  }));

  // Chart Data 2: Published vs Draft distribution
  const statusData = [
    { name: isAr ? 'المشاريع' : 'Projects', published: publishedProjects, draft: draftProjects },
    { name: isAr ? 'الخدمات' : 'Services', published: publishedServices, draft: draftServices },
    { name: isAr ? 'المقالات' : 'Blog Posts', published: publishedPosts, draft: draftPosts },
    { name: isAr ? 'آراء العملاء' : 'Reviews', published: testimonials.filter((t) => t.status === 'published').length, draft: testimonials.filter((t) => t.status === 'draft').length },
  ];

  // Chart Data 3: Content Breakdown Pie
  const pieData = [
    { name: isAr ? 'مشاريع' : 'Projects', value: projects.length, color: '#6a5ed9' },
    { name: isAr ? 'خدمات' : 'Services', value: services.length, color: '#3f71d4' },
    { name: isAr ? 'مقالات' : 'Blog', value: blogPosts.length, color: '#1bb152' },
    { name: isAr ? 'رسائل' : 'Messages', value: messages.length, color: '#e07a5f' },
  ];

  // Stat Cards Config
  const statCards = [
    {
      id: 'projects',
      title: isAr ? 'إجمالي المشاريع' : 'Total Projects',
      value: projects.length,
      subtitle: isAr
        ? `${publishedProjects} منشور • ${draftProjects} مسودة`
        : `${publishedProjects} Published • ${draftProjects} Draft`,
      icon: FolderKanban,
      color: 'bg-indigo-50 text-[#6a5ed9] border-indigo-100',
      section: 'projects' as AdminSection,
    },
    {
      id: 'services',
      title: isAr ? 'الخدمات الهندسية' : 'Total Services',
      value: services.length,
      subtitle: isAr
        ? `${publishedServices} نشطة • ${draftServices} مسودة`
        : `${publishedServices} Active • ${draftServices} Draft`,
      icon: Briefcase,
      color: 'bg-blue-50 text-[#3f71d4] border-blue-100',
      section: 'services' as AdminSection,
    },
    {
      id: 'blog',
      title: isAr ? 'مقالات المدونة' : 'Blog Articles',
      value: blogPosts.length,
      subtitle: isAr
        ? `${publishedPosts} منشور • ${draftPosts} مسودة`
        : `${publishedPosts} Published • ${draftPosts} Draft`,
      icon: FileText,
      color: 'bg-emerald-50 text-[#1bb152] border-emerald-100',
      section: 'blog' as AdminSection,
    },
    {
      id: 'messages',
      title: isAr ? 'رسائل واستفسارات' : 'Contact Messages',
      value: messages.length,
      subtitle: isAr ? `${unreadMessages} غير مقروءة` : `${unreadMessages} Unread Leads`,
      icon: MessageSquare,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      section: 'messages' as AdminSection,
      badge: unreadMessages > 0 ? `${unreadMessages} New` : undefined,
    },
    {
      id: 'testimonials',
      title: isAr ? 'آراء العملاء' : 'Testimonials',
      value: testimonials.length,
      subtitle: isAr ? 'تقييمات موثقة' : 'Verified Reviews',
      icon: Star,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      section: 'testimonials' as AdminSection,
    },
    {
      id: 'clients',
      title: isAr ? 'الشركاء والعملاء' : 'Partner Clients',
      value: clients.length,
      subtitle: isAr ? 'في قسم شركاء النجاح' : 'Trusted By Logos',
      icon: Users,
      color: 'bg-slate-100 text-slate-700 border-slate-200',
      section: 'clients' as AdminSection,
    },
  ];

  return (
    <div id="admin-dashboard-page" className="p-4 sm:p-6 lg:p-8 space-y-8 text-start max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0B1220] via-[#111c30] to-[#1e293b] p-6 sm:p-8 text-white relative overflow-hidden border border-slate-800 shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6a5ed9]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6a5ed9]/20 border border-[#6a5ed9]/40 text-[#a5b4fc] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#a5b4fc]" />
              <span>{isAr ? 'لوحة تحكم ديف روبيكس' : 'DevRopix Production CMS'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {isAr ? 'أهلاً بك في نظام إدارة موقع DevRopix' : 'Welcome to DevRopix Management Center'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isAr
                ? 'تحكم كامل وفوري في جميع محتويات الموقع، الخدمات، سابقة الأعمال، المقالات، والرسائل الواردة.'
                : 'Manage and update your digital product agency website in real time with end-to-end publishing control.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigateSection('projects')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إضافة مشروع' : 'Add Project'}</span>
            </button>
            <button
              onClick={() => onNavigateSection('services')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 active:scale-98 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إضافة خدمة' : 'Add Service'}</span>
            </button>
            <button
              onClick={() => onNavigateSection('homepage')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 active:scale-98 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>{isAr ? 'تعديل الرئيسية' : 'Homepage CMS'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onNavigateSection(card.section)}
              className="p-4 rounded-2xl border border-[#e4e4e7] bg-white hover:border-[#6a5ed9]/50 hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {card.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-100 text-red-600 border border-red-200 animate-pulse">
                    {card.badge}
                  </span>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-[#27272a] group-hover:text-[#6a5ed9] transition-colors">
                  {card.value}
                </p>
                <p className="text-xs font-semibold text-[#52525b] mt-0.5">{card.title}</p>
                <p className="text-[11px] text-[#71717a] mt-1 truncate">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics & Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Published vs Draft Distribution (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-[#e4e4e7] bg-white p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#27272a]">
                {isAr ? 'حالة المحتوى (منشور مقابل مسودة)' : 'Content Status (Published vs. Draft)'}
              </h3>
              <p className="text-xs text-[#71717a]">
                {isAr ? 'توزيع المحتوى النشط والمسودات في قاعدة البيانات' : 'Active vs. draft distribution across collections'}
              </p>
            </div>
            <span className="text-xs font-medium text-[#6a5ed9] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {isAr ? 'بيانات حية' : 'Live State'}
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#71717a' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#71717a' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="published" name={isAr ? 'منشور' : 'Published'} fill="#6a5ed9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="draft" name={isAr ? 'مسودة' : 'Draft'} fill="#d4d4d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Breakdown Pie (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-[#e4e4e7] bg-white p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#27272a]">
                {isAr ? 'توزيع عناصر الموقع' : 'Collection Distribution'}
              </h3>
              <p className="text-xs text-[#71717a]">
                {isAr ? 'نسبة كل نوع من المحتوى' : 'Proportional breakdown of active entities'}
              </p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Recent Contact Inquiries & Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Latest Contact Inquiries (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl border border-[#e4e4e7] bg-white p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#6a5ed9]" />
              <h3 className="text-sm font-bold text-[#27272a]">
                {isAr ? 'أحدث الرسائل الواردة' : 'Recent Inquiries & Leads'}
              </h3>
            </div>
            <button
              onClick={() => onNavigateSection('messages')}
              className="text-xs font-semibold text-[#6a5ed9] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{isAr ? 'عرض الكل' : 'View Inbox'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {messages.slice(0, 4).map((msg) => (
              <div
                key={msg.id}
                onClick={() => onNavigateSection('messages')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                  msg.status === 'unread'
                    ? 'bg-purple-50/40 border-purple-200'
                    : 'bg-[#fafafa] border-[#e4e4e7] hover:bg-[#f4f4f5]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#27272a]">{msg.name}</span>
                    {msg.status === 'unread' && (
                      <span className="w-2 h-2 rounded-full bg-[#6a5ed9]" />
                    )}
                  </div>
                  <span className="text-[10px] text-[#71717a]">
                    {new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-[#6a5ed9] truncate">{msg.service}</p>
                <p className="text-xs text-[#52525b] line-clamp-2 leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Log (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl border border-[#e4e4e7] bg-white p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1bb152]" />
              <h3 className="text-sm font-bold text-[#27272a]">
                {isAr ? 'سجل العمليات الأخير' : 'Audit & Activity Log'}
              </h3>
            </div>
            <span className="text-[11px] text-[#71717a]">
              {activityLogs.length} {isAr ? 'عملية مسجلة' : 'Recorded actions'}
            </span>
          </div>

          <div className="space-y-3">
            {activityLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-xs text-[#52525b]"
              >
                <div className="w-2 h-2 rounded-full bg-[#6a5ed9] mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#27272a]">
                    <span>{log.action}</span>: <span className="text-[#6a5ed9]">{log.entityTitle}</span>
                  </p>
                  <p className="text-[11px] text-[#71717a] mt-0.5">
                    {log.entityType} • By {log.userEmail}
                  </p>
                </div>
                <span className="text-[10px] text-[#a1a1aa] shrink-0 font-mono">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
