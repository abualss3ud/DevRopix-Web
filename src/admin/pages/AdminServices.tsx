import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Star,
  CheckCircle2,
  XCircle,
  Globe,
  Smartphone,
  Layers,
  Cpu,
  Rocket,
  ShieldCheck,
  Code,
  Database,
  Cloud,
  Sparkles,
  ArrowUpDown,
  X,
  Save,
} from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';
import { ServiceItem } from '../../types';
import { useToast } from '../context/ToastContext';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

interface AdminServicesProps {
  language: 'en' | 'ar';
  highlightId?: string;
}

const AVAILABLE_ICONS = [
  { name: 'Globe', label: 'Globe (Web)', component: Globe },
  { name: 'Smartphone', label: 'Smartphone (Mobile)', component: Smartphone },
  { name: 'Layers', label: 'Layers (UI/UX)', component: Layers },
  { name: 'Cpu', label: 'Cpu (Software/ERP)', component: Cpu },
  { name: 'Rocket', label: 'Rocket (MVP/Product)', component: Rocket },
  { name: 'ShieldCheck', label: 'Shield (Security/SLA)', component: ShieldCheck },
  { name: 'Database', label: 'Database', component: Database },
  { name: 'Cloud', label: 'Cloud & DevOps', component: Cloud },
  { name: 'Code', label: 'Custom Code', component: Code },
  { name: 'Sparkles', label: 'AI & Automation', component: Sparkles },
];

