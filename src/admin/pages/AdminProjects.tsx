import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Save,
  X,
  PlusCircle,
} from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';
import { ProjectItem } from '../../types';
import { useToast } from '../context/ToastContext';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { SeoFields } from '../components/SeoFields';
import { RichTextEditor } from '../components/RichTextEditor';

interface AdminProjectsProps {
  language: 'en' | 'ar';
  highlightId?: string;
}

export const AdminProjects: React.FC<AdminProjectsProps> = ({ language, highlightId }) => {
  const isAr = language === 'ar';
  const { showToast } = useToast();
  const [, setTick] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'gallery' | 'metrics' | 'seo'>('details');

  // Form State
  const [formData, setFormData] = useState<Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>>({
    name_en: '',
    name_ar: '',
    slug: '',
    category: 'Web Application',
    summary_en: '',
    summary_ar: '',
    description_en: '',
    description_ar: '',
    image: '',
    gallery: [],
    tags: [],
    client: '',
    duration: '',
    features_en: [],
    features_ar: [],
    results_en: '',
    results_ar: '',
    liveUrl: '',
    status: 'published',
    featured: false,
    order: 1,
    seoTitle: '',
    seoDescription: '',
    keywords: '',
    canonicalUrl: '',
  });

  const [tagInput, setTechTagInput] = useState('');
  const [galleryUrlInput, setGalleryUrlInput] = useState('');
  const [featureEnInput, setFeatureEnInput] = useState('');
  const [featureArInput, setFeatureArInput] = useState('');

  useEffect(() => {
    return cmsStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  const projects = cmsStore.getProjects();
  const categories = cmsStore.getProjectCategories();

  useEffect(() => {
    if (highlightId) {
      const found = projects.find((p) => p.id === highlightId);
      if (found) {
        handleOpenEdit(found);
      }
    }
  }, [highlightId]);

  const filteredProjects = projects
    .filter((p) => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name_en?.toLowerCase().includes(q) ||
        p.name_ar?.toLowerCase().includes(q) ||
        p.summary_en?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => a.order - b.order);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setActiveTab('details');
    setFormData({
      name_en: '',
      name_ar: '',
      slug: '',
      category: categories[0]?.name_en || 'Web Application',
      techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind'],
      summary_en: '',
      summary_ar: '',
      description_en: '',
      description_ar: '',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      ],
      tags: ['React', 'TypeScript', 'Node.js', 'Tailwind'],
      client: 'Global Tech Corp',
      duration: '3 Months',
      features_en: ['Real-time Data Analytics', 'Enterprise RBAC System', 'High Scalability'],
      features_ar: ['تحليلات بيانات في الوقت الفعلي', 'نظام صلاحيات مؤسسي متقدم', 'قابلية توسع فائقة'],
      results_en: '+240% User Engagement, 99.99% Uptime',
      results_ar: 'زيادة 240% في تفاعل المستخدمين وجاهزية 99.99%',
      liveUrl: 'https://example.com',
      status: 'published',
      featured: false,
      order: projects.length + 1,
      seoTitle: '',
      seoDescription: '',
      keywords: 'enterprise software, web platform, react',
      canonicalUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setActiveTab('details');
    setFormData({
      name_en: project.name_en,
      name_ar: project.name_ar,
      slug: project.slug,
      category: project.category,
      summary_en: project.summary_en,
      summary_ar: project.summary_ar,
      description_en: project.description_en,
      description_ar: project.description_ar,
      image: project.image,
      gallery: [...(project.gallery || [])],
      tags: [...(project.tags || [])],
      client: project.client || '',
      duration: project.duration || '',
      features_en: [...(project.features_en || [])],
      features_ar: [...(project.features_ar || [])],
      results_en: project.results_en || '',
      results_ar: project.results_ar || '',
      liveUrl: project.liveUrl || '',
      status: project.status,
      featured: project.featured,
      order: project.order,
      seoTitle: project.seoTitle || '',
      seoDescription: project.seoDescription || '',
      keywords: project.keywords || '',
      canonicalUrl: project.canonicalUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name_en.trim() || !formData.name_ar.trim()) {
      showToast(isAr ? 'يرجى إدخال اسم المشروع باللغتين' : 'Please provide project names in both languages', 'error');
      return;
    }

    const cleanSlug =
      formData.slug.trim() ||
      formData.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const finalData = { ...formData, slug: cleanSlug };

    if (editingProject) {
      cmsStore.updateProject(editingProject.id, finalData);
      showToast(isAr ? 'تم حفظ تعديلات المشروع' : 'Project updated successfully', 'success');
    } else {
      cmsStore.createProject(finalData);
      showToast(isAr ? 'تم إضافة المشروع بنجاح' : 'New project created successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      cmsStore.deleteProject(deleteTarget.id);
      showToast(isAr ? 'تم حذف المشروع' : 'Project deleted successfully', 'success');
      setDeleteTarget(null);
    }
  };

  const togglePublish = (project: ProjectItem) => {
    cmsStore.toggleProjectPublish(project.id);
    showToast(
      isAr
        ? project.status === 'published'
          ? 'تم تحويل المشروع إلى مسودة'
          : 'تم نشر المشروع'
        : `Project marked as ${project.status === 'published' ? 'Draft' : 'Published'}`,
      'info'
    );
  };

  const toggleFeatured = (project: ProjectItem) => {
    cmsStore.toggleProjectFeatured(project.id);
    showToast(
      isAr
        ? project.featured
          ? 'تم إلغاء تمييز المشروع'
          : 'تم تمييز المشروع في الصفحة الرئيسية'
        : `Project ${project.featured ? 'unfeatured' : 'featured on homepage'}`,
      'info'
    );
  };

  // Tags & Array helpers
  const addTag = () => {
    if (tagInput.trim()) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTechTagInput('');
    }
  };

  const removeTag = (idx: number) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((_, i) => i !== idx) }));
  };

  const addGalleryImage = () => {
    if (galleryUrlInput.trim()) {
      setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, galleryUrlInput.trim()] }));
      setGalleryUrlInput('');
    }
  };

  const removeGalleryImage = (idx: number) => {
    setFormData((prev) => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== idx) }));
  };

  const addFeatureEn = () => {
    if (featureEnInput.trim()) {
      setFormData((prev) => ({ ...prev, features_en: [...prev.features_en, featureEnInput.trim()] }));
      setFeatureEnInput('');
    }
  };

  const removeFeatureEn = (idx: number) => {
    setFormData((prev) => ({ ...prev, features_en: prev.features_en.filter((_, i) => i !== idx) }));
  };

  const addFeatureAr = () => {
    if (featureArInput.trim()) {
      setFormData((prev) => ({ ...prev, features_ar: [...prev.features_ar, featureArInput.trim()] }));
      setFeatureArInput('');
    }
  };

  const removeFeatureAr = (idx: number) => {
    setFormData((prev) => ({ ...prev, features_ar: prev.features_ar.filter((_, i) => i !== idx) }));
  };

  return (
    <div id="admin-projects-page" className="p-4 sm:p-6 lg:p-8 space-y-6 text-start max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#27272a]">
            {isAr ? 'المشاريع ودراسات الحالة' : 'Projects & Portfolio'}
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            {isAr
              ? `إجمالي ${projects.length} مشروع • تحكم كامل في المعرض، التفاصيل، وبيانات SEO`
              : `${projects.length} total projects • Manage showcase, galleries, and search optimization`}
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-xs active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إضافة مشروع جديد' : 'New Project'}</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#e4e4e7] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#71717a] absolute inset-y-0 left-3 my-auto pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن مشروع...' : 'Search projects...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] focus:outline-none focus:border-[#6a5ed9] cursor-pointer"
          >
            <option value="all">{isAr ? 'جميع التصنيفات' : 'All Categories'}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name_en}>
                {isAr ? cat.name_ar : cat.name_en}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-xs px-3 py-1.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] focus:outline-none focus:border-[#6a5ed9] cursor-pointer"
          >
            <option value="all">{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="published">{isAr ? 'منشور' : 'Published'}</option>
            <option value="draft">{isAr ? 'مسودة' : 'Draft'}</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-[#e4e4e7] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#e4e4e7] font-semibold">
              <tr>
                <th className="py-3.5 px-4 text-start">{isAr ? 'المشروع' : 'Project'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'التصنيف' : 'Category'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'العميل والمدة' : 'Client & Duration'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'مميز' : 'Featured'}</th>
                <th className="py-3.5 px-4 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e4e7] text-[#27272a]">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-[#71717a]">
                    <FolderKanban className="w-8 h-8 mx-auto text-[#d4d4d8] mb-2" />
                    <p className="font-semibold">{isAr ? 'لا توجد مشاريع مطابقة' : 'No projects found'}</p>
                    <button
                      onClick={handleOpenCreate}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6a5ed9] text-white text-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAr ? 'إضافة مشروع جديد' : 'Create Project'}</span>
                    </button>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.image}
                          alt={project.name_en}
                          className="w-12 h-9 rounded-lg object-cover border border-[#e4e4e7] shrink-0"
                        />
                        <div>
                          <p className="font-bold text-[#27272a]">{isAr ? project.name_ar : project.name_en}</p>
                          <p className="text-[11px] text-[#71717a] line-clamp-1 max-w-xs">
                            {isAr ? project.summary_ar : project.summary_en}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-[#6a5ed9] border border-purple-200">
                        {project.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#27272a]">{project.client || 'N/A'}</p>
                      <p className="text-[10px] text-[#71717a]">{project.duration || 'N/A'}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePublish(project)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                          project.status === 'published'
                            ? 'bg-emerald-50 text-[#1bb152] border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-[#71717a] border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {project.status === 'published' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        <span>{project.status === 'published' ? (isAr ? 'منشور' : 'Published') : (isAr ? 'مسودة' : 'Draft')}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleFeatured(project)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          project.featured ? 'text-amber-500 bg-amber-50' : 'text-[#a1a1aa] hover:text-[#27272a]'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-4 h-4 ${project.featured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-[#71717a] hover:text-[#6a5ed9] hover:bg-[#f4f4f5] transition-colors"
                            title="Visit Live URL"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => handleOpenEdit(project)}
                          className="p-1.5 rounded-lg text-[#52525b] hover:text-[#6a5ed9] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
                          title={isAr ? 'تعديل' : 'Edit'}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(project)}
                          className="p-1.5 rounded-lg text-[#52525b] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title={isAr ? 'حذف' : 'Delete'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Modal with Tabs */}
      {isModalOpen && (
        <div
          id="project-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            className="w-full max-w-4xl bg-white rounded-2xl border border-[#e4e4e7] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-start"
            role="dialog"
          >
            {/* Modal Top */}
            <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#27272a]">
                  {editingProject ? (isAr ? 'تعديل بيانات المشروع' : 'Edit Project') : (isAr ? 'إضافة مشروع جديد' : 'New Project')}
                </h3>
                <p className="text-xs text-[#71717a] mt-0.5">
                  {isAr ? 'تحكم كامل في نصوص العرض، الصور، النتائج، وبيانات السيو' : 'Manage project showcase, gallery, and SEO parameters'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#27272a] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-[#e4e4e7] gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`px-3.5 py-2 text-xs font-semibold border-b-2 -mb-[1px] transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'border-[#6a5ed9] text-[#6a5ed9]'
                    : 'border-transparent text-[#71717a] hover:text-[#27272a]'
                }`}
              >
                {isAr ? 'البيانات الأساسية' : 'General Details'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`px-3.5 py-2 text-xs font-semibold border-b-2 -mb-[1px] transition-colors cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'border-[#6a5ed9] text-[#6a5ed9]'
                    : 'border-transparent text-[#71717a] hover:text-[#27272a]'
                }`}
              >
                {isAr ? 'الصور والمعرض' : 'Gallery & Assets'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('metrics')}
                className={`px-3.5 py-2 text-xs font-semibold border-b-2 -mb-[1px] transition-colors cursor-pointer ${
                  activeTab === 'metrics'
                    ? 'border-[#6a5ed9] text-[#6a5ed9]'
                    : 'border-transparent text-[#71717a] hover:text-[#27272a]'
                }`}
              >
                {isAr ? 'الميزات والنتائج' : 'Features & Impact'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`px-3.5 py-2 text-xs font-semibold border-b-2 -mb-[1px] transition-colors cursor-pointer ${
                  activeTab === 'seo'
                    ? 'border-[#6a5ed9] text-[#6a5ed9]'
                    : 'border-transparent text-[#71717a] hover:text-[#27272a]'
                }`}
              >
                {isAr ? 'بيانات SEO' : 'SEO Metadata'}
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* TAB 1: DETAILS */}
              {activeTab === 'details' && (
                <div className="space-y-4 animate-in fade-in duration-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Project Name (EN) *</label>
                      <input
                        type="text"
                        required
                        value={formData.name_en}
                        onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                        placeholder="e.g. Fintech Analytics Dashboard"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">اسم المشروع (AR) *</label>
                      <input
                        type="text"
                        required
                        dir="rtl"
                        value={formData.name_ar}
                        onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                        placeholder="مثال: منصة التحليلات المالية والتداول"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] bg-white focus:border-[#6a5ed9]"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.name_en}>
                            {c.name_en}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Client Name</label>
                      <input
                        type="text"
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        placeholder="e.g. Apex Global"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Project Duration</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g. 8 Weeks"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Live URL</label>
                      <input
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">URL Slug (Optional)</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="fintech-dashboard"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                      />
                    </div>
                  </div>

                  {/* Summaries */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Summary (EN)</label>
                      <textarea
                        rows={2}
                        value={formData.summary_en}
                        onChange={(e) => setFormData({ ...formData, summary_en: e.target.value })}
                        placeholder="Short summary for cards..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">الملخص (AR)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={formData.summary_ar}
                        onChange={(e) => setFormData({ ...formData, summary_ar: e.target.value })}
                        placeholder="ملخص قصير للبطاقات..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                    </div>
                  </div>

                  {/* Rich Text Descriptions */}
                  <RichTextEditor
                    label="Full Case Study (EN)"
                    value={formData.description_en}
                    onChange={(val) => setFormData({ ...formData, description_en: val })}
                  />
                  <RichTextEditor
                    label="دراسة الحالة الكاملة (AR)"
                    value={formData.description_ar}
                    onChange={(val) => setFormData({ ...formData, description_ar: val })}
                  />
                </div>
              )}

              {/* TAB 2: GALLERY & ASSETS */}
              {activeTab === 'gallery' && (
                <div className="space-y-5 animate-in fade-in duration-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#27272a]">Main Cover Image URL *</label>
                    <input
                      type="url"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                    />
                    {formData.image && (
                      <div className="mt-2 w-full max-w-sm h-36 rounded-xl overflow-hidden border border-[#e4e4e7]">
                        <img src={formData.image} alt="Cover preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Gallery List */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#27272a]">Project Gallery Images</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={galleryUrlInput}
                        onChange={(e) => setGalleryUrlInput(e.target.value)}
                        placeholder="Add another image URL and click Add"
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                      <button
                        type="button"
                        onClick={addGalleryImage}
                        className="px-4 py-2 text-xs font-medium rounded-xl bg-[#f4f4f5] text-[#27272a] hover:bg-[#e4e4e7] cursor-pointer"
                      >
                        Add Image
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {formData.gallery.map((imgUrl, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-[#e4e4e7] h-24">
                          <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="space-y-2 pt-2 border-t border-[#e4e4e7]">
                    <label className="text-xs font-semibold text-[#27272a]">Tech Stack Tags</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTechTagInput(e.target.value)}
                        placeholder="e.g. Next.js, GraphQL, PostgreSQL"
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-3.5 py-2 text-xs rounded-xl bg-[#f4f4f5] cursor-pointer"
                      >
                        Add Tag
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-purple-50 text-[#6a5ed9] border border-purple-200"
                        >
                          <span>{tag}</span>
                          <button type="button" onClick={() => removeTag(idx)} className="text-red-500">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: FEATURES & IMPACT */}
              {activeTab === 'metrics' && (
                <div className="space-y-5 animate-in fade-in duration-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Impact & Measurable Results (EN)</label>
                      <input
                        type="text"
                        value={formData.results_en}
                        onChange={(e) => setFormData({ ...formData, results_en: e.target.value })}
                        placeholder="+320% conversion, 99.99% uptime"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">النتائج والمؤشرات الرقمية (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={formData.results_ar}
                        onChange={(e) => setFormData({ ...formData, results_ar: e.target.value })}
                        placeholder="زيادة 320% في التحويلات، استقرار 99.99%"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                    </div>
                  </div>

                  {/* Feature Lists */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#27272a]">Key Engineering Features (EN)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={featureEnInput}
                          onChange={(e) => setFeatureEnInput(e.target.value)}
                          placeholder="Feature description..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#e4e4e7]"
                        />
                        <button type="button" onClick={addFeatureEn} className="px-3 py-1.5 text-xs rounded-xl bg-[#f4f4f5]">
                          +
                        </button>
                      </div>
                      <ul className="space-y-1">
                        {formData.features_en.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-[#fafafa] border border-[#e4e4e7]"
                          >
                            <span>{f}</span>
                            <button type="button" onClick={() => removeFeatureEn(i)} className="text-red-500">
                              <X className="w-3 h-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#27272a]">أبرز المزايا الهندسية (AR)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          dir="rtl"
                          value={featureArInput}
                          onChange={(e) => setFeatureArInput(e.target.value)}
                          placeholder="وصف الميزة..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#e4e4e7]"
                        />
                        <button type="button" onClick={addFeatureAr} className="px-3 py-1.5 text-xs rounded-xl bg-[#f4f4f5]">
                          +
                        </button>
                      </div>
                      <ul className="space-y-1">
                        {formData.features_ar.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-[#fafafa] border border-[#e4e4e7]"
                          >
                            <span dir="rtl">{f}</span>
                            <button type="button" onClick={() => removeFeatureAr(i)} className="text-red-500">
                              <X className="w-3 h-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SEO */}
              {activeTab === 'seo' && (
                <div className="animate-in fade-in duration-100">
                  <SeoFields
                    seoTitle={formData.seoTitle || ''}
                    setSeoTitle={(val) => setFormData({ ...formData, seoTitle: val })}
                    seoDesc={formData.seoDescription || ''}
                    setSeoDesc={(val) => setFormData({ ...formData, seoDescription: val })}
                    keywords={formData.keywords}
                    setKeywords={(val) => setFormData({ ...formData, keywords: val })}
                    canonicalUrl={formData.canonicalUrl}
                    setCanonicalUrl={(val) => setFormData({ ...formData, canonicalUrl: val })}
                    language={language}
                  />
                </div>
              )}

              {/* Bottom Publishing & Order Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7]">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-xs font-medium text-[#27272a] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.status === 'published'}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })
                      }
                      className="w-4 h-4 rounded text-[#6a5ed9] focus:ring-[#6a5ed9]"
                    />
                    <span>{isAr ? 'نشر المشروع' : 'Publish Project'}</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-[#27272a] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#6a5ed9] focus:ring-[#6a5ed9]"
                    />
                    <span>{isAr ? 'عرض في الصفحة الرئيسية (مميز)' : 'Featured on Homepage'}</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#71717a]">{isAr ? 'الترتيب' : 'Order'}:</span>
                  <input
                    type="number"
                    min={1}
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    className="w-16 px-2 py-1 text-xs rounded-lg border border-[#e4e4e7] bg-white text-center"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e4e4e7]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-[#e4e4e7] text-[#27272a] hover:bg-[#f4f4f5] cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl bg-[#6a5ed9] text-white hover:bg-[#584dc7] shadow-xs active:scale-98 transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isAr ? 'حفظ المشروع' : 'Save Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        title={isAr ? 'تأكيد حذف المشروع' : 'Delete Project'}
        message={
          isAr
            ? 'هل أنت متأكد من حذف هذا المشروع من سابقة الأعمال؟ لا يمكن التراجع عن هذا الإجراء.'
            : 'Are you sure you want to delete this project? This will remove it from the portfolio.'
        }
        itemName={deleteTarget ? (isAr ? deleteTarget.name_ar : deleteTarget.name_en) : ''}
        confirmLabel={isAr ? 'نعم، احذف المشروع' : 'Delete Project'}
        cancelLabel={isAr ? 'إلغاء' : 'Cancel'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
