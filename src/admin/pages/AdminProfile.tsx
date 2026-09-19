import React, { useState, useRef } from 'react';
import {
  User,
  Lock,
  Save,
  Key,
  UserCheck,
  ShieldAlert,
  Upload,
} from 'lucide-react';
import { AuthService } from '../../services/authService';
import { useToast } from '../context/ToastContext';

interface AdminProfileProps {
  language: 'en' | 'ar';
}

export const AdminProfile: React.FC<AdminProfileProps> = ({ language }) => {
  const isAr = language === 'ar';
  const { showToast } = useToast();

  const user = AuthService.getCurrentUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile fields state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

  // Password fields state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        showToast(
          isAr ? 'حجم الصورة كبير جداً. الحد الأقصى هو 2 ميجابايت' : 'Image is too large. Max limit is 2MB',
          'error'
        );
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        showToast(
          isAr ? 'تم تحميل الصورة الشخصية مؤقتاً، اضغط "حفظ التعديلات" للتثبيت' : 'Avatar loaded temporarily. Click "Save Profile Details" to apply',
          'info'
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast(
        isAr ? 'الاسم والبريد الإلكتروني مطلوبان' : 'Name and email are required',
        'error'
      );
      return;
    }

    const res = AuthService.updateProfile(name, email, avatarUrl);
    if (res.success) {
      showToast(
        isAr ? 'تم تحديث بيانات الملف الشخصي بنجاح' : 'Profile updated successfully',
        'success'
      );
      // Refresh to make header sync up
      window.dispatchEvent(new Event('storage'));
    } else {
      showToast(res.error || (isAr ? 'فشل التحديث' : 'Failed to update'), 'error');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast(
        isAr ? 'يرجى ملء جميع حقول كلمة المرور' : 'Please fill in all password fields',
        'error'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast(
        isAr ? 'كلمة المرور الجديدة غير متطابقة' : 'New passwords do not match',
        'error'
      );
      return;
    }

    const res = AuthService.changePassword(currentPassword, newPassword);
    if (res.success) {
      showToast(
        isAr ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully',
        'success'
      );
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      showToast(res.error || (isAr ? 'فشل تغيير كلمة المرور' : 'Failed to change password'), 'error');
    }
  };

  return (
    <div id="admin-profile-page" className="p-4 sm:p-6 lg:p-8 space-y-6 text-start max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[#27272a]">
          {isAr ? 'إعدادات الملف الشخصي' : 'Profile Settings'}
        </h2>
        <p className="text-xs text-[#71717a] mt-0.5">
          {isAr
            ? 'تحديث معلوماتك الشخصية، البريد الإلكتروني وكلمة مرور حساب المشرف'
            : 'Update your personal details, email and administrative login password'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Avatar Preview */}
        <div className="bg-white p-6 rounded-2xl border border-[#e4e4e7] flex flex-col items-center justify-center text-center space-y-4 shadow-xs">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()} title={isAr ? 'اضغط لرفع صورة جديدة' : 'Click to upload a new image'}>
            <img
              src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
              alt="Avatar Preview"
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#6a5ed9] group-hover:opacity-80 transition-opacity"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 p-1.5 bg-[#6a5ed9] text-white rounded-full">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div>
            <h3 className="text-sm font-bold text-[#27272a]">{name || (isAr ? 'مشرف ديف روبيكس' : 'DevRopix Admin')}</h3>
            <p className="text-xs text-[#71717a]">{email || 'admin@devropix.com'}</p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f4f5] border border-[#e4e4e7]">
            <span className="w-2 h-2 rounded-full bg-[#1bb152]" />
            <span className="text-[10px] font-semibold text-[#71717a] uppercase tracking-wider">
              {user?.role === 'superadmin' ? (isAr ? 'المدير العام' : 'Super Admin') : (isAr ? 'مدير' : 'Administrator')}
            </span>
          </div>

          <div className="w-full pt-4 border-t border-[#e4e4e7] space-y-3">
            <span className="text-[10px] font-bold text-[#71717a] uppercase tracking-wider block">
              {isAr ? 'أو اختر من الرموز الجاهزة' : 'Or select a preset avatar'}
            </span>
            <div className="grid grid-cols-4 gap-2 justify-center">
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
                'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
                'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
              ].map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setAvatarUrl(url);
                    showToast(
                      isAr ? 'تم اختيار الصورة، اضغط "حفظ التعديلات" للتطبيق' : 'Preset chosen. Click "Save Profile Details" to apply',
                      'info'
                    );
                  }}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-transform active:scale-95 cursor-pointer ${
                    avatarUrl === url ? 'border-[#6a5ed9] scale-105' : 'border-[#e4e4e7] hover:border-[#a1a1aa]'
                  }`}
                >
                  <img src={url} alt={`Preset ${i}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form 1: General Info */}
          <form onSubmit={handleUpdateProfile} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e4e7] space-y-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#e4e4e7] pb-3">
              <User className="w-4 h-4 text-[#6a5ed9]" />
              <h3 className="text-sm font-bold text-[#27272a]">
                {isAr ? 'المعلومات الشخصية' : 'Personal Information'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">
                  {isAr ? 'الاسم بالكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:ring-1 focus:ring-[#6a5ed9]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:ring-1 focus:ring-[#6a5ed9]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#27272a]">
                {isAr ? 'رابط الصورة الشخصية (Avatar URL)' : 'Profile Image URL (Avatar)'}
              </label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] font-mono focus:outline-none focus:ring-1 focus:ring-[#6a5ed9]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-xs active:scale-98 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isAr ? 'حفظ التعديلات' : 'Save Profile Details'}</span>
              </button>
            </div>
          </form>

          {/* Form 2: Change Password */}
          <form onSubmit={handleChangePassword} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e4e4e7] space-y-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#e4e4e7] pb-3">
              <Lock className="w-4 h-4 text-[#f43f5e]" />
              <h3 className="text-sm font-bold text-[#27272a]">
                {isAr ? 'تحديث كلمة المرور' : 'Change Password'}
              </h3>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#27272a]">
                {isAr ? 'كلمة المرور الحالية' : 'Current Password'}
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:ring-1 focus:ring-[#6a5ed9]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">
                  {isAr ? 'كلمة المرور الجديدة' : 'New Password'}
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:ring-1 focus:ring-[#6a5ed9]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#27272a]">
                  {isAr ? 'تأكيد كلمة المرور' : 'Confirm New Password'}
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#e4e4e7] focus:outline-none focus:ring-1 focus:ring-[#6a5ed9]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs active:scale-98 transition-all cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" />
                <span>{isAr ? 'تحديث كلمة المرور' : 'Change Password'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