export const AdminServices: React.FC<AdminServicesProps> = ({ language, highlightId }) => {
  const isAr = language === 'ar';
  const { showToast } = useToast();
  const [, setTick] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);

  // Form States
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    shortDesc_en: '',
    shortDesc_ar: '',
    fullDesc_en: '',
    fullDesc_ar: '',
    iconName: 'Globe',
    deliverables_en: [] as string[],
    deliverables_ar: [] as string[],
    techStack: [] as string[],
    metrics_en: '',
    metrics_ar: '',
    status: 'published' as 'published' | 'draft',
    featured: true,
    order: 1,
    coverImage: '',
  });

  const [delivEnInput, setDelivEnInput] = useState('');
  const [delivArInput, setDelivArInput] = useState('');
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    return cmsStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  const services = cmsStore.getServices();

  useEffect(() => {
    if (highlightId) {
      const found = services.find((s) => s.id === highlightId);
      if (found) {
        handleOpenEdit(found);
      }
    }
  }, [highlightId]);

  const filteredServices = services
    .filter((s) => {
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (s.title_en || '').toLowerCase().includes(q) ||
        (s.title_ar || '').toLowerCase().includes(q) ||
        (s.shortDesc_en || '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData({
      title_en: '',
      title_ar: '',
      shortDesc_en: '',
      shortDesc_ar: '',
      fullDesc_en: '',
      fullDesc_ar: '',
      iconName: 'Globe',
      deliverables_en: ['Responsive Web App', 'Admin Portal', 'Performance Tuning'],
      deliverables_ar: ['تطبيقات ويب متجاوبة', 'لوحات تحكم إدارية', 'تحسين الأداء'],
      techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
      metrics_en: '99+ Lighthouse Score',
      metrics_ar: 'معيار 99+ للسرعة',
      status: 'published',
      featured: false,
      order: services.length + 1,
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      title_en: service.title_en || '',
      title_ar: service.title_ar || '',
      shortDesc_en: service.shortDesc_en || '',
      shortDesc_ar: service.shortDesc_ar || '',
      fullDesc_en: service.fullDesc_en || '',
      fullDesc_ar: service.fullDesc_ar || '',
      iconName: service.iconName || 'Code',
      deliverables_en: [...(service.deliverables_en || service.deliverables || [])],
      deliverables_ar: [...(service.deliverables_ar || [])],
      techStack: [...(service.techStack || [])],
      metrics_en: service.metrics_en || '',
      metrics_ar: service.metrics_ar || '',
      status: service.status || 'published',
      featured: service.featured || false,
      order: service.order || 1,
      coverImage: service.coverImage || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title_en.trim() || !formData.title_ar.trim()) {
      showToast(isAr ? 'يرجى إدخال عنوان الخدمة باللغتين' : 'Please provide titles in both languages', 'error');
      return;
    }

    if (editingService) {
      cmsStore.updateService(editingService.id, formData);
      showToast(isAr ? 'تم تحديث الخدمة بنجاح' : 'Service updated successfully', 'success');
    } else {
      cmsStore.createService(formData);
      showToast(isAr ? 'تم إنشاء الخدمة بنجاح' : 'New service created successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      cmsStore.deleteService(deleteTarget.id);
      showToast(isAr ? 'تم حذف الخدمة' : 'Service deleted successfully', 'success');
      setDeleteTarget(null);
    }
  };

  const togglePublish = (service: ServiceItem) => {
    cmsStore.toggleServicePublish(service.id);
    showToast(
      isAr
        ? service.status === 'published'
          ? 'تم تحويل الخدمة إلى مسودة'
          : 'تم نشر الخدمة'
        : `Service is now ${service.status === 'published' ? 'Draft' : 'Published'}`,
      'info'
    );
  };

  const toggleFeatured = (service: ServiceItem) => {
    cmsStore.toggleServiceFeatured(service.id);
    showToast(
      isAr
        ? service.featured
          ? 'تم إلغاء تمييز الخدمة'
          : 'تم تمييز الخدمة في الصفحة الرئيسية'
        : `Service ${service.featured ? 'unfeatured' : 'marked as featured'}`,
      'info'
    );
  };

  const addDelivEn = () => {
    if (delivEnInput.trim()) {
      setFormData((prev) => ({ ...prev, deliverables_en: [...prev.deliverables_en, delivEnInput.trim()] }));
      setDelivEnInput('');
    }
  };

  const removeDelivEn = (idx: number) => {
    setFormData((prev) => ({ ...prev, deliverables_en: prev.deliverables_en.filter((_, i) => i !== idx) }));
  };

  const addDelivAr = () => {
    if (delivArInput.trim()) {
      setFormData((prev) => ({ ...prev, deliverables_ar: [...prev.deliverables_ar, delivArInput.trim()] }));
      setDelivArInput('');
    }
  };

  const removeDelivAr = (idx: number) => {
    setFormData((prev) => ({ ...prev, deliverables_ar: prev.deliverables_ar.filter((_, i) => i !== idx) }));
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData((prev) => ({ ...prev, techStack: [...prev.techStack, techInput.trim()] }));
      setTechInput('');
    }
  };

  const removeTech = (idx: number) => {
    setFormData((prev) => ({ ...prev, techStack: prev.techStack.filter((_, i) => i !== idx) }));
  };

  return (
    <div id="admin-services-page" className="p-4 sm:p-6 lg:p-8 space-y-6 text-start max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#27272a]">
            {isAr ? 'إدارة الخدمات البرمجية' : 'Engineering Services'}
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            {isAr
              ? `إجمالي ${services.length} خدمة • تظهر في صفحة الخدمات والصفحة الرئيسية`
              : `${services.length} total services • Live on public website`}
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-xs active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إضافة خدمة جديدة' : 'Add New Service'}</span>
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
            placeholder={isAr ? 'ابحث عن خدمة...' : 'Search services by title...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-[#71717a]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="text-xs px-3 py-1.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] focus:outline-none focus:border-[#6a5ed9] cursor-pointer"
          >
            <option value="all">{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="published">{isAr ? 'المنشورة فقط' : 'Published'}</option>
            <option value="draft">{isAr ? 'المسودات' : 'Drafts'}</option>
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="rounded-2xl border border-[#e4e4e7] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#e4e4e7] font-semibold">
              <tr>
                <th className="py-3.5 px-4 text-start">{isAr ? 'الترتيب' : 'Order'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'الخدمة' : 'Service'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'التقنيات' : 'Tech Stack'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'مميزة' : 'Featured'}</th>
                <th className="py-3.5 px-4 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e4e7] text-[#27272a]">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-[#71717a]">
                    <Briefcase className="w-8 h-8 mx-auto text-[#d4d4d8] mb-2" />
                    <p className="font-semibold">{isAr ? 'لا توجد خدمات مطابقة' : 'No services found'}</p>
                    <button
                      onClick={handleOpenCreate}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6a5ed9] text-white text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAr ? 'إضافة خدمة جديدة' : 'Create Service'}</span>
                    </button>
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => {
                  return (
                    <tr key={service.id} className="hover:bg-[#fafafa] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#71717a]">
                        #{service.order}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 text-[#6a5ed9] flex items-center justify-center shrink-0">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-bold text-[#27272a]">{isAr ? service.title_ar : service.title_en}</p>
                            <p className="text-[11px] text-[#71717a] line-clamp-1 max-w-sm">
                              {isAr ? service.shortDesc_ar : service.shortDesc_en}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(service.techStack || []).slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#f4f4f5] text-[#52525b] border border-[#e4e4e7]"
                            >
                              {tech}
                            </span>
                          ))}
                          {(service.techStack?.length || 0) > 3 && (
                            <span className="text-[10px] text-[#71717a] self-center">
                              +{(service.techStack?.length || 0) - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => togglePublish(service)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                            service.status === 'published'
                              ? 'bg-emerald-50 text-[#1bb152] border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-[#71717a] border border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {service.status === 'published' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          <span>{service.status === 'published' ? (isAr ? 'منشور' : 'Published') : (isAr ? 'مسودة' : 'Draft')}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleFeatured(service)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            service.featured ? 'text-amber-500 bg-amber-50' : 'text-[#a1a1aa] hover:text-[#27272a]'
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className={`w-4 h-4 ${service.featured ? 'fill-amber-400' : ''}`} />
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(service)}
                            className="p-1.5 rounded-lg text-[#52525b] hover:text-[#6a5ed9] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
                            title={isAr ? 'تعديل' : 'Edit'}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(service)}
                            className="p-1.5 rounded-lg text-[#52525b] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title={isAr ? 'حذف' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Service Modal */}
      {isModalOpen && (
        <div
          id="service-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            className="w-full max-w-3xl bg-white rounded-2xl border border-[#e4e4e7] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-start"
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#27272a]">
                  {editingService ? (isAr ? 'تعديل الخدمة البرمجية' : 'Edit Service') : (isAr ? 'إضافة خدمة جديدة' : 'Add New Service')}
                </h3>
                <p className="text-xs text-[#71717a] mt-0.5">
                  {isAr ? 'أدخل البيانات باللغتين العربية والإنجليزية بدقة' : 'Fill in the service details for Arabic and English'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#27272a] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Bilingual Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    placeholder="e.g. Web Applications & Portals"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:border-[#6a5ed9]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">العنوان (بالعربية) *</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={formData.title_ar}
                    onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                    placeholder="مثال: تطوير تطبيقات الويب والمواقع المتقدمة"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:border-[#6a5ed9]"
                  />
                </div>
              </div>

              {/* Short Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">Short Description (English)</label>
                  <textarea
                    rows={2}
                    value={formData.shortDesc_en}
                    onChange={(e) => setFormData({ ...formData, shortDesc_en: e.target.value })}
                    placeholder="Brief summary for cards..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:border-[#6a5ed9]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">الوصف القصير (بالعربية)</label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={formData.shortDesc_ar}
                    onChange={(e) => setFormData({ ...formData, shortDesc_ar: e.target.value })}
                    placeholder="وصف مختصر للبطاقات..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:border-[#6a5ed9]"
                  />
                </div>
              </div>

              {/* Full Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">Full Description (English)</label>
                  <textarea
                    rows={3}
                    value={formData.fullDesc_en}
                    onChange={(e) => setFormData({ ...formData, fullDesc_en: e.target.value })}
                    placeholder="Detailed explanation for service modal & page..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:border-[#6a5ed9]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">الوصف الشامل (بالعربية)</label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={formData.fullDesc_ar}
                    onChange={(e) => setFormData({ ...formData, fullDesc_ar: e.target.value })}
                    placeholder="شرح تفصيلي للمودال وصفحة الخدمات..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:border-[#6a5ed9]"
                  />
                </div>
              </div>

              {/* Icon & Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">Service Icon</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] bg-white focus:outline-none focus:border-[#6a5ed9]"
                  >
                    {AVAILABLE_ICONS.map((icon) => (
                      <option key={icon.name} value={icon.name}>
                        {icon.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">Metrics (EN)</label>
                  <input
                    type="text"
                    value={formData.metrics_en}
                    onChange={(e) => setFormData({ ...formData, metrics_en: e.target.value })}
                    placeholder="e.g. 99+ Lighthouse Score"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:border-[#6a5ed9]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">المؤشر القياسي (AR)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={formData.metrics_ar}
                    onChange={(e) => setFormData({ ...formData, metrics_ar: e.target.value })}
                    placeholder="مثال: معيار 99+ للسرعة"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:border-[#6a5ed9]"
                  />
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#27272a]">Technologies Used</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTech();
                      }
                    }}
                    placeholder="Add technology (e.g. Next.js, Flutter) and press Add"
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:border-[#6a5ed9]"
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    className="px-3.5 py-2 text-xs font-medium rounded-xl bg-[#f4f4f5] text-[#27272a] hover:bg-[#e4e4e7] cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-purple-50 text-[#6a5ed9] border border-purple-200"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTech(idx)}
                        className="hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverables EN / AR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#27272a]">Deliverables (EN)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={delivEnInput}
                      onChange={(e) => setDelivEnInput(e.target.value)}
                      placeholder="Add deliverable..."
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#e4e4e7]"
                    />
                    <button
                      type="button"
                      onClick={addDelivEn}
                      className="px-3 py-1.5 text-xs rounded-xl bg-[#f4f4f5]"
                    >
                      +
                    </button>
                  </div>
                  <ul className="space-y-1">
                    {formData.deliverables_en.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-[#fafafa] border border-[#e4e4e7]"
                      >
                        <span className="truncate">{d}</span>
                        <button type="button" onClick={() => removeDelivEn(i)} className="text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#27272a]">المخرجات الهندسية (AR)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      dir="rtl"
                      value={delivArInput}
                      onChange={(e) => setDelivArInput(e.target.value)}
                      placeholder="إضافة مخرج برمجي..."
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#e4e4e7]"
                    />
                    <button
                      type="button"
                      onClick={addDelivAr}
                      className="px-3 py-1.5 text-xs rounded-xl bg-[#f4f4f5]"
                    >
                      +
                    </button>
                  </div>
                  <ul className="space-y-1">
                    {formData.deliverables_ar.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-[#fafafa] border border-[#e4e4e7]"
                      >
                        <span className="truncate" dir="rtl">{d}</span>
                        <button type="button" onClick={() => removeDelivAr(i)} className="text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status & Featured */}
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
                    <span>{isAr ? 'نشر الخدمة فوراً' : 'Publish Service'}</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-[#27272a] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#6a5ed9] focus:ring-[#6a5ed9]"
                    />
                    <span>{isAr ? 'عرض في الصفحة الرئيسية (مميزة)' : 'Featured on Homepage'}</span>
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

              {/* Submit Actions */}
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
                  <span>{isAr ? 'حفظ التغييرات' : 'Save Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        title={isAr ? 'تأكيد حذف الخدمة' : 'Delete Service'}
        message={
          isAr
            ? 'هل أنت متأكد من رغبتك في حذف هذه الخدمة؟ لن تظهر بعد الآن على الموقع الرئيسي.'
            : 'Are you sure you want to delete this service? It will be permanently removed from the website.'
        }
        itemName={deleteTarget ? (isAr ? deleteTarget.title_ar : deleteTarget.title_en) : ''}
        confirmLabel={isAr ? 'نعم، احذف الخدمة' : 'Delete Service'}
        cancelLabel={isAr ? 'إلغاء' : 'Cancel'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
