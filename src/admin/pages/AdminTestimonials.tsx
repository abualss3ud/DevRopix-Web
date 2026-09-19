import React, { useState, useEffect } from 'react';
import { Star, Plus, Search, Edit2, Trash2, Save, X, CheckCircle2, XCircle } from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';
import { TestimonialItem } from '../../types';
import { useToast } from '../context/ToastContext';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

interface AdminTestimonialsProps {
  language: 'en' | 'ar';
  highlightId?: string;
}

export const AdminTestimonials: React.FC<AdminTestimonialsProps> = ({ language, highlightId }) => {
  const isAr = language === 'ar';
  const { showToast } = useToast();
  const [, setTick] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TestimonialItem | null>(null);

  const [formData, setFormData] = useState<Omit<TestimonialItem, 'id' | 'createdAt'>>({
    quote_en: '',
    quote_ar: '',
    author: '',
    role_en: '',
    role_ar: '',
    company: '',
    avatar: '',
    rating: 5,
    status: 'published',
    order: 1,
  });

  useEffect(() => {
    return cmsStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  const testimonials = cmsStore.getTestimonials();

  useEffect(() => {
    if (highlightId) {
      const found = testimonials.find((t) => t.id === highlightId);
      if (found) handleOpenEdit(found);
    }
  }, [highlightId]);

  const filteredTestimonials = testimonials
    .filter((t) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        t.author.toLowerCase().includes(q) ||
        t.company.toLowerCase().includes(q) ||
        t.quote_en.toLowerCase().includes(q) ||
        t.quote_ar.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => a.order - b.order);

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    setFormData({
      quote_en: '',
      quote_ar: '',
      author: '',
      role_en: 'CEO & Founder',
      role_ar: 'الرئيس التنفيذي والمؤسس',
      company: 'Tech Corp',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      status: 'published',
      order: testimonials.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: TestimonialItem) => {
    setEditingTestimonial(t);
    setFormData({
      quote_en: t.quote_en,
      quote_ar: t.quote_ar,
      author: t.author,
      role_en: t.role_en,
      role_ar: t.role_ar,
      company: t.company,
      avatar: t.avatar,
      rating: t.rating,
      status: t.status,
      order: t.order,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.quote_en.trim() || !formData.quote_ar.trim()) {
      showToast(isAr ? 'يرجى إكمال البيانات المطلوبة' : 'Please complete all required fields', 'error');
      return;
    }

    if (editingTestimonial) {
      cmsStore.updateTestimonial(editingTestimonial.id, formData);
      showToast(isAr ? 'تم تحديث التقييم بنجاح' : 'Testimonial updated successfully', 'success');
    } else {
      cmsStore.createTestimonial(formData);
      showToast(isAr ? 'تم إضافة التقييم بنجاح' : 'Testimonial created successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      cmsStore.deleteTestimonial(deleteTarget.id);
      showToast(isAr ? 'تم حذف التقييم' : 'Testimonial deleted', 'success');
      setDeleteTarget(null);
    }
  };

  const togglePublish = (t: TestimonialItem) => {
    cmsStore.toggleTestimonialPublish(t.id);
    showToast(
      isAr
        ? t.status === 'published'
          ? 'تم إلغاء النشر'
          : 'تم نشر التقييم'
        : `Testimonial is now ${t.status === 'published' ? 'Draft' : 'Published'}`,
      'info'
    );
  };

  return (
    <div id="admin-testimonials-page" className="p-4 sm:p-6 lg:p-8 space-y-6 text-start max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#27272a]">
            {isAr ? 'آراء وتقييمات العملاء' : 'Client Testimonials'}
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            {isAr
              ? 'إدارة شهادات الجودة والتقييمات الظاهرة في الموقع الرئيسي'
              : 'Manage client endorsements, ratings, and quotes'}
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-xs active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إضافة تقييم جديد' : 'New Testimonial'}</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#e4e4e7] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#71717a] absolute inset-y-0 left-3 my-auto pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن عميل أو شركة...' : 'Search testimonials...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTestimonials.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-[#71717a] bg-white rounded-2xl border border-[#e4e4e7]">
            <Star className="w-8 h-8 mx-auto text-[#d4d4d8] mb-2" />
            <p className="font-semibold">{isAr ? 'لا توجد تقييمات' : 'No testimonials found'}</p>
          </div>
        ) : (
          filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl border border-[#e4e4e7] bg-white hover:border-[#6a5ed9]/50 hover:shadow-md transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-amber-400' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => togglePublish(t)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold cursor-pointer ${
                    t.status === 'published'
                      ? 'bg-emerald-50 text-[#1bb152] border border-emerald-200'
                      : 'bg-slate-100 text-[#71717a]'
                  }`}
                >
                  {t.status === 'published' ? (isAr ? 'منشور' : 'Published') : (isAr ? 'مسودة' : 'Draft')}
                </button>
              </div>

              <p className="text-xs text-[#52525b] italic line-clamp-3 leading-relaxed">
                "{isAr ? t.quote_ar : t.quote_en}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#e4e4e7]">
                <div className="flex items-center gap-2.5">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-8 h-8 rounded-full object-cover border border-[#e4e4e7]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#27272a]">{t.author}</p>
                    <p className="text-[10px] text-[#71717a]">
                      {isAr ? t.role_ar : t.role_en} — {t.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1 rounded-lg text-[#71717a] hover:text-[#6a5ed9] hover:bg-[#f4f4f5] cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(t)}
                    className="p-1 rounded-lg text-[#71717a] hover:text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="testimonial-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        >
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#e4e4e7] p-6 shadow-2xl space-y-5 text-start max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
              <h3 className="text-base font-bold text-[#27272a]">
                {editingTestimonial ? (isAr ? 'تعديل التقييم' : 'Edit Testimonial') : (isAr ? 'إضافة تقييم جديد' : 'New Testimonial')}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-[#71717a] hover:bg-[#f4f4f5]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Fintech Ltd"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">Role (EN)</label>
                  <input
                    type="text"
                    value={formData.role_en}
                    onChange={(e) => setFormData({ ...formData, role_en: e.target.value })}
                    placeholder="Chief Product Officer"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">المسمى الوظيفي (AR)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={formData.role_ar}
                    onChange={(e) => setFormData({ ...formData, role_ar: e.target.value })}
                    placeholder="مدير تطوير المنتجات"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">Avatar Image URL</label>
                  <input
                    type="url"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">Rating Stars (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] bg-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Quote (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.quote_en}
                  onChange={(e) => setFormData({ ...formData, quote_en: e.target.value })}
                  placeholder="What did the client say about DevRopix..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">نص التقييم (بالعربية) *</label>
                <textarea
                  rows={3}
                  required
                  dir="rtl"
                  value={formData.quote_ar}
                  onChange={(e) => setFormData({ ...formData, quote_ar: e.target.value })}
                  placeholder="رأي العميل في التعاون مع ديف روبيكس..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>

              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#fafafa] border border-[#e4e4e7]">
                <label className="flex items-center gap-2 text-xs font-medium text-[#27272a] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.status === 'published'}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })
                    }
                    className="w-4 h-4 rounded text-[#6a5ed9]"
                  />
                  <span>{isAr ? 'نشر التقييم فوراً' : 'Publish Testimonial'}</span>
                </label>

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

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e4e4e7]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-[#e4e4e7]"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl bg-[#6a5ed9] text-white"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isAr ? 'حفظ التقييم' : 'Save Testimonial'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        title={isAr ? 'حذف تقييم العميل' : 'Delete Testimonial'}
        message={isAr ? 'هل أنت متأكد من حذف هذا التقييم؟' : 'Are you sure you want to delete this testimonial?'}
        itemName={deleteTarget ? `${deleteTarget.author} (${deleteTarget.company})` : ''}
        confirmLabel={isAr ? 'نعم، احذف' : 'Delete'}
        cancelLabel={isAr ? 'إلغاء' : 'Cancel'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
