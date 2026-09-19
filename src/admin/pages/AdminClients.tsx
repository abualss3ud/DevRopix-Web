import React, { useState, useEffect } from 'react';
import { Users, Plus, Search, Edit2, Trash2, Save, X, ExternalLink } from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';
import { ClientPartnerItem } from '../../types';
import { useToast } from '../context/ToastContext';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

interface AdminClientsProps {
  language: 'en' | 'ar';
  highlightId?: string;
}

export const AdminClients: React.FC<AdminClientsProps> = ({ language, highlightId }) => {
  const isAr = language === 'ar';
  const { showToast } = useToast();
  const [, setTick] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientPartnerItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ClientPartnerItem | null>(null);

  const [formData, setFormData] = useState<Omit<ClientPartnerItem, 'id'>>({
    name: '',
    logo: '',
    url: '',
    order: 1,
  });

  useEffect(() => {
    return cmsStore.subscribe(() => setTick((t) => t + 1));
  }, []);

  const clients = cmsStore.getClients();

  useEffect(() => {
    if (highlightId) {
      const found = clients.find((c) => c.id === highlightId);
      if (found) handleOpenEdit(found);
    }
  }, [highlightId]);

  const filteredClients = clients
    .filter((c) => {
      if (!searchQuery.trim()) return true;
      return (c.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleOpenCreate = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      url: 'https://example.com',
      order: clients.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: ClientPartnerItem) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      logo: client.logo,
      url: client.url || '',
      order: client.order,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !(formData.logo || '').trim()) {
      showToast(isAr ? 'يرجى إدخال اسم العميل وشعار الشركة' : 'Please provide client name and logo', 'error');
      return;
    }

    if (editingClient) {
      cmsStore.updateClient(editingClient.id, formData);
      showToast(isAr ? 'تم تحديث العميل بنجاح' : 'Client updated successfully', 'success');
    } else {
      cmsStore.createClient(formData);
      showToast(isAr ? 'تم إضافة العميل بنجاح' : 'Client partner added successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      cmsStore.deleteClient(deleteTarget.id);
      showToast(isAr ? 'تم حذف العميل' : 'Client removed', 'success');
      setDeleteTarget(null);
    }
  };

  return (
    <div id="admin-clients-page" className="p-4 sm:p-6 lg:p-8 space-y-6 text-start max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#27272a]">
            {isAr ? 'الشركاء والعملاء' : 'Clients & Partners'}
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            {isAr
              ? 'إدارة شعارات الشركات في قسم "شركاء النجاح" بالصفحة الرئيسية'
              : 'Manage company brand logos displayed in the Trusted By section'}
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-xs active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إضافة شريك جديد' : 'New Client'}</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#e4e4e7] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#71717a] absolute inset-y-0 left-3 my-auto pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث عن عميل أو شريك...' : 'Search clients...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredClients.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-[#71717a] bg-white rounded-2xl border border-[#e4e4e7]">
            <Users className="w-8 h-8 mx-auto text-[#d4d4d8] mb-2" />
            <p className="font-semibold">{isAr ? 'لا يوجد عملاء' : 'No clients found'}</p>
          </div>
        ) : (
          filteredClients.map((client) => (
            <div
              key={client.id}
              className="p-4 rounded-2xl border border-[#e4e4e7] bg-white hover:border-[#6a5ed9]/50 hover:shadow-md transition-all flex flex-col items-center justify-between text-center space-y-3 group"
            >
              <div className="w-full h-16 rounded-xl bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center p-2 overflow-hidden">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                />
              </div>

              <div>
                <p className="text-xs font-bold text-[#27272a] truncate">{client.name}</p>
                <p className="text-[10px] text-[#71717a] font-mono">Order #{client.order}</p>
              </div>

              <div className="flex items-center gap-1 pt-1 border-t border-[#e4e4e7] w-full justify-center">
                {client.url && (
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded text-[#71717a] hover:text-[#6a5ed9]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => handleOpenEdit(client)}
                  className="p-1 rounded text-[#71717a] hover:text-[#6a5ed9] cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget(client)}
                  className="p-1 rounded text-[#71717a] hover:text-red-600 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="client-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        >
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#e4e4e7] p-6 shadow-2xl space-y-5 text-start">
            <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
              <h3 className="text-base font-bold text-[#27272a]">
                {editingClient ? (isAr ? 'تعديل الشريك' : 'Edit Client') : (isAr ? 'إضافة شريك جديد' : 'New Client')}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-[#71717a] hover:bg-[#f4f4f5]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apex Global"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:border-[#6a5ed9]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Logo Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Website URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Display Order</label>
                <input
                  type="number"
                  min={1}
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
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
                  <span>{isAr ? 'حفظ الشريك' : 'Save Client'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        title={isAr ? 'حذف الشريك' : 'Delete Client'}
        message={isAr ? 'هل أنت متأكد من حذف هذا الشريك؟' : 'Are you sure you want to delete this partner?'}
        itemName={deleteTarget?.name}
        confirmLabel={isAr ? 'نعم، احذف' : 'Delete'}
        cancelLabel={isAr ? 'إلغاء' : 'Cancel'}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
