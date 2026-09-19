import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { translations } from '../translations';
import { cmsStore } from '../services/cmsStore';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Shield, 
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';

interface ContactPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
  preselectedService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  language,
  onNavigate,
  preselectedService = '',
}) => {
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: preselectedService || 'Custom SaaS / Web Platform',
    budget: '$10k - $25k',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const servicesOptions = [
    'Custom SaaS / Web Platform',
    'Mobile Application (iOS & Android)',
    'AI Integration & Workflow Automation',
    'Cloud Architecture & DevOps',
    'Enterprise System Modernization',
    'Technical Advisory & Architecture Audit',
  ];

  const budgetOptions = [
    '<$10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+',
    'Flexible / Undetermined',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.details.trim()) {
      setErrorMsg(
        language === 'ar'
          ? 'يرجى تعبئة جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، وتفاصيل المشروع).'
          : 'Please fill in the required fields (Name, Email, and Project Details).'
      );
      return;
    }

    setIsSubmitting(true);

    // Save to real CMS Store
    cmsStore.addMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      company: formData.company || undefined,
      service: formData.service,
      budget: formData.budget,
      message: formData.details,
    });

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div id="contact-page" className="w-full pt-28 pb-20">
      {/* Header */}
      <ScrollReveal direction="up">
        <section className="relative py-20 bg-white border-b border-[#e4e4e7] overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-30 mask-radial pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#6a5ed9]/20 bg-[#6a5ed9]/10 font-eyebrow text-[#6a5ed9]">
              <span>{t.contact.tag}</span>
            </div>
            <h1 className="font-display-hero text-[#27272a]">
              {t.contact.title}
            </h1>
            <p className="text-base sm:text-lg text-[#71717a] max-w-3xl leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Main Content: Form + Contact Info */}
      <ScrollReveal direction="up" delay={0.05}>
        <section className="relative py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-[#e4e4e7] bg-white p-7 sm:p-10 shadow-xs text-start">
              {isSuccess ? (
                <div className="py-12 text-center space-y-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#1bb152]/10 border border-[#1bb152]/20 text-[#1bb152] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display-h3 text-[#27272a]">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-sm text-[#71717a] max-w-md mx-auto leading-relaxed">
                    {t.contact.successDesc}
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          service: 'Custom SaaS / Web Platform',
                          budget: '$10k - $25k',
                          details: '',
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-xs font-medium text-[#27272a] hover:bg-[#e4e4e7] transition-colors cursor-pointer"
                    >
                      {language === 'ar' ? 'إرسال طلب إضافي' : 'Send Another Request'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-[#e4e4e7] pb-4">
                    <h2 className="font-display-h3 text-[#27272a]">{t.contact.formTitle}</h2>
                    <p className="text-xs text-[#71717a] mt-1">
                      {language === 'ar'
                        ? 'املأ النموذج أدناه وسيتواصل معك مستشار تقني أول خلال 24 ساعة.'
                        : 'Provide your project parameters to receive a technical scoping response within 24 hours.'}
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                      {errorMsg}
                    </div>
                  )}

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-medium text-[#27272a] block">
                        {t.contact.nameLabel} <span className="text-[#db5434]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === 'ar' ? 'مثال: فيصل القحطاني' : 'e.g. Alex Morgan'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-xs text-[#27272a] placeholder-[#a1a1aa] focus:outline-none focus:border-[#6a5ed9] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-medium text-[#27272a] block">
                        {t.contact.emailLabel} <span className="text-[#db5434]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-xs text-[#27272a] placeholder-[#a1a1aa] focus:outline-none focus:border-[#6a5ed9] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-medium text-[#27272a] block">
                        {t.contact.phoneLabel}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 5x xxx xxxx"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-xs text-[#27272a] placeholder-[#a1a1aa] focus:outline-none focus:border-[#6a5ed9] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-company" className="text-xs font-medium text-[#27272a] block">
                        {t.contact.companyLabel}
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp / Startup Ltd."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-xs text-[#27272a] placeholder-[#a1a1aa] focus:outline-none focus:border-[#6a5ed9] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-service" className="text-xs font-medium text-[#27272a] block">
                      {t.contact.serviceLabel}
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-xs text-[#27272a] focus:outline-none focus:border-[#6a5ed9] focus:bg-white transition-all"
                    >
                      {servicesOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-white text-[#27272a]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Tier */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#27272a] block">
                      {t.contact.budgetLabel}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                            formData.budget === b
                              ? 'bg-[#6a5ed9] text-white shadow-xs'
                              : 'bg-[#fafafa] border border-[#e4e4e7] text-[#71717a] hover:text-[#27272a] hover:border-[#d4d4d8]'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-details" className="text-xs font-medium text-[#27272a] block">
                      {t.contact.detailsLabel} <span className="text-[#db5434]">*</span>
                    </label>
                    <textarea
                      id="contact-details"
                      required
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder={
                        language === 'ar'
                          ? 'صف بإيجاز ما ترغب في بنائه، التحديات الرئيسية، والجدول الزمني المستهدف...'
                          : 'Briefly describe your product goals, technical constraints, target launch timeline...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] text-xs text-[#27272a] placeholder-[#a1a1aa] focus:outline-none focus:border-[#6a5ed9] focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#6a5ed9] text-xs sm:text-sm font-medium text-white hover:bg-[#584dc7] shadow-sm shadow-[#6a5ed9]/25 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.submitting}</span>
                    ) : (
                      <>
                        <span>{t.contact.submitBtn}</span>
                        <Send className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Information Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6 text-start">
              {/* Card 1: Direct Channels */}
              <div className="p-6 rounded-2xl border border-[#e4e4e7] bg-white space-y-4 shadow-2xs">
                <h3 className="font-card-title text-[#27272a] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#6a5ed9]" />
                  {t.contact.directTitle}
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[#71717a] block text-[11px]">Primary Inquiries</span>
                    <a
                      href={`mailto:${t.contact.emailValue}`}
                      className="text-[#27272a] font-mono hover:text-[#6a5ed9] transition-colors"
                    >
                      {t.contact.emailValue}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#71717a] block text-[11px]">Executive Partnerships</span>
                    <a
                      href="mailto:partners@devropix.com"
                      className="text-[#27272a] font-mono hover:text-[#6a5ed9] transition-colors"
                    >
                      partners@devropix.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2: Headquarters & Working Hours */}
              <div className="p-6 rounded-2xl border border-[#e4e4e7] bg-white space-y-4 shadow-2xs">
                <h3 className="font-card-title text-[#27272a] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#3f71d4]" />
                  {t.contact.locationTitle}
                </h3>
                <p className="text-xs text-[#71717a] leading-relaxed">
                  {t.contact.locationValue}
                </p>

                <div className="pt-3 border-t border-[#e4e4e7] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#27272a] font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#6a5ed9]" />
                    <span>{t.contact.hoursTitle}</span>
                  </div>
                  <p className="text-xs text-[#71717a]">{t.contact.hoursValue}</p>
                </div>
              </div>

              {/* Card 3: Non-Disclosure Agreement */}
              <div className="p-6 rounded-2xl border border-[#e4e4e7] bg-[#fafafa] space-y-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-[#1bb152]">
                  <Shield className="w-4 h-4" />
                  <span className="font-eyebrow text-[#27272a]">
                    {t.contact.ndaTitle}
                  </span>
                </div>
                <p className="text-xs text-[#71717a] leading-relaxed">
                  {t.contact.ndaDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
};
