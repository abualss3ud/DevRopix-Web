import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
  Eye,
  Save,
  X,
  Clock,
  User,
} from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';
import { BlogPostItem } from '../../types';
import { useToast } from '../context/ToastContext';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { SeoFields } from '../components/SeoFields';
import { RichTextEditor } from '../components/RichTextEditor';

interface AdminBlogProps {
  language: 'en' | 'ar';
  highlightId?: string;
}

export const AdminBlog: React.FC<AdminBlogProps> = ({ language, highlightId }) => {
  const isAr = language === 'ar';
  const { showToast } = useToast();
  const [, setTick] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPostItem | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'author' | 'seo'>('content');

  interface BlogFormData {
    title_en: string;
    title_ar: string;
    slug: string;
    excerpt_en: string;
    excerpt_ar: string;
    content_en: string;
    content_ar: string;
    coverImage: string;
    category: string;
    author: {
      name: string;
      avatar: string;
      role: string;
    };
    tags: string[];
    readTime_en: string;
    readTime_ar: string;
    status: 'published' | 'draft';
    featured: boolean;
    order: number;
    seoTitle: string;
    seoDescription: string;
    keywords: string;
    canonicalUrl: string;
  }

  // Form State
  const [formData, setFormData] = useState<BlogFormData>({
    title_en: '',
    title_ar: '',
    slug: '',
    excerpt_en: '',
    excerpt_ar: '',
    content_en: '',
    content_ar: '',
    coverImage: '',
    category: 'Engineering',
    author: {
      name: 'DevRopix Tech Team',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      role: 'Staff Engineers',
    },
    tags: [],
    readTime_en: '5 min read',
    readTime_ar: '5 دقائق قراءة',
    status: 'published',
    featured: false,
    order: 1,
    seoTitle: '',
    seoDescription: '',
    keywords: '',
    canonicalUrl: '',
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    return cmsStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  const blogPosts = cmsStore.getBlogPosts();
  const categories = cmsStore.getBlogCategories();

  useEffect(() => {
    if (highlightId) {
      const found = blogPosts.find((b) => b.id === highlightId);
      if (found) {
        handleOpenEdit(found);
      }
    }
  }, [highlightId]);

  const filteredPosts = blogPosts
    .filter((p) => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (p.title_en || '').toLowerCase().includes(q) ||
        (p.title_ar || '').toLowerCase().includes(q) ||
        (p.excerpt_en || '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleOpenCreate = () => {
    setEditingPost(null);
    setActiveTab('content');
    setFormData({
      title_en: '',
      title_ar: '',
      slug: '',
      excerpt_en: '',
      excerpt_ar: '',
      content_en: '# Heading 1\n\nWrite article content here...',
      content_ar: '# عنوان المقال الأول\n\nاكتب محتوى المقال هنا...',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      category: categories[0]?.name_en || 'Engineering',
      author: {
        name: 'DevRopix Tech Team',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        role: 'Engineering Lead',
      },
      tags: ['Architecture', 'TypeScript', 'Best Practices'],
      readTime_en: '6 min read',
      readTime_ar: '6 دقائق قراءة',
      status: 'published',
      featured: false,
      order: blogPosts.length + 1,
      seoTitle: '',
      seoDescription: '',
      keywords: 'software, architecture, react, devropix',
      canonicalUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPostItem) => {
    setEditingPost(post);
    setActiveTab('content');
    setFormData({
      title_en: post.title_en || '',
      title_ar: post.title_ar || '',
      slug: post.slug || '',
      excerpt_en: post.excerpt_en || '',
      excerpt_ar: post.excerpt_ar || '',
      content_en: Array.isArray(post.content_en) ? post.content_en.join('\n\n') : (post.content_en || ''),
      content_ar: Array.isArray(post.content_ar) ? post.content_ar.join('\n\n') : (post.content_ar || ''),
      coverImage: post.coverImage || post.featuredImage || '',
      category: post.category || 'Engineering',
      author: {
        name: post.author?.name || 'DevRopix Tech Team',
        avatar: post.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        role: post.author?.role || 'Staff Engineers',
      },
      tags: [...(post.tags || [])],
      readTime_en: post.readTime_en || '5 min read',
      readTime_ar: post.readTime_ar || '5 دقائق قراءة',
      status: post.status || 'published',
      featured: !!post.featured,
      order: post.order || 1,
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
      keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : (post.keywords || ''),
      canonicalUrl: post.canonicalUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title_en.trim() || !formData.title_ar.trim()) {
      showToast(isAr ? 'يرجى إدخال عنوان المقال باللغتين' : 'Please provide article titles in both languages', 'error');
      return;
    }

    const cleanSlug =
      formData.slug.trim() ||
      formData.title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const finalData = { ...formData, slug: cleanSlug };

    if (editingPost) {
      cmsStore.updateBlogPost(editingPost.id, finalData as unknown as Partial<BlogPostItem>);
      showToast(isAr ? 'تم تحديث المقال بنجاح' : 'Blog post updated successfully', 'success');
    } else {
      cmsStore.createBlogPost(finalData as unknown as Omit<BlogPostItem, 'id' | 'createdAt' | 'updatedAt'>);
      showToast(isAr ? 'تم نشر المقال بنجاح' : 'New article created successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      cmsStore.deleteBlogPost(deleteTarget.id);
      showToast(isAr ? 'تم حذف المقال' : 'Article deleted', 'success');
      setDeleteTarget(null);
    }
  };

  const togglePublish = (post: BlogPostItem) => {
    cmsStore.toggleBlogPostPublish(post.id);
    showToast(
      isAr
        ? post.status === 'published'
          ? 'تم نقل المقال للمسودات'
          : 'تم نشر المقال'
        : `Post marked as ${post.status === 'published' ? 'Draft' : 'Published'}`,
      'info'
    );
  };

  const toggleFeatured = (post: BlogPostItem) => {
    cmsStore.toggleBlogPostFeatured(post.id);
    showToast(
      isAr
        ? post.featured
          ? 'تم إلغاء تمييز المقال'
          : 'تم تمييز المقال في الصفحة الرئيسية'
        : `Post ${post.featured ? 'unfeatured' : 'marked as featured'}`,
      'info'
    );
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData((prev) => ({ ...prev, tags: [...(prev.tags || []), tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (idx: number) => {
    setFormData((prev) => ({ ...prev, tags: (prev.tags || []).filter((_: string, i: number) => i !== idx) }));
  };

  return (
    <div id="admin-blog-page" className="p-4 sm:p-6 lg:p-8 space-y-6 text-start max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#27272a]">
            {isAr ? 'مقالات المدونة والرؤى الهندسية' : 'Blog Articles & Insights'}
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            {isAr
              ? `إجمالي ${blogPosts.length} مقال • محرر متكامل للمحتوى، الكُتّاب، وتحسين السيو`
              : `${blogPosts.length} total articles • Full markdown rich text & metadata controls`}
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-xs active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'كتابة مقال جديد' : 'Write New Article'}</span>
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
            placeholder={isAr ? 'ابحث في المقالات...' : 'Search articles...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] focus:outline-none focus:border-[#6a5ed9] cursor-pointer"
          >
            <option value="all">{isAr ? 'جميع الأقسام' : 'All Categories'}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name_en}>
                {isAr ? c.name_ar : c.name_en}
              </option>
            ))}
          </select>

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

      {/* Blog Table */}
      <div className="rounded-2xl border border-[#e4e4e7] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#e4e4e7] font-semibold">
              <tr>
                <th className="py-3.5 px-4 text-start">{isAr ? 'المقال' : 'Article'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'القسم' : 'Category'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'الكاتب' : 'Author'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'مميز' : 'Featured'}</th>
                <th className="py-3.5 px-4 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e4e7] text-[#27272a]">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-[#71717a]">
                    <FileText className="w-8 h-8 mx-auto text-[#d4d4d8] mb-2" />
                    <p className="font-semibold">{isAr ? 'لا توجد مقالات مطابقة' : 'No articles found'}</p>
                    <button
                      onClick={handleOpenCreate}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6a5ed9] text-white text-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAr ? 'إضافة مقال جديد' : 'Write Article'}</span>
                    </button>
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.coverImage || post.featuredImage}
                          alt={post.title_en || 'Article'}
                          className="w-12 h-9 rounded-lg object-cover border border-[#e4e4e7] shrink-0"
                        />
                        <div>
                          <p className="font-bold text-[#27272a]">{isAr ? post.title_ar : post.title_en}</p>
                          <p className="text-[11px] text-[#71717a] line-clamp-1 max-w-xs">
                            {isAr ? post.excerpt_ar : post.excerpt_en}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-50 text-[#1bb152] border border-emerald-200">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#27272a]">{post.author?.name || 'DevRopix Team'}</p>
                      <p className="text-[10px] text-[#71717a]">{isAr ? post.readTime_ar : post.readTime_en}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePublish(post)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                          post.status === 'published'
                            ? 'bg-emerald-50 text-[#1bb152] border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-[#71717a] border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {post.status === 'published' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        <span>{post.status === 'published' ? (isAr ? 'منشور' : 'Published') : (isAr ? 'مسودة' : 'Draft')}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleFeatured(post)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          post.featured ? 'text-amber-500 bg-amber-50' : 'text-[#a1a1aa] hover:text-[#27272a]'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-4 h-4 ${post.featured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 rounded-lg text-[#52525b] hover:text-[#6a5ed9] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
                          title={isAr ? 'تعديل' : 'Edit'}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(post)}
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

      {/* Modal with Tabs */}
      {isModalOpen && (
        <div
          id="blog-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            className="w-full max-w-4xl bg-white rounded-2xl border border-[#e4e4e7] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-start"
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#27272a]">
                  {editingPost ? (isAr ? 'تعديل المقال' : 'Edit Article') : (isAr ? 'كتابة مقال جديد' : 'New Article')}
                </h3>
                <p className="text-xs text-[#71717a] mt-0.5">
                  {isAr ? 'محرر منسق يدعم المقالات التقنية وتنسيق Markdown' : 'Rich article publishing with Markdown support'}
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
                onClick={() => setActiveTab('content')}
                className={`px-3.5 py-2 text-xs font-semibold border-b-2 -mb-[1px] transition-colors cursor-pointer ${
                  activeTab === 'content'
                    ? 'border-[#6a5ed9] text-[#6a5ed9]'
                    : 'border-transparent text-[#71717a] hover:text-[#27272a]'
                }`}
              >
                {isAr ? 'المحتوى والنصوص' : 'Content & Texts'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('author')}
                className={`px-3.5 py-2 text-xs font-semibold border-b-2 -mb-[1px] transition-colors cursor-pointer ${
                  activeTab === 'author'
                    ? 'border-[#6a5ed9] text-[#6a5ed9]'
                    : 'border-transparent text-[#71717a] hover:text-[#27272a]'
                }`}
              >
                {isAr ? 'الكاتب والوسوم' : 'Author & Tags'}
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
              {/* TAB 1: CONTENT */}
              {activeTab === 'content' && (
                <div className="space-y-4 animate-in fade-in duration-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Article Title (EN) *</label>
                      <input
                        type="text"
                        required
                        value={formData.title_en}
                        onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                        placeholder="e.g. Modern Web Architecture Patterns"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">عنوان المقال (AR) *</label>
                      <input
                        type="text"
                        required
                        dir="rtl"
                        value={formData.title_ar}
                        onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                        placeholder="مثال: أنماط المعمارية البرمجية الحديثة"
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
                      <label className="text-xs font-semibold text-[#27272a]">Cover Image URL *</label>
                      <input
                        type="url"
                        required
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">URL Slug</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="modern-web-architecture"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                      />
                    </div>
                  </div>

                  {/* Excerpts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Excerpt / Lead (EN)</label>
                      <textarea
                        rows={2}
                        value={formData.excerpt_en}
                        onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                        placeholder="Brief summary..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">المقدمة والموجز (AR)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={formData.excerpt_ar}
                        onChange={(e) => setFormData({ ...formData, excerpt_ar: e.target.value })}
                        placeholder="ملخص قصير للمقال..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                    </div>
                  </div>

                  {/* Rich Text Editors */}
                  <RichTextEditor
                    label="Article Content (Markdown EN)"
                    value={formData.content_en}
                    onChange={(val) => setFormData({ ...formData, content_en: val })}
                  />
                  <RichTextEditor
                    label="محتوى المقال (Markdown AR)"
                    value={formData.content_ar}
                    onChange={(val) => setFormData({ ...formData, content_ar: val })}
                  />
                </div>
              )}

              {/* TAB 2: AUTHOR & TAGS */}
              {activeTab === 'author' && (
                <div className="space-y-5 animate-in fade-in duration-100">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Author Name</label>
                      <input
                        type="text"
                        value={formData.author.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            author: { ...formData.author, name: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Author Role</label>
                      <input
                        type="text"
                        value={formData.author.role}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            author: { ...formData.author, role: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Author Avatar URL</label>
                      <input
                        type="url"
                        value={formData.author.avatar}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            author: { ...formData.author, avatar: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">Reading Time (EN)</label>
                      <input
                        type="text"
                        value={formData.readTime_en}
                        onChange={(e) => setFormData({ ...formData, readTime_en: e.target.value })}
                        placeholder="5 min read"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#27272a]">وقت القراءة (AR)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={formData.readTime_ar}
                        onChange={(e) => setFormData({ ...formData, readTime_ar: e.target.value })}
                        placeholder="5 دقائق قراءة"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2 pt-2 border-t border-[#e4e4e7]">
                    <label className="text-xs font-semibold text-[#27272a]">Article Tags</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tag and press Add"
                        className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                      />
                      <button type="button" onClick={addTag} className="px-3.5 py-2 text-xs rounded-xl bg-[#f4f4f5]">
                        Add Tag
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(formData.tags || []).map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-emerald-50 text-[#1bb152] border border-emerald-200"
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

              {/* TAB 3: SEO */}
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

              {/* Bottom Publishing Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7]">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-xs font-medium text-[#27272a] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.status === 'published'}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })
                      }
                      className="w-4 h-4 rounded text-[#6a5ed9]"
                    />
                    <span>{isAr ? 'نشر المقال' : 'Publish Article'}</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-medium text-[#27272a] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#6a5ed9]"
                    />
                    <span>{isAr ? 'عرض في المقالات المميزة' : 'Featured Article'}</span>
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
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-[#e4e4e7]"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl bg-[#6a5ed9] text-white hover:bg-[#584dc7] shadow-xs active:scale-98 transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isAr ? 'حفظ المقال' : 'Save Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        title={isAr ? 'تأكيد حذف المقال' : 'Delete Article'}
        message={
          isAr
            ? 'هل أنت متأكد من حذف هذا المقال من المدونة؟ لن يتمكن الزوار من قراءته بعد الآن.'
            : 'Are you sure you want to delete this article? It will be removed from the blog.'
        }
        itemName={deleteTarget ? (isAr ? deleteTarget.title_ar : deleteTarget.title_en) : ''}
        confirmLabel={isAr ? 'نعم، احذف المقال' : 'Delete Article'}
        cancelLabel={isAr ? 'إلغاء' : 'Cancel'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
