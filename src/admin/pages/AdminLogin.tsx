import React, { useState } from 'react';
import { DevRopixLogo } from '../../components/DevRopixLogo';
import { AuthService } from '../../services/authService';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { AdminUser } from '../../types';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToSite: () => void;
  language: 'en' | 'ar';
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToSite,
  language,
}) => {
  const isAr = language === 'ar';
  const [email, setEmail] = useState('admin@devropix.com');
  const [password, setPassword] = useState('admin123');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg(isAr ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email address');
      return;
    }
    if (!password.trim()) {
      setErrorMsg(isAr ? 'يرجى إدخال كلمة المرور' : 'Please enter your password');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = AuthService.login(email, password, remember);
      setIsLoading(false);

      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setErrorMsg(
          res.error ||
            (isAr
              ? 'فشل تسجيل الدخول. تحقق من البريد وكلمة المرور.'
              : 'Authentication failed. Please check your credentials.')
        );
      }
    }, 600);
  };

  return (
    <div
      id="admin-login-page"
      className="min-h-screen bg-[#0B1220] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Grids & Glow */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#6a5ed9]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#3f71d4]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Back to website floating action */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isAr ? 'العودة للموقع' : 'Back to Website'}</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          <DevRopixLogo size="lg" isLight={true} />
        </div>

        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {isAr ? 'لوحة تحكم DevRopix CMS' : 'DevRopix Admin Portal'}
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {isAr
              ? 'تسجيل دخول آمن لإدارة محتوى وخدمات ومشاريع الموقع'
              : 'Secure authentication to manage website content, services, and portfolio'}
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#111c30] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-start">
          {/* Error Alert */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                {isAr ? 'البريد الإلكتروني للإدارة' : 'Admin Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@devropix.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6a5ed9] focus:ring-1 focus:ring-[#6a5ed9] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">
                  {isAr ? 'كلمة المرور' : 'Password'}
                </label>
                <span className="text-[10px] text-slate-500">
                  {isAr ? 'حساب تجريبي افتراضي' : 'Default Admin Seed'}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6a5ed9] focus:ring-1 focus:ring-[#6a5ed9] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Credentials note */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-[#6a5ed9] focus:ring-[#6a5ed9] cursor-pointer"
                />
                <span>{isAr ? 'تذكر تسجيل الدخول' : 'Remember me'}</span>
              </label>

              <div className="text-[11px] text-purple-400 font-mono">
                admin123
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#6a5ed9] hover:bg-[#584dc7] text-white text-xs font-semibold shadow-lg shadow-[#6a5ed9]/25 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isAr ? 'تسجيل الدخول إلى النظام' : 'Sign In to Dashboard'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>
          </form>

          {/* Security footnote */}
          <div className="pt-2 border-t border-slate-800 text-center flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isAr
                ? 'جلسة مشفرة ومحمية بنظام أذونات متطور'
                : 'Session encrypted with RBAC authorization'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
