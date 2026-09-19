import React, { useState, useEffect } from 'react';
import { Bookmark, Plus, Search, Edit2, Trash2, Save, X } from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';
import { BlogCategory } from '../../types';
import { useToast } from '../context/ToastContext';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

interface AdminBlogCategoriesProps {
  language: 'en' | 'ar';
}

export const AdminBlogCategories: React.FC<AdminBlogCategoriesProps> = ({ language }) => {
  const isAr = language === 'ar';
  const { showToast } = useToast();
  const [, setTick] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogCategory | null>(null);

  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    slug: '',
    description_en: '',
    description_ar: '',
  });

  useEffect(() => {
    return cmsStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  const categories = cmsStore.getBlogCategories();
  const blogPosts = cmsStore.getBlogPosts();

  const filteredCategories = categories.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name_en.toLowerCase().includes(q) ||
      c.name_ar.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q)
    );
  });

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setFormData({
      name_en: '',
      name_ar: '',
      slug: '',
      description_en: '',
      description_ar: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: BlogCategory) => {
    setEditingCategory(cat);
    setFormData({
      name_en: cat.name_en,
      name_ar: cat.name_ar,
      slug: cat.slug,
      description_en: cat.description_en || '',
      description_ar: cat.description_ar || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name_en.trim() || !formData.name_ar.trim()) {
      showToast(isAr ? 'يرجى إدخال اسم القسم باللغتين' : 'Please provide category name in both languages', 'error');
      return;
    }

    const cleanSlug =
      formData.slug.trim() ||
      formData.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const finalData = { ...formData, slug: cleanSlug };

    if (editingCategory) {
      cmsStore.updateBlogCategory(editingCategory.id, finalData);
      showToast(isAr ? 'تم تحديث قسم المدونة' : 'Category updated successfully', 'success');
    } else {
      cmsStore.createBlogCategory(finalData);
      showToast(isAr ? 'تم إنشاء قسم جديد' : 'New category created successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      cmsStore.deleteBlogCategory(deleteTarget.id);
      showToast(isAr ? 'تم حذف قسم المدونة' : 'Category deleted', 'success');
      setDeleteTarget(null);
    }
  };

  return (
    <div id="admin-blog-categories-page" className="p-4 sm:p-6 lg:p-8 space-y-6 text-start max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#27272a]">
            {isAr ? 'تصنيفات وأقسام المدونة' : 'Blog Categories'}
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            {isAr
              ? 'تصنيف المقالات والمنشورات التقنية'
              : 'Organize technical blog topics and software insights'}
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-xs active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إضافة قسم جديد' : 'New Category'}</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#e4e4e7] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#71717a] absolute inset-y-0 left-3 my-auto pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث في أقسام المدونة...' : 'Search categories...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[#e4e4e7] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#e4e4e7] font-semibold">
              <tr>
                <th className="py-3.5 px-4 text-start">{isAr ? 'اسم القسم (EN)' : 'Category Name (EN)'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'اسم القسم (AR)' : 'Category Name (AR)'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'الرابط المختصر (Slug)' : 'Slug'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'عدد المقالات' : 'Articles Count'}</th>
                <th className="py-3.5 px-4 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e4e7] text-[#27272a]">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-xs text-[#71717a]">
                    <Bookmark className="w-8 h-8 mx-auto text-[#d4d4d8] mb-2" />
                    <p className="font-semibold">{isAr ? 'لا توجد أقسام' : 'No categories found'}</p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => {
                  const linkedCount = blogPosts.filter((b) => b.category === cat.name_en).length;
                  return (
                    <tr key={cat.id} className="hover:bg-[#fafafa] transition-colors">
                      <td className="py-3.5 px-4 font-bold">{cat.name_en}</td>
                      <td className="py-3.5 px-4 font-bold" dir="rtl">{cat.name_ar}</td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#71717a]">{cat.slug}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#1bb152] border border-emerald-200">
                          {linkedCount} {linkedCount === 1 ? 'Article' : 'Articles'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(cat)}
                            className="p-1.5 rounded-lg text-[#52525b] hover:text-[#6a5ed9] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
                            title={isAr ? 'تعديل' : 'Edit'}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(cat)}
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

      {/* Modal */}
      {isModalOpen && (
        <div
          id="cat-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg bg-white rounded-2xl border border-[#e4e4e7] p-6 shadow-2xl space-y-5 text-start">
            <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
              <h3 className="text-base font-bold text-[#27272a]">
                {editingCategory ? (isAr ? 'تعديل قسم المدونة' : 'Edit Category') : (isAr ? 'إضافة قسم جديد' : 'New Category')}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f4f5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Name (English) *</label>
                <input
                  type="text"
                  required
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  placeholder="e.g. AI & Machine Learning"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">الاسم (بالعربية) *</label>
                <input
                  type="text"
                  required
                  dir="rtl"
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  placeholder="مثال: الذكاء الاصطناعي وتعلّم الآلة"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Slug (Optional)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="ai-machine-learning"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                />
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
                  <span>{isAr ? 'حفظ القسم' : 'Save Category'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        title={isAr ? 'حذف قسم المدونة' : 'Delete Category'}
        message={
          isAr
            ? 'هل أنت متأكد من حذف هذا القسم؟'
            : 'Are you sure you want to delete this blog category?'
        }
        itemName={deleteTarget ? (isAr ? deleteTarget.name_ar : deleteTarget.name_en) : ''}
        confirmLabel={isAr ? 'نعم، احذف' : 'Delete'}
        cancelLabel={isAr ? 'إلغاء' : 'Cancel'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
