import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { authService, AdminUser } from '../../services/authService';

interface AdminLoginProps {
  language: 'en' | 'ar';
  onLoginSuccess: (user: AdminUser) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  language,
  onLoginSuccess,
  onBackToSite,
}) => {
  const [email, setEmail] = useState('admin@devropix.com');
  const [password, setPassword] = useState('admin123');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isAr = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = authService.login(email, password, remember);
      setIsLoading(false);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setError(res.error || (isAr ? 'بيانات الاعتماد غير صحيحة' : 'Invalid login credentials.'));
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@devropix.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#0B1220] text-white flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden"
    >
      {/* Background ambient glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6a5ed9]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#4f46e5]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Back to Site Button */}
      <div className="absolute top-6 left-6 sm:left-10 z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-sm text-[#94a3b8] hover:text-white bg-[#1e293b]/60 hover:bg-[#1e293b] px-4 py-2 rounded-xl transition-all border border-white/5 cursor-pointer"
        >
          {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isAr ? 'العودة للموقع الرئيسي' : 'Back to Website'}</span>
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6a5ed9] to-[#8174f2] text-white shadow-xl shadow-[#6a5ed9]/30 mb-4 ring-1 ring-white/20">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            {isAr ? 'لوحة تحكم ديف روبيكس' : 'DevRopix Admin Portal'}
          </h1>
          <p className="text-sm text-[#94a3b8]">
            {isAr
              ? 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى نظام إدارة المحتوى والإحصائيات'
              : 'Sign in to access your secure CMS, leads, and platform analytics'}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-2">
                {isAr ? 'البريد الإلكتروني' : 'Admin Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748b]">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-[#1e293b]/80 border border-white/10 rounded-xl py-3 pr-4 text-white placeholder-[#64748b] text-sm focus:outline-none focus:ring-2 focus:ring-[#6a5ed9] focus:border-transparent transition-all ${
                    isAr ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4'
                  }`}
                  placeholder="admin@devropix.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
                  {isAr ? 'كلمة المرور' : 'Password'}
                </label>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-xs text-[#8174f2] hover:text-[#9388f4] transition-colors cursor-pointer"
                >
                  {isAr ? 'تعبئة بيانات التجربة' : 'Fill Demo Credentials'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748b]">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-[#1e293b]/80 border border-white/10 rounded-xl py-3 pr-4 text-white placeholder-[#64748b] text-sm focus:outline-none focus:ring-2 focus:ring-[#6a5ed9] focus:border-transparent transition-all ${
                    isAr ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4'
                  }`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#1e293b] border-white/20 text-[#6a5ed9] focus:ring-[#6a5ed9]"
                />
                <span className="text-[#94a3b8] text-xs">
                  {isAr ? 'تذكرني لمدة 30 يوماً' : 'Remember me for 30 days'}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-[#6a5ed9] to-[#8174f2] hover:from-[#5b50c4] hover:to-[#7063e0] text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-[#6a5ed9]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>{isAr ? 'تسجيل الدخول الآمن' : 'Secure Login'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-[#64748b]">
              {isAr ? 'بيانات الاعتماد الافتراضية: admin@devropix.com / admin123' : 'Default Credentials: admin@devropix.com / admin123'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
