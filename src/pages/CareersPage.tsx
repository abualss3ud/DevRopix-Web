import React, { useState, useMemo } from 'react';
import { Language, PageId, JobPosting } from '../types';
import { cmsStore } from '../services/cmsStore';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Filter,
  Search,
  Check,
  Building2,
  Users,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  FileCheck,
  Award,
  Zap
} from 'lucide-react';

interface CareersPageProps {
  language: Language;
  onNavigate: (page: PageId) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({
  language,
  onNavigate,
}) => {
  const isAr = language === 'ar';
  const jobs = useMemo(() => cmsStore.getPublishedJobs(), []);

  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(jobs[0]?.id || null);
  const [applyingJob, setApplyingJob] = useState<JobPosting | null>(null);

  // Application form state
  const [applicantData, setApplicantData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    linkedinUrl: '',
    coverLetter: '',
    resumeFileName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Extract departments
  const departments = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      set.add(isAr ? j.department_ar : j.department_en);
    });
    return Array.from(set);
  }, [jobs, isAr]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const dept = isAr ? job.department_ar : job.department_en;
      const title = isAr ? job.title_ar : job.title_en;
      const desc = isAr ? job.description_ar : job.description_en;

      const matchesDept = selectedDept === 'all' || dept === selectedDept;
      const matchesSearch =
        !searchQuery.trim() ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.type.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDept && matchesSearch;
    });
  }, [jobs, selectedDept, searchQuery, isAr]);

  const handleOpenApply = (job: JobPosting) => {
    setApplyingJob(job);
    setSubmitSuccess(false);
    setSubmitError('');
    // Scroll to form if on screen
    const formElement = document.getElementById('job-application-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    if (!applicantData.fullName.trim() || !applicantData.email.trim() || !applicantData.phone.trim()) {
      setSubmitError(isAr ? 'يرجى ملء جميع الحقول الإلزامية' : 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      cmsStore.submitJobApplication({
        jobId: applyingJob.id,
        jobTitle: isAr ? applyingJob.title_ar : applyingJob.title_en,
        fullName: applicantData.fullName.trim(),
        email: applicantData.email.trim(),
        phone: applicantData.phone.trim(),
        portfolioUrl: applicantData.portfolioUrl.trim() || undefined,
        linkedinUrl: applicantData.linkedinUrl.trim() || undefined,
        coverLetter: applicantData.coverLetter.trim() || undefined,
        resumeFileName: applicantData.resumeFileName.trim() || 'CV_Attachment.pdf',
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setApplicantData({
        fullName: '',
        email: '',
        phone: '',
        portfolioUrl: '',
        linkedinUrl: '',
        coverLetter: '',
        resumeFileName: '',
      });
    } catch {
      setIsSubmitting(false);
      setSubmitError(
        isAr
          ? 'حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى أو مراسلتنا عبر الواتساب'
          : 'Failed to submit application. Please retry or contact us via WhatsApp.'
      );
    }
  };

  const perks = [
    {
      icon: Zap,
      title_en: 'Cutting-Edge Stack',
      title_ar: 'أحدث التقنيات البرمجية',
      desc_en: 'Work with modern frameworks, high-throughput architectures, and cloud-native solutions.',
      desc_ar: 'العمل بأحدث أطر العمل السحابية وبنى الأنظمة الحديثة فائقة السرعة.',
    },
    {
      icon: MapPin,
      title_en: 'Hurghada HQ & Remote Work',
      title_ar: 'مقر الغردقة وعمل مرن عن بُعد',
      desc_en: 'Enjoy working from the Red Sea coastal hub in Hurghada or flexibly with our remote-first engineers.',
      desc_ar: 'استمتع بالعمل من مقرنا الساحلي بالغردقة على البحر الأحمر أو بمرونة كاملة عن بُعد.',
    },
    {
      icon: Award,
      title_en: 'Competitive Compensation',
      title_ar: 'رواتب ومكافآت تنافسية',
      desc_en: 'Merit-based compensation packages, performance bonuses, and career growth milestones.',
      desc_ar: 'حزم تعويضات ومكافآت مبنية على الكفاءة ومسارات ترقية وتطوير واضحة.',
    },
    {
      icon: Users,
      title_en: 'Engineering Culture',
      title_ar: 'بيئة هندسية احترافية',
      desc_en: 'No bureaucracy. Direct peer reviews, autonomous sprints, and dedication to high craftsmanship.',
      desc_ar: 'بيئة مرنة خالية من البيروقراطية، مراجعات كود بناءة، وشغف حقيقي بجودة الكود والتصميم.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#27272a]">
      {/* Hero Header */}
      <section className="relative pt-28 pb-20 border-b border-[#e4e4e7] bg-white overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid opacity-30 mask-radial pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6a5ed9]/10 border border-[#6a5ed9]/20 font-eyebrow text-[#6a5ed9]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'انضم إلى فريق ديف روبيكس' : 'Build the Future at DevRopix'}</span>
            </div>

            <h1 className="font-display-hero text-[#27272a]">
              {isAr ? (
                <>
                  فرص العمل والوظائف الشاغرة في <span className="text-[#6a5ed9]">DevRopix</span>
                </>
              ) : (
                <>
                  Join Our Engineering Team at <span className="text-[#6a5ed9]">DevRopix</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#71717a] leading-relaxed max-w-2xl font-normal">
              {isAr
                ? 'نبني منتجات برمجية وحلولاً رقمية عالمية المستوى للشركات والمؤسسات. إذا كنت شغوفاً بكتابة كود نظيف وتصميم واجهات استثنائية، فنحن نرحب بك في فريقنا بالغردقة أو عن بُعد.'
                : 'We engineer bespoke web applications, high-performance mobile systems, and scalable digital products. Explore open roles across engineering, design, and product management.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#open-positions"
                className="px-5 py-2.5 rounded-xl bg-[#6a5ed9] text-white text-xs font-semibold hover:bg-[#584dc7] transition-colors shadow-xs"
              >
                {isAr ? 'استعراض الوظائف المتاحة' : 'View Open Positions'}
              </a>
              <a
                href="https://wa.me/201110428301"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-xs font-semibold text-[#27272a] hover:bg-[#f4f4f5] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#1bb152]" />
                <span>{isAr ? 'تواصل مع الموارد البشرية واتساب' : 'WhatsApp HR Inquiries'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="py-16 border-b border-[#e4e4e7] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-[#e4e4e7] bg-[#fafafa] text-start space-y-3 hover:border-[#6a5ed9]/30 hover:bg-white transition-all shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#e4e4e7] flex items-center justify-center text-[#6a5ed9] shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-card-title text-[#27272a]">
                    {isAr ? p.title_ar : p.title_en}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">
                    {isAr ? p.desc_ar : p.desc_en}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#e4e4e7]">
            <div className="text-start space-y-1">
              <h2 className="font-display-h2 text-[#27272a]">
                {isAr ? 'الوظائف المتاحة حالياً' : 'Current Open Positions'}
              </h2>
              <p className="text-xs sm:text-sm text-[#71717a]">
                {isAr
                  ? `يوجد ${filteredJobs.length} فرصة عمل مفتوحة للتقديم`
                  : `${filteredJobs.length} active roles accepting applications`}
              </p>
            </div>

            {/* Search & Department Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#a1a1aa] absolute top-1/2 -translate-y-1/2 start-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isAr ? 'بحث في الوظائف...' : 'Search roles...'}
                  className="ps-9 pe-4 py-2 rounded-xl border border-[#e4e4e7] bg-white text-xs text-[#27272a] placeholder-[#a1a1aa] focus:outline-none focus:border-[#6a5ed9] w-full sm:w-60 shadow-2xs"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setSelectedDept('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedDept === 'all'
                      ? 'bg-[#27272a] text-white shadow-xs'
                      : 'bg-white border border-[#e4e4e7] text-[#71717a] hover:text-[#27272a]'
                  }`}
                >
                  {isAr ? 'الكل' : 'All Departments'}
                </button>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      selectedDept === dept
                        ? 'bg-[#27272a] text-white shadow-xs'
                        : 'bg-white border border-[#e4e4e7] text-[#71717a] hover:text-[#27272a]'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Job Postings List */}
          <div className="pt-8 space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-[#e4e4e7] p-8 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center text-[#71717a]">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-card-title text-[#27272a]">
                  {isAr ? 'لا توجد وظائف مطابقة لبحثك حالياً' : 'No matching roles found'}
                </h3>
                <p className="text-xs text-[#71717a] max-w-md mx-auto">
                  {isAr
                    ? 'يمكنك دائماً إرسال سيرتك الذاتية بشكل مباشر وسنقوم بمراجعتها والتواصل معك عند توفر شواغر تناسب خبراتك.'
                    : 'Feel free to send a speculative application or reach out directly to our talent acquisition team.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedDept('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-xs font-semibold text-[#27272a] hover:bg-[#f4f4f5] cursor-pointer"
                >
                  {isAr ? 'إعادة ضبط عوامل التصفية' : 'Reset filters'}
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;
                const isApplyingThis = applyingJob?.id === job.id;

                return (
                  <div
                    key={job.id}
                    id={`job-card-${job.id}`}
                    className={`bg-white rounded-2xl border transition-all text-start overflow-hidden shadow-2xs ${
                      isExpanded ? 'border-[#6a5ed9]/50 ring-1 ring-[#6a5ed9]/20' : 'border-[#e4e4e7] hover:border-[#d4d4d8]'
                    }`}
                  >
                    {/* Card Header Header Summary */}
                    <div className="p-6 sm:p-7">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-[#6a5ed9]/10 text-[#6a5ed9]">
                              {isAr ? job.department_ar : job.department_en}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-[#3f71d4]/10 text-[#3f71d4]">
                              {job.type}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-[#1bb152]/10 text-[#1bb152]">
                              {isAr ? job.experience_ar : job.experience_en}
                            </span>
                          </div>

                          <h3 className="font-card-title text-base sm:text-lg text-[#27272a]">
                            {isAr ? job.title_ar : job.title_en}
                          </h3>

                          <div className="flex items-center gap-4 text-xs text-[#71717a]">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#6a5ed9]" />
                              {isAr ? job.location_ar : job.location_en}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#a1a1aa]" />
                              {job.postedAt}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2.5 self-start md:self-center">
                          <button
                            onClick={() => handleOpenApply(job)}
                            className="px-4 py-2 rounded-xl bg-[#6a5ed9] text-white text-xs font-semibold hover:bg-[#584dc7] transition-colors shadow-xs cursor-pointer"
                          >
                            {isAr ? 'التقديم على الوظيفة' : 'Apply for Role'}
                          </button>
                          <button
                            onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                            className="p-2 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-[#71717a] hover:text-[#27272a] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
                            aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Summary description preview */}
                      <p className="mt-3 text-xs sm:text-sm text-[#71717a] leading-relaxed">
                        {isAr ? job.description_ar : job.description_en}
                      </p>
                    </div>

                    {/* Expanded Job Specifications */}
                    {isExpanded && (
                      <div className="border-t border-[#e4e4e7] bg-[#fafafa] p-6 sm:p-7 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Requirements */}
                          <div className="space-y-3">
                            <h4 className="font-eyebrow text-[#27272a] uppercase tracking-wider">
                              {isAr ? 'المؤهلات والمتطلبات' : 'Requirements & Qualifications'}
                            </h4>
                            <ul className="space-y-2 text-xs text-[#71717a]">
                              {(isAr ? job.requirements_ar : job.requirements_en).map((req, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <div className="w-4 h-4 rounded-full bg-[#1bb152]/10 text-[#1bb152] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-2.5 h-2.5" />
                                  </div>
                                  <span className="leading-relaxed">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Responsibilities */}
                          <div className="space-y-3">
                            <h4 className="font-eyebrow text-[#27272a] uppercase tracking-wider">
                              {isAr ? 'المهام والمسؤوليات الرئيسية' : 'Key Responsibilities'}
                            </h4>
                            <ul className="space-y-2 text-xs text-[#71717a]">
                              {(isAr ? job.responsibilities_ar : job.responsibilities_en).map((resp, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <div className="w-4 h-4 rounded-full bg-[#6a5ed9]/10 text-[#6a5ed9] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-2.5 h-2.5" />
                                  </div>
                                  <span className="leading-relaxed">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-end">
                          <button
                            onClick={() => handleOpenApply(job)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6a5ed9] text-white text-xs font-semibold hover:bg-[#584dc7] transition-colors shadow-xs cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{isAr ? 'تقديم طلب توظيف الآن' : 'Submit Application Now'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Application Form Drawer / Section */}
      <section
        id="job-application-section"
        className="py-20 bg-white border-t border-[#e4e4e7]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
          <div className="p-7 sm:p-10 rounded-2xl border border-[#e4e4e7] bg-[#fafafa] shadow-xs space-y-6">
            <div className="space-y-2 border-b border-[#e4e4e7] pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6a5ed9]/10 border border-[#6a5ed9]/20 font-eyebrow text-[#6a5ed9]">
                <FileCheck className="w-3.5 h-3.5" />
                <span>{isAr ? 'نموذج التقديم المباشر' : 'Direct Application Form'}</span>
              </div>

              <h3 className="font-display-h3 text-[#27272a]">
                {applyingJob ? (
                  isAr ? (
                    <>التقديم على وظيفة: <span className="text-[#6a5ed9]">{applyingJob.title_ar}</span></>
                  ) : (
                    <>Applying for: <span className="text-[#6a5ed9]">{applyingJob.title_en}</span></>
                  )
                ) : (
                  isAr ? 'التقديم على وظيفة عامة / انضمام مفتوح' : 'General & Open Application'
                )}
              </h3>
              <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">
                {isAr
                  ? 'أدخل بياناتك وسنقوم بدراسة ملفك والرد عليك خلال ٤٨ ساعة عمل. يمكنك أيضاً إرفاق رابط ملف الأعمال أو سيرتك الذاتية.'
                  : 'Submit your profile and resume details. Our engineering recruitment team reviews all candidate submissions within 48 business hours.'}
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold">
                  {isAr ? 'تم استلام طلب التقديم بنجاح!' : 'Application Submitted Successfully!'}
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? 'شكراً لاهتمامك بالانضمام إلى DevRopix. سيقوم مسؤولو التوظيف بمراجعة سيرتك والتواصل معك قريباً عبر الهاتف أو البريد الإلكتروني.'
                    : 'Thank you for your interest in joining DevRopix. Our recruitment team will review your qualifications and reach out via email or phone.'}
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setApplyingJob(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-xs font-semibold text-emerald-800 hover:bg-emerald-100/50 cursor-pointer"
                  >
                    {isAr ? 'تقديم طلب آخر' : 'Submit Another Application'}
                  </button>
                  <a
                    href="https://wa.me/201110428301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1bb152] text-white text-xs font-semibold hover:bg-[#169444]"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{isAr ? 'متابعة عبر الواتساب' : 'Follow up via WhatsApp'}</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#27272a] block">
                      {isAr ? 'الاسم الكامل' : 'Full Name'} <span className="text-[#db5434]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantData.fullName}
                      onChange={(e) => setApplicantData({ ...applicantData, fullName: e.target.value })}
                      placeholder={isAr ? 'أحمد محمد' : 'Jane Doe'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-white text-xs text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#27272a] block">
                      {isAr ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-[#db5434]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantData.email}
                      onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-white text-xs text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#27272a] block">
                      {isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'} <span className="text-[#db5434]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantData.phone}
                      onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
                      placeholder="+20 111 000 0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-white text-xs text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#27272a] block">
                      {isAr ? 'رابط ملف لينكدين' : 'LinkedIn Profile URL'}
                    </label>
                    <input
                      type="url"
                      value={applicantData.linkedinUrl}
                      onChange={(e) => setApplicantData({ ...applicantData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-white text-xs text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Portfolio / GitHub */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#27272a] block">
                      {isAr ? 'رابط ملف الأعمال أو جيت هاب' : 'Portfolio / GitHub / Website URL'}
                    </label>
                    <input
                      type="url"
                      value={applicantData.portfolioUrl}
                      onChange={(e) => setApplicantData({ ...applicantData, portfolioUrl: e.target.value })}
                      placeholder="https://github.com/username"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-white text-xs text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
                    />
                  </div>

                  {/* Resume Name or Drive Link */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#27272a] block">
                      {isAr ? 'رابط السيرة الذاتية (Google Drive / Dropbox) أو اسم الملف' : 'Resume Link or Document Title'}
                    </label>
                    <input
                      type="text"
                      value={applicantData.resumeFileName}
                      onChange={(e) => setApplicantData({ ...applicantData, resumeFileName: e.target.value })}
                      placeholder={isAr ? 'https://drive.google.com/... أو سيرة_ذاتية.pdf' : 'https://drive.google.com/... or Resume.pdf'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-white text-xs text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
                    />
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#27272a] block">
                    {isAr ? 'نبذة عن خبراتك ولماذا تريد الانضمام إلينا' : 'Brief Bio & Why You Want to Join'}
                  </label>
                  <textarea
                    rows={4}
                    value={applicantData.coverLetter}
                    onChange={(e) => setApplicantData({ ...applicantData, coverLetter: e.target.value })}
                    placeholder={
                      isAr
                        ? 'تحدث بإيجاز عن أبرز مشروعاتك السابقة، التقنيات التي تحب العمل بها، وتطلعاتك المهنية...'
                        : 'Highlight your top achievements, frameworks you master, and why DevRopix is your next step...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e4e4e7] bg-white text-xs text-[#27272a] focus:outline-none focus:border-[#6a5ed9]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#71717a]">
                    <span>
                      {isAr
                        ? 'مقر الشركة: الغردقة، البحر الأحمر، مصر مع دعم فرق العمل عن بُعد.'
                        : 'Location: Hurghada, Red Sea, Egypt & Remote Teams.'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#6a5ed9] text-white text-xs font-bold hover:bg-[#5b4ec9] transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                  >
                    {isSubmitting
                      ? (isAr ? 'جارِ الإرسال...' : 'Submitting...')
                      : (isAr ? 'إرسال طلب التوظيف' : 'Submit Application')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
