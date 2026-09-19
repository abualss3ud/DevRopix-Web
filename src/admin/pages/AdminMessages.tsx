import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Trash2,
  Mail,
  MailCheck,
  CheckCircle,
  Archive,
  Eye,
  Reply,
  Calendar,
  Building,
  DollarSign,
  X,
  Phone,
} from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';
import { ContactMessageItem } from '../../types';
import { useToast } from '../context/ToastContext';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

interface AdminMessagesProps {
  language: 'en' | 'ar';
  highlightId?: string;
}

export const AdminMessages: React.FC<AdminMessagesProps> = ({ language, highlightId }) => {
  const isAr = language === 'ar';
  const { showToast } = useToast();
  const [, setTick] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied' | 'archived'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessageItem | null>(null);

  useEffect(() => {
    return cmsStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  const messages = cmsStore.getMessages();

  useEffect(() => {
    if (highlightId) {
      const found = messages.find((m) => m.id === highlightId);
      if (found) handleOpenMessage(found);
    }
  }, [highlightId]);

  const filteredMessages = messages.filter((m) => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.service.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q) ||
      (m.company && m.company.toLowerCase().includes(q))
    );
  });

  const handleOpenMessage = (msg: ContactMessageItem) => {
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      cmsStore.updateMessageStatus(msg.id, 'read');
    }
  };

  const handleStatusChange = (id: string, newStatus: 'unread' | 'read' | 'replied' | 'archived') => {
    cmsStore.updateMessageStatus(id, newStatus);
    showToast(isAr ? 'تم تحديث حالة الرسالة' : `Message status updated to ${newStatus}`, 'info');
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, status: newStatus });
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      cmsStore.deleteMessage(deleteTarget.id);
      showToast(isAr ? 'تم حذف الرسالة' : 'Message deleted', 'success');
      if (selectedMessage && selectedMessage.id === deleteTarget.id) {
        setSelectedMessage(null);
      }
      setDeleteTarget(null);
    }
  };

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div id="admin-messages-page" className="p-4 sm:p-6 lg:p-8 space-y-6 text-start max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#27272a]">
              {isAr ? 'صندوق رسائل التواصل والاستفسارات' : 'Contact Messages & Leads'}
            </h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#6a5ed9] text-white">
                {unreadCount} {isAr ? 'جديدة' : 'New'}
              </span>
            )}
          </div>
          <p className="text-xs text-[#71717a] mt-0.5">
            {isAr
              ? 'الرسائل وطلبات المشاريع الواردة من نموذج التواصل في الموقع'
              : 'Incoming project proposals and lead submissions from the contact form'}
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#e4e4e7] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#71717a] absolute inset-y-0 left-3 my-auto pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث بالاسم، البريد أو المحتوى...' : 'Search inquiries...'}
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
            <option value="all">{isAr ? 'جميع الرسائل' : 'All Messages'}</option>
            <option value="unread">{isAr ? 'غير مقروءة' : 'Unread'}</option>
            <option value="read">{isAr ? 'مقروءة' : 'Read'}</option>
            <option value="replied">{isAr ? 'تم الرد' : 'Replied'}</option>
            <option value="archived">{isAr ? 'مؤرشفة' : 'Archived'}</option>
          </select>
        </div>
      </div>

      {/* Messages Table */}
      <div className="rounded-2xl border border-[#e4e4e7] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-[#fafafa] text-[#71717a] border-b border-[#e4e4e7] font-semibold">
              <tr>
                <th className="py-3.5 px-4 text-start">{isAr ? 'المرسل' : 'Sender'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'الخدمة المطلوبة' : 'Requested Service'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'الميزانية / الشركة' : 'Budget / Company'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'التاريخ' : 'Date'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="py-3.5 px-4 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e4e7] text-[#27272a]">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-[#71717a]">
                    <MessageSquare className="w-8 h-8 mx-auto text-[#d4d4d8] mb-2" />
                    <p className="font-semibold">{isAr ? 'لا توجد رسائل' : 'No messages found'}</p>
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => handleOpenMessage(msg)}
                    className={`hover:bg-[#fafafa] transition-colors cursor-pointer ${
                      msg.status === 'unread' ? 'bg-purple-50/40 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        {msg.status === 'unread' ? (
                          <span className="w-2 h-2 rounded-full bg-[#6a5ed9] shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-transparent shrink-0" />
                        )}
                        <div>
                          <p className="text-xs font-bold text-[#27272a]">{msg.name}</p>
                          <p className="text-[11px] text-[#71717a]">{msg.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-[#52525b] border border-slate-200">
                        {msg.service}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-xs text-[#27272a]">{msg.company || 'Direct Client'}</p>
                      <p className="text-[10px] text-[#71717a] font-mono">{msg.budget || 'Custom'}</p>
                    </td>
                    <td className="py-3.5 px-4 text-[#71717a] font-mono text-[11px]">
                      {new Date(msg.createdAt).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          msg.status === 'unread'
                            ? 'bg-purple-100 text-[#6a5ed9]'
                            : msg.status === 'replied'
                            ? 'bg-emerald-100 text-emerald-700'
                            : msg.status === 'archived'
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {msg.status === 'unread'
                          ? isAr ? 'جديدة' : 'Unread'
                          : msg.status === 'replied'
                          ? isAr ? 'تم الرد' : 'Replied'
                          : msg.status === 'archived'
                          ? isAr ? 'مؤرشفة' : 'Archived'
                          : isAr ? 'مقروءة' : 'Read'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-end" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenMessage(msg)}
                          className="p-1.5 rounded-lg text-[#52525b] hover:text-[#6a5ed9] hover:bg-[#f4f4f5] cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(msg)}
                          className="p-1.5 rounded-lg text-[#52525b] hover:text-red-600 hover:bg-red-50 cursor-pointer"
                          title="Delete"
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

      {/* View Message Modal */}
      {selectedMessage && (
        <div
          id="message-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        >
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#e4e4e7] p-6 sm:p-8 shadow-2xl space-y-6 text-start max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#e4e4e7] pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#71717a]">
                  Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
                <h3 className="text-lg font-bold text-[#27272a]">{selectedMessage.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#52525b]">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="flex items-center gap-1 text-[#6a5ed9] hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedMessage.email}</span>
                  </a>
                  {selectedMessage.phone && (
                    <span className="flex items-center gap-1 text-[#71717a]">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedMessage.phone}</span>
                    </span>
                  )}
                  {selectedMessage.company && (
                    <span className="flex items-center gap-1 text-[#71717a]">
                      <Building className="w-3.5 h-3.5" />
                      <span>{selectedMessage.company}</span>
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-lg text-[#71717a] hover:bg-[#f4f4f5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inquired Scope details */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-xs">
              <div>
                <p className="text-[11px] text-[#71717a]">Service of Interest:</p>
                <p className="font-semibold text-[#27272a]">{selectedMessage.service}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#71717a]">Estimated Budget Range:</p>
                <p className="font-semibold text-[#27272a]">{selectedMessage.budget || 'Not specified'}</p>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                Message Content:
              </label>
              <div className="p-4 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-xs text-[#27272a] whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </div>
            </div>

            {/* Quick Status Bar & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#e4e4e7]">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#71717a]">Status:</span>
                <select
                  value={selectedMessage.status}
                  onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value as any)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-[#e4e4e7] bg-white cursor-pointer"
                >
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=DevRopix Inquiry Response: ${encodeURIComponent(selectedMessage.service)}`}
                  onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6a5ed9] text-white text-xs font-semibold hover:bg-[#584dc7] transition-colors cursor-pointer"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        title={isAr ? 'حذف الرسالة' : 'Delete Message'}
        message={isAr ? 'هل أنت متأكد من حذف هذه الرسالة بشكل نهائي؟' : 'Are you sure you want to delete this message?'}
        itemName={deleteTarget ? `${deleteTarget.name} (${deleteTarget.email})` : ''}
        confirmLabel={isAr ? 'نعم، احذف' : 'Delete'}
        cancelLabel={isAr ? 'إلغاء' : 'Cancel'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
