import React, { useState, useEffect } from 'react';
import {
  Settings,
  Building,
  Share2,
  Globe,
  Database,
  Save,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';
import { SiteSettings } from '../../types';
import { useToast } from '../context/ToastContext';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

interface AdminSettingsProps {
  language: 'en' | 'ar';
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ language }) => {
  const isAr = language === 'ar';
  const { showToast } = useToast();
  const [, setTick] = useState(0);

  const [activeTab, setActiveTab] = useState<'general' | 'social' | 'seo' | 'database'>('general');
  const [settings, setSettings] = useState<SiteSettings>(cmsStore.getSettings());
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    return cmsStore.subscribe(() => {
      setTick((t) => t + 1);
      setSettings(cmsStore.getSettings());
    });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.updateSettings(settings);
    showToast(isAr ? 'تم حفظ الإعدادات العامة للموقع' : 'Global site settings saved successfully', 'success');
  };

  const handleExportBackup = () => {
    const dataStr = cmsStore.exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devropix-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(isAr ? 'تم تنزيل نسخة احتياطية من قاعدة البيانات' : 'CMS database backup exported', 'success');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = cmsStore.importAllData(content);
      if (success) {
        showToast(isAr ? 'تم استيراد البيانات بنجاح' : 'Database imported successfully', 'success');
      } else {
        showToast(isAr ? 'فشل استيراد الملف: تنسيق غير صالح' : 'Failed to import backup: Invalid JSON format', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetConfirm = () => {
    cmsStore.resetToDefaults();
    setIsResetModalOpen(false);
    showToast(isAr ? 'تمت استعادة إعدادات المصنع والبيانات الأولية' : 'Factory default CMS content restored', 'success');
  };

  return (
    <div id="admin-settings-page" className="p-4 sm:p-6 lg:p-8 space-y-6 text-start max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#27272a]">
            {isAr ? 'إعدادات النظام والموقع' : 'Global System Settings'}
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            {isAr
              ? 'معلومات الشركة، الروابط الاجتماعية، النسخ الاحتياطي، وضبط السيو العام'
              : 'Company identity, contact info, social links, SEO defaults, and database backups'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-xs active:scale-98 transition-all cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isAr ? 'حفظ الإعدادات' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e4e4e7] gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-[1px] flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'general'
              ? 'border-[#6a5ed9] text-[#6a5ed9]'
              : 'border-transparent text-[#71717a] hover:text-[#27272a]'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>{isAr ? 'بيانات الشركة والهوية' : 'Company Profile'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-[1px] flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'social'
              ? 'border-[#6a5ed9] text-[#6a5ed9]'
              : 'border-transparent text-[#71717a] hover:text-[#27272a]'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>{isAr ? 'قنوات التواصل الاجتماعي' : 'Social Channels'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-[1px] flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'seo'
              ? 'border-[#6a5ed9] text-[#6a5ed9]'
              : 'border-transparent text-[#71717a] hover:text-[#27272a]'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>{isAr ? 'إعدادات SEO الافتراضية' : 'Default SEO & Meta'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-[1px] flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
            activeTab === 'database'
              ? 'border-[#6a5ed9] text-[#6a5ed9]'
              : 'border-transparent text-[#71717a] hover:text-[#27272a]'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>{isAr ? 'النسخ الاحتياطي وقاعدة البيانات' : 'Database & Backup'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: GENERAL */}
        {activeTab === 'general' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e4e7] space-y-6 animate-in fade-in duration-100 shadow-xs">
            <h3 className="text-sm font-bold text-[#27272a] border-b border-[#e4e4e7] pb-3">
              {isAr ? 'معلومات الشركة الرسمية وبيانات التواصل' : 'Company Name & Official Contact Information'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Company Name (EN)</label>
                <input
                  type="text"
                  value={settings.companyName_en}
                  onChange={(e) => setSettings({ ...settings, companyName_en: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">اسم الشركة (AR)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={settings.companyName_ar}
                  onChange={(e) => setSettings({ ...settings, companyName_ar: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Slogan / Tagline (EN)</label>
                <input
                  type="text"
                  value={settings.slogan_en}
                  onChange={(e) => setSettings({ ...settings, slogan_en: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">الشعار / الشعار اللفظي (AR)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={settings.slogan_ar}
                  onChange={(e) => setSettings({ ...settings, slogan_ar: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Contact Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Phone Number</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Address (EN)</label>
                <input
                  type="text"
                  value={settings.address_en}
                  onChange={(e) => setSettings({ ...settings, address_en: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">العنوان والمقر (AR)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={settings.address_ar}
                  onChange={(e) => setSettings({ ...settings, address_ar: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SOCIAL */}
        {activeTab === 'social' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e4e7] space-y-6 animate-in fade-in duration-100 shadow-xs">
            <h3 className="text-sm font-bold text-[#27272a] border-b border-[#e4e4e7] pb-3">
              {isAr ? 'روابط شبكات التواصل الرسمية' : 'Official Social Profiles & Developer Channels'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">GitHub Organization URL</label>
                <input
                  type="url"
                  value={settings.socialLinks?.github || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...(settings.socialLinks || {}), github: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">LinkedIn Company Page</label>
                <input
                  type="url"
                  value={settings.socialLinks?.linkedin || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...(settings.socialLinks || {}), linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Twitter / X Handle URL</label>
                <input
                  type="url"
                  value={settings.socialLinks?.twitter || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...(settings.socialLinks || {}), twitter: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Discord Community Invite</label>
                <input
                  type="url"
                  value={settings.socialLinks?.discord || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...(settings.socialLinks || {}), discord: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Dribbble Portfolio URL</label>
                <input
                  type="url"
                  value={settings.socialLinks?.dribbble || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...(settings.socialLinks || {}), dribbble: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">YouTube Channel URL</label>
                <input
                  type="url"
                  value={settings.socialLinks?.youtube || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...(settings.socialLinks || {}), youtube: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SEO */}
        {activeTab === 'seo' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e4e7] space-y-6 animate-in fade-in duration-100 shadow-xs">
            <h3 className="text-sm font-bold text-[#27272a] border-b border-[#e4e4e7] pb-3">
              {isAr ? 'إعدادات محركات البحث العامة (Default Meta Tags)' : 'Default Website SEO & OpenGraph Configuration'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Default Meta Title (EN)</label>
                <input
                  type="text"
                  value={settings.defaultMetaTitle_en}
                  onChange={(e) => setSettings({ ...settings, defaultMetaTitle_en: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">عنوان السيو الافتراضي (AR)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={settings.defaultMetaTitle_ar}
                  onChange={(e) => setSettings({ ...settings, defaultMetaTitle_ar: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">Default Meta Description (EN)</label>
                <textarea
                  rows={3}
                  value={settings.defaultMetaDescription_en}
                  onChange={(e) =>
                    setSettings({ ...settings, defaultMetaDescription_en: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">وصف السيو الافتراضي (AR)</label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={settings.defaultMetaDescription_ar}
                  onChange={(e) =>
                    setSettings({ ...settings, defaultMetaDescription_ar: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DATABASE & BACKUP */}
        {activeTab === 'database' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e4e7] space-y-6 animate-in fade-in duration-100 shadow-xs">
            <h3 className="text-sm font-bold text-[#27272a] border-b border-[#e4e4e7] pb-3">
              {isAr ? 'إدارة قاعدة بيانات CMS والنسخ الاحتياطي' : 'Database Storage, Export & Factory Reset'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Export */}
              <div className="p-5 rounded-2xl border border-[#e4e4e7] bg-[#fafafa] space-y-3">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-[#6a5ed9]" />
                  <h4 className="text-xs font-bold text-[#27272a]">
                    {isAr ? 'تصدير نسخة احتياطية كاملة' : 'Export Full JSON Backup'}
                  </h4>
                </div>
                <p className="text-xs text-[#71717a]">
                  {isAr
                    ? 'قم بتنزيل كافة بيانات الموقع (المشاريع، الخدمات، المقالات، والرسائل) في ملف JSON آمن'
                    : 'Download all website collections (Services, Projects, Blog, Messages, Settings) as a JSON file'}
                </p>
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#e4e4e7] text-xs font-semibold text-[#27272a] hover:border-[#6a5ed9] transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isAr ? 'تنزيل ملف النسخة الاحتياطية' : 'Download Backup JSON'}</span>
                </button>
              </div>

              {/* Import */}
              <div className="p-5 rounded-2xl border border-[#e4e4e7] bg-[#fafafa] space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#6a5ed9]" />
                  <h4 className="text-xs font-bold text-[#27272a]">
                    {isAr ? 'استيراد نسخة احتياطية' : 'Import JSON Database'}
                  </h4>
                </div>
                <p className="text-xs text-[#71717a]">
                  {isAr
                    ? 'استرجاع كافة بيانات الموقع من ملف JSON احتياطي تم تنزيله مسبقاً'
                    : 'Restore all website collections from a valid JSON backup file'}
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#e4e4e7] text-xs font-semibold text-[#27272a] hover:border-[#6a5ed9] transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>{isAr ? 'اختيار ملف الاستيراد' : 'Select Backup File'}</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Factory Reset Danger Zone */}
            <div className="p-5 rounded-2xl border border-red-200 bg-red-50/40 space-y-3">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <h4 className="text-xs font-bold">{isAr ? 'منطقة الحذر: إعادة ضبط المصنع' : 'Danger Zone: Factory Reset CMS'}</h4>
              </div>
              <p className="text-xs text-[#71717a]">
                {isAr
                  ? 'سيتم مسح كافة التعديلات والتخصيصات وإعادة تعيين المحتوى الأولي والخدمات والمشاريع الافتراضية للشركة.'
                  : 'Revert all CMS collections, services, and projects back to their initial seed state.'}
              </p>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{isAr ? 'استعادة إعدادات المصنع الافتراضية' : 'Reset to Factory Defaults'}</span>
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Reset Confirm Modal */}
      <DeleteConfirmModal
        isOpen={isResetModalOpen}
        title={isAr ? 'تأكيد إعادة ضبط المصنع' : 'Confirm Factory Reset'}
        message={
          isAr
            ? 'هل أنت متأكد تماماً من رغبتك في إعادة تعيين كافة بيانات الموقع إلى حالتها الأصلية؟ سيتم فقدان التعديلات غير المحفوظة في ملف خارجي.'
            : 'Are you sure you want to reset all CMS data back to original defaults?'
        }
        itemName={isAr ? 'كافة بيانات الموقع' : 'Entire CMS Database'}
        confirmLabel={isAr ? 'نعم، أعد الضبط' : 'Reset Everything'}
        cancelLabel={isAr ? 'إلغاء' : 'Cancel'}
        onConfirm={handleResetConfirm}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </div>
  );
};
