import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Search,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Eye,
  Upload,
  X,
  FileImage,
} from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';
import { MediaItem } from '../../types';
import { useToast } from '../context/ToastContext';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

interface AdminMediaProps {
  language: 'en' | 'ar';
}

export const AdminMedia: React.FC<AdminMediaProps> = ({ language }) => {
  const isAr = language === 'ar';
  const { showToast } = useToast();
  const [, setTick] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);

  const [newMediaData, setNewMediaData] = useState({
    title: '',
    url: '',
    alt: '',
    size: '1.2 MB',
    dimensions: '1920x1080',
  });

  useEffect(() => {
    return cmsStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  const mediaList = cmsStore.getMediaList();

  const filteredMedia = mediaList.filter((m: MediaItem) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const title = (m.title || m.name || '').toLowerCase();
    const alt = (m.alt || '').toLowerCase();
    return title.includes(q) || alt.includes(q);
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast(isAr ? 'تم نسخ رابط الصورة بنجاح' : 'Image URL copied to clipboard', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaData.title.trim() || !newMediaData.url.trim()) {
      showToast(isAr ? 'يرجى إدخال اسم ورابط الصورة' : 'Please provide title and URL', 'error');
      return;
    }

    cmsStore.addMedia({
      ...newMediaData,
      name: newMediaData.title,
      type: 'image',
    });
    showToast(isAr ? 'تم إضافة الملف إلى مكتبة الوسائط' : 'Asset added to media library', 'success');
    setIsUploadModalOpen(false);
    setNewMediaData({ title: '', url: '', alt: '', size: '1.2 MB', dimensions: '1920x1080' });
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      cmsStore.deleteMedia(deleteTarget.id);
      showToast(isAr ? 'تم حذف الملف' : 'Asset deleted', 'success');
      setDeleteTarget(null);
    }
  };

  return (
    <div id="admin-media-page" className="p-4 sm:p-6 lg:p-8 space-y-6 text-start max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#27272a]">
            {isAr ? 'مكتبة الوسائط والملفات' : 'Media Library'}
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            {isAr
              ? `إجمالي ${mediaList.length} ملف • استعراض ونسخ روابط الصور لاستخدامها في المقالات والخدمات`
              : `${mediaList.length} assets • Upload, manage, and copy URLs for projects, blog, and services`}
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-xs active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>{isAr ? 'إضافة وسائط جديدة' : 'Add Media Asset'}</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#e4e4e7] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#71717a] absolute inset-y-0 left-3 my-auto pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث في أسماء الصور...' : 'Search media by title...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-[#71717a] bg-white rounded-2xl border border-[#e4e4e7]">
            <FileImage className="w-8 h-8 mx-auto text-[#d4d4d8] mb-2" />
            <p className="font-semibold">{isAr ? 'لا توجد وسائط مطابقة' : 'No media assets found'}</p>
          </div>
        ) : (
          filteredMedia.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#e4e4e7] bg-white overflow-hidden hover:border-[#6a5ed9]/60 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              {/* Thumbnail */}
              <div className="relative h-36 w-full bg-[#fafafa] overflow-hidden">
                <img
                  src={item.url}
                  alt={item.alt || item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPreviewMedia(item)}
                    className="p-2 rounded-xl bg-white/90 text-[#27272a] hover:bg-white transition-colors cursor-pointer shadow-sm"
                    title="View Image"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="p-2 rounded-xl bg-white/90 text-[#27272a] hover:bg-white transition-colors cursor-pointer shadow-sm"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-2 rounded-xl bg-white/90 text-red-600 hover:bg-white transition-colors cursor-pointer shadow-sm"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Info footer */}
              <div className="p-3 space-y-1">
                <p className="text-xs font-semibold text-[#27272a] truncate">{item.title}</p>
                <div className="flex items-center justify-between text-[10px] text-[#71717a] font-mono">
                  <span>{item.dimensions || 'Image'}</span>
                  <span>{item.size || 'Web'}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload/Add Modal */}
      {isUploadModalOpen && (
        <div
          id="media-upload-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg bg-white rounded-2xl border border-[#e4e4e7] p-6 shadow-2xl space-y-5 text-start">
            <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
              <h3 className="text-base font-bold text-[#27272a]">
                {isAr ? 'إضافة ملف وسائط جديد' : 'Add Media Asset'}
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f4f5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Asset Title *</label>
                <input
                  type="text"
                  required
                  value={newMediaData.title}
                  onChange={(e) => setNewMediaData({ ...newMediaData, title: e.target.value })}
                  placeholder="e.g. Hero Tech Banner 2025"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Image Direct URL *</label>
                <input
                  type="url"
                  required
                  value={newMediaData.url}
                  onChange={(e) => setNewMediaData({ ...newMediaData, url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Alt Text (for SEO & Accessibility)</label>
                <input
                  type="text"
                  value={newMediaData.alt}
                  onChange={(e) => setNewMediaData({ ...newMediaData, alt: e.target.value })}
                  placeholder="e.g. High performance web dashboard preview"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">Dimensions</label>
                  <input
                    type="text"
                    value={newMediaData.dimensions}
                    onChange={(e) => setNewMediaData({ ...newMediaData, dimensions: e.target.value })}
                    placeholder="1920x1080"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a]">File Size</label>
                  <input
                    type="text"
                    value={newMediaData.size}
                    onChange={(e) => setNewMediaData({ ...newMediaData, size: e.target.value })}
                    placeholder="1.2 MB"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e4e4e7]">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-[#e4e4e7]"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl bg-[#6a5ed9] text-white"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إضافة إلى المكتبة' : 'Add to Library'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewMedia && (
        <div
          id="media-preview-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setPreviewMedia(null)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl space-y-4 p-5 text-start"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#27272a]">{previewMedia.title}</h3>
                <p className="text-[11px] text-[#71717a] font-mono">{previewMedia.dimensions} • {previewMedia.size}</p>
              </div>
              <button
                onClick={() => setPreviewMedia(null)}
                className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f4f5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center">
              <img
                src={previewMedia.url}
                alt={previewMedia.title}
                className="max-h-[55vh] max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <input
                type="text"
                readOnly
                value={previewMedia.url}
                className="flex-1 mr-2 px-3 py-1.5 text-xs bg-[#fafafa] border border-[#e4e4e7] rounded-lg font-mono text-[#52525b]"
              />
              <button
                onClick={() => handleCopyUrl(previewMedia.url, previewMedia.id)}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#6a5ed9] text-white hover:bg-[#584dc7] cursor-pointer shrink-0"
              >
                {copiedId === previewMedia.id ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        title={isAr ? 'حذف ملف الوسائط' : 'Delete Asset'}
        message={isAr ? 'هل أنت متأكد من رغبتك في حذف هذا الملف؟' : 'Are you sure you want to delete this media item?'}
        itemName={deleteTarget?.title}
        confirmLabel={isAr ? 'نعم، احذف' : 'Delete'}
        cancelLabel={isAr ? 'إلغاء' : 'Cancel'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
