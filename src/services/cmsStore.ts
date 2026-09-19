import {
  ActivityLog,
  BlogCategory,
  BlogPost,
  ClientPartner,
  ContactMessage,
  GlobalSettings,
  HomepageContent,
  JobApplication,
  JobPosting,
  MediaItem,
  ProjectCategory,
  ProjectItem,
  ServiceItem,
  TestimonialItem,
} from '../types';
import { AuthService } from './authService';
import { safeLocalStorage } from '../utils/safeStorage';

const CMS_STORAGE_PREFIX = 'devropix_cms_';

// Initial Project Categories
const SEED_PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: 'cat_web',
    name_en: 'Web Applications',
    name_ar: 'تطبيقات الويب',
    slug: 'web-apps',
    description_en: 'Full-stack responsive cloud platforms and enterprise portals',
    description_ar: 'منصات سحابية وبوابات مؤسسية متكاملة',
    status: 'active',
    order: 1,
  },
  {
    id: 'cat_mobile',
    name_en: 'Mobile Applications',
    name_ar: 'تطبيقات الجوال',
    slug: 'mobile-apps',
    description_en: 'High-performance cross-platform iOS & Android mobile apps',
    description_ar: 'تطبيقات الهواتف الذكية لأنظمة iOS وأندرويد بأداء فائق',
    status: 'active',
    order: 2,
  },
  {
    id: 'cat_uiux',
    name_en: 'UI/UX Design Systems',
    name_ar: 'تصميم واجهات وتجربة المستخدم',
    slug: 'ui-ux-design',
    description_en: 'Research-driven design systems, wireframes, and prototypes',
    description_ar: 'أنظمة تصميم مبنية على دراسة سلوك المستخدم ونماذج تفاعلية',
    status: 'active',
    order: 3,
  },
  {
    id: 'cat_custom',
    name_en: 'Custom Software & ERP',
    name_ar: 'برمجيات مخصصة وأنظمة ERP',
    slug: 'custom-software',
    description_en: 'Tailored backend architectures, microservices, and workflows',
    description_ar: 'بنية برمجية مخصصة للعمليات المعقدة والخدمات المصغرة',
    status: 'active',
    order: 4,
  },
  {
    id: 'cat_mvp',
    name_en: 'Digital Products & MVPs',
    name_ar: 'المنتجات الرقمية والـ MVP',
    slug: 'digital-products',
    description_en: 'Rapid MVP roadmaps and early-stage product engineering',
    description_ar: 'بناء وإطلاق المنتجات الأولية للشركات الناشئة بسرعة وجودة',
    status: 'active',
    order: 5,
  },
];

// Initial Blog Categories
const SEED_BLOG_CATEGORIES: BlogCategory[] = [
  { id: 'bcat_tech', name_en: 'Technology & Architecture', name_ar: 'التقنية والهندسة البرمجية', slug: 'technology' },
  { id: 'bcat_design', name_en: 'UI/UX Design', name_ar: 'تصميم تجربة المستخدم', slug: 'ui-ux' },
  { id: 'bcat_business', name_en: 'Product Strategy & Business', name_ar: 'استراتيجية المنتجات والأعمال', slug: 'business' },
  { id: 'bcat_devops', name_en: 'DevOps & Cloud', name_ar: 'الحوسبة السحابية والبنية التحتية', slug: 'cloud-devops' },
];

// Initial Services
const SEED_SERVICES: ServiceItem[] = [
  {
    id: 'web-development',
    titleKey: 'webDev',
    title_en: 'Web Applications & Portals',
    title_ar: 'تطوير تطبيقات الويب والمواقع المتقدمة',
    shortDesc_en: 'High-performance, scalable web applications built with modern frameworks and resilient cloud infrastructure.',
    shortDesc_ar: 'تطبيقات ومواقع ويب فائقة السرعة وقابلة للتوسع بأحدث التقنيات مع بنية تحتية سحابية متينة.',
    fullDesc_en: 'DevRopix engineers production-grade web platforms that solve complex operational needs, provide seamless user journeys, and load in milliseconds across every device.',
    fullDesc_ar: 'نقوم في ديف روبيكس بهندسة منصات ويب متقدمة تلبي متطلبات الأعمال وتوفر تجربة مستخدم سلسة وفائقة السرعة.',
    iconName: 'Globe',
    deliverables_en: [
      'Responsive Single-Page Applications (SPA & SSR)',
      'Enterprise Admin Portals & Dashboards',
      'High-Conversion Product & Marketing Websites',
      'Secure API Integrations & Payment Gateways',
      'Performance Optimization & 99+ Core Web Vitals',
    ],
    deliverables_ar: [
      'تطبيقات ويب أحادية الصفحة متجاوبة (SPA & SSR)',
      'لوحات تحكم وبوابات إدارية مؤسسية',
      'مواقع تسويقية ومنتجات عالية التحويل',
      'ربط بوابات الدفع والـ APIs بأعلى درجات الأمان',
      'تحسين سرعة وأداء الموقع لمعايير Core Web Vitals القياسية',
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    metrics_en: '99+ Lighthouse Score Standard',
    metrics_ar: 'معيار 99+ في تقييمات Lighthouse للسرعة',
    order: 1,
    status: 'published',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-09-15T14:30:00.000Z',
  },
  {
    id: 'mobile-development',
    titleKey: 'mobileApp',
    title_en: 'Mobile Applications (iOS & Android)',
    title_ar: 'تطوير تطبيقات الهواتف الذكية (iOS و Android)',
    shortDesc_en: 'Native and cross-platform mobile apps with fluid animations, biometric security, and offline-first data sync.',
    shortDesc_ar: 'تطبيقات جوال سلسة ومتجاوبة بأداء أصلي وحماية بيومترية ومزامنة سريعة تدعم العمل دون اتصال.',
    fullDesc_en: 'From intuitive consumer apps to mission-critical field operations tools, we deliver mobile experiences that maintain 60 FPS fluidity and low battery consumption.',
    fullDesc_ar: 'من تطبيقات المستهلكين إلى أدوات العمل الميدانية المعقدة، نقدم تطبيقات جوال تعمل بسلاسة تامة مع كفاءة استهلاك الموارد.',
    iconName: 'Smartphone',
    deliverables_en: [
      'Cross-Platform iOS & Android Apps',
      'Offline-First Local Sync Architecture',
      'Biometric Authentication & Hardware Security',
      'Push Notification & Retention Pipelines',
      'Full App Store & Google Play Publishing',
    ],
    deliverables_ar: [
      'تطبيقات متعددة المنصات لنظامي iOS وأندرويد',
      'بنية مزامنة بيانات محلية تدعم وضع عدم الاتصال',
      'حماية بيومترية متقدمة وتشفير عالي',
      'إشعارات فورية وقنوات تفاعل المستخدمين',
      'نشر واعتماد متكامل في App Store و Google Play',
    ],
    techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'REST/GraphQL'],
    metrics_en: '60 FPS Native Fluidity',
    metrics_ar: 'أداء سلس بمعدل 60 إطاراً في الثانية',
    order: 2,
    status: 'published',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-05T11:00:00.000Z',
    updatedAt: '2026-09-12T09:15:00.000Z',
  },
  {
    id: 'ui-ux-design',
    titleKey: 'uiux',
    title_en: 'UI/UX Design & Design Systems',
    title_ar: 'تصميم واجهات وتجربة المستخدم وهندسة الأنظمة التصميمية',
    shortDesc_en: 'Mathematical typographic hierarchy, design tokens, and research-backed interactive prototypes.',
    shortDesc_ar: 'تسلسل بصري متزن، ومكتبات رموز تصميمية موحدة، ونماذج تفاعلية مبنية على دراسة سلوك المستخدم.',
    fullDesc_en: 'We eliminate visual friction by crafting bespoke design systems with strict spacing math, WCAG 2.1 AA accessibility, and developer-ready specs.',
    fullDesc_ar: 'نزيل التعقيد البصري من خلال بناء أنظمة تصميم دقيقة وقابلة للتطوير مع التزام صارم بمعايير سهولة الوصول العالمية.',
    iconName: 'Layers',
    deliverables_en: [
      'User Research & Mental Model Mapping',
      'Interactive Figma Prototypes & Wireframes',
      'Design Token Systems & Component Libraries',
      'Usability Testing & Accessibility Audits',
      'Developer Handoff Documentation',
    ],
    deliverables_ar: [
      'أبحاث وتخطيط رحلة وسلوك المستخدم',
      'نماذج تفاعلية عالية الدقة على Figma',
      'أنظمة رموز التصميم ومكتبات المكونات البرمجية',
      'اختبارات قابلية الاستخدام وتدقيق الوصول',
      'ملفات تسليم هندسية شاملة للمطورين',
    ],
    techStack: ['Figma', 'Tokens Studio', 'Design Systems', 'WCAG 2.1 AA'],
    metrics_en: 'Zero-Ambiguity Component Specs',
    metrics_ar: 'مواصفات تصميم دقيقة خالية من الغموض',
    order: 3,
    status: 'published',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-10T12:00:00.000Z',
    updatedAt: '2026-09-10T16:00:00.000Z',
  },
  {
    id: 'custom-software',
    titleKey: 'customSoftware',
    title_en: 'Custom Software & Enterprise ERP',
    title_ar: 'تطوير البرمجيات المخصصة وأنظمة إدارة الشركات (ERP)',
    shortDesc_en: 'Tailored business automation engines, microservices, and role-based data platforms.',
    shortDesc_ar: 'محركات أتمتة الأعمال المخصصة، والخدمات المصغرة، ومنصات إدارة الصلاحيات والبيانات المؤسسية.',
    fullDesc_en: 'We modernize legacy infrastructure and architect custom backends that handle distributed concurrency, complex business logic, and automated invoicing.',
    fullDesc_ar: 'نحدث الأنظمة القديمة ونبني بنية خلفية متطورة تدير العمليات المعقدة وأتمتة الفواتير والتقارير بدقة متناهية.',
    iconName: 'Cpu',
    deliverables_en: [
      'Custom ERP, CRM & Logistics Platforms',
      'Automated Document & Invoice Pipelines',
      'Microservices & Event-Driven Architecture',
      'Role-Based Access Control (RBAC)',
      'Legacy System Modernization & Data Migration',
    ],
    deliverables_ar: [
      'منصات ERP و CRM مخصصة وإدارة سلاسل الإمداد',
      'أنظمة مؤتمتة لمعالجة الفواتير والمستندات',
      'بنية خدمات مصغرة معتمدة على الأحداث (Event-Driven)',
      'نظام إدارة الصلاحيات والأدوار المتقدم (RBAC)',
      'تحديث الأنظمة القديمة ونقل البيانات بدون توقف',
    ],
    techStack: ['Node.js', 'Laravel', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    metrics_en: 'Tailored Business Logic Flow',
    metrics_ar: 'انسيابية كاملة مخصصة لنموذج عملك',
    order: 4,
    status: 'published',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-12T14:00:00.000Z',
    updatedAt: '2026-09-08T11:20:00.000Z',
  },
  {
    id: 'digital-product',
    titleKey: 'digitalProduct',
    title_en: 'Digital Products & Rapid MVP',
    title_ar: 'هندسة المنتجات الرقمية وإطلاق الـ MVP السريع',
    shortDesc_en: 'Fast-track product strategy, architecture spikes, and iterative MVP launches within 4 to 8 weeks.',
    shortDesc_ar: 'استراتيجية تسريع المنتجات، واختبار الجدوى المعمارية، وإطلاق نماذج MVP متكاملة خلال 4 إلى 8 أسابيع.',
    fullDesc_en: 'We help founders and enterprise innovation units validate assumptions with real market users through tight, focused software execution.',
    fullDesc_ar: 'نساعد رواد الأعمال والشركات المبتكرة على التحقق من أفكارهم وإطلاق منتجاتهم في السوق بسرعة وكفاءة.',
    iconName: 'Rocket',
    deliverables_en: [
      'Rapid MVP Definition & Technical Roadmapping',
      'Architecture Spikes & Feasibility Proofs',
      'Continuous CI/CD Delivery Pipeline',
      'Product Analytics & User Behavioral Telemetry',
      'Iterative Post-Launch Feature Expansion',
    ],
    deliverables_ar: [
      'تحديد نطاق الـ MVP وخارطة الطريق التقنية',
      'إثبات الجدوى المعمارية والفنية',
      'خطوط تسليم ونشر مستمرة (CI/CD)',
      'ربط التحليلات وتتبع سلوك المستخدمين',
      'التطوير المستمر للميزات بعد الإطلاق',
    ],
    techStack: ['TypeScript', 'Cloud Native', 'Tailwind', 'Stripe', 'Docker'],
    metrics_en: '4-8 Week Target MVP Delivery',
    metrics_ar: 'تسليم النموذج الأولي خلال 4-8 أسابيع',
    order: 5,
    status: 'published',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-15T09:30:00.000Z',
    updatedAt: '2026-09-05T13:45:00.000Z',
  },
  {
    id: 'maintenance-support',
    titleKey: 'maintenance',
    title_en: 'System Maintenance & 24/7 Support',
    title_ar: 'الصيانة الدورية والدعم الفني المستمر 24/7',
    shortDesc_en: 'Proactive server health monitoring, security audits, database drills, and guaranteed response SLAs.',
    shortDesc_ar: 'مراقبة استباقية للخوادم، وتحديثات أمنية دورية، ونسخ احتياطي منتظم مع اتفاقية مستوى خدمة مضمونة.',
    fullDesc_en: 'Protect your technology investments with around-the-clock uptime monitoring, dependency upgrades, load testing, and emergency hotfix response.',
    fullDesc_ar: 'حافظ على استمرارية أعمالك من خلال مراقبة الأداء على مدار الساعة وسد الثغرات وإجراء اختبارات الجهد الدورية.',
    iconName: 'ShieldCheck',
    deliverables_en: [
      '24/7 Server Health & Telemetry Monitoring',
      'Quarterly Dependency & Security Patching',
      'Database Backup & Recovery Drills',
      'Performance Auditing & Load Testing',
      'Guaranteed Response Time SLA',
    ],
    deliverables_ar: [
      'مراقبة الخوادم ومؤشرات الأداء على مدار الساعة 24/7',
      'تحديث الحزم الأمنية وسد الثغرات دورياً',
      'تدريبات استعادة النسخ الاحتياطية للبيانات',
      'تدقيق الأداء واختبارات الجهد العالي',
      'اتفاقية مستوى خدمة SLA بأوقات استجابة سريعة',
    ],
    techStack: ['Docker', 'Prometheus', 'Grafana', 'CloudWatch', 'Sentry'],
    metrics_en: '99.98% System Uptime SLA',
    metrics_ar: 'ضمان تواجد النظام بنسبة 99.98%',
    order: 6,
    status: 'published',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-18T10:15:00.000Z',
    updatedAt: '2026-09-01T08:00:00.000Z',
  },
];

// Initial Projects
const SEED_PROJECTS: ProjectItem[] = [
  {
    id: 'orbit-saas',
    slug: 'orbit-logistics-cloud',
    name_en: 'Orbit Logistics Cloud',
    name_ar: 'منصة أوربت لإدارة الخدمات اللوجستية',
    category: 'Custom Software & Web',
    categoryKey: 'customSoftware',
    categoryId: 'cat_custom',
    clientType_en: 'Supply Chain Enterprise',
    clientType_ar: 'شركة سلاسل إمداد كبرى',
    clientName: 'Orbit Supply Group',
    industry_en: 'Logistics & Fleet Management',
    industry_ar: 'الخدمات اللوجستية وإدارة الأساطيل',
    projectUrl: 'https://orbit.devropix.demo',
    projectDate: '2026-06',
    summary_en: 'A real-time fleet orchestration and consignment tracking platform consolidating distributed warehouse workflows across 14 hubs.',
    summary_ar: 'منصة سحابية متقدمة لإدارة وتتبع أساطيل الشحن في الوقت الفعلي وربط 14 مركز توزيع ولوجستيات.',
    challenge_en: 'The client suffered from fragmented legacy spreadsheets, manual dispatch errors, and delayed freight tracking updates that frustrated commercial accounts.',
    challenge_ar: 'كان العميل يعاني من تشتت البيانات في جداول غير مترابطة، وأخطاء التوزيع اليدوي، والتأخر في تتبع الشحنات.',
    solution_en: 'DevRopix designed and engineered an event-driven web portal with live geo-tracking, automated driver dispatching, and unified REST APIs connecting ERP databases.',
    solution_ar: 'قامت ديف روبيكس بتصميم وبناء بوابة ويب متكاملة مع تتبع جغرافي حي وأتمتة توجيه السائقين وربط واجهات برمجة التطبيقات بنظام ERP.',
    results_en: [
      'Reduced dispatch latency from 45 minutes to under 90 seconds',
      '100% cloud telemetry with sub-second driver location updates',
      'Zero downtime migration for over 250,000 historic freight manifests',
    ],
    results_ar: [
      'تقليص وقت توزيع الشحنات من 45 دقيقة إلى أقل من 90 ثانية',
      'تتبع موقع السائقين في الوقت الفعلي بزمن استجابة فائق السرعة',
      'نقل أكثر من 250,000 بوليصة شحن تاريخية بدون أي توقف للنظام',
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    deliverables_en: ['Web Portal', 'Driver Dispatch Mobile API', 'Automated Invoicing Engine', 'Design System'],
    deliverables_ar: ['بوابة الويب المركزية', 'واجهات برمجة تطبيقات الجوال', 'محرك الفواتير المؤتمت', 'نظام التصميم الشامل'],
    featured: true,
    status: 'published',
    accentColor: '#6a5ed9',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    ],
    seoTitle_en: 'Orbit Logistics Cloud Case Study | DevRopix',
    seoTitle_ar: 'دراسة حالة منصة أوربت اللوجستية | ديف روبيكس',
    seoDesc_en: 'How DevRopix engineered a real-time fleet orchestration platform reducing dispatch times by 95%.',
    seoDesc_ar: 'كيف قامت ديف روبيكس ببناء منصة تتبع أساطيل لوجستية في الوقت الفعلي وتقليص وقت التوزيع بنسبة 95%.',
    order: 1,
    createdAt: '2026-06-15T10:00:00.000Z',
    updatedAt: '2026-09-14T11:00:00.000Z',
  },
  {
    id: 'apex-fintech',
    slug: 'apex-wealth-mobile',
    name_en: 'Apex Wealth Mobile',
    name_ar: 'تطبيق أبيكس لإدارة الثروات والاستثمار',
    category: 'Mobile App',
    categoryKey: 'mobileApp',
    categoryId: 'cat_mobile',
    clientType_en: 'Private Wealth Management',
    clientType_ar: 'إدارة الاستثمارات والثروات',
    clientName: 'Apex Capital Partners',
    industry_en: 'Fintech & Investments',
    industry_ar: 'التقنية المالية والاستثمار',
    projectUrl: 'https://apex.devropix.demo',
    projectDate: '2026-05',
    summary_en: 'A biometric-secured investment portfolio mobile application for high-net-worth clients with instant multi-currency settlement.',
    summary_ar: 'تطبيق هاتف ذكي فائق الأمان لإدارة المحافظ الاستثمارية مع تسوية فورية للعملات وحماية بيومترية.',
    challenge_en: 'Existing mobile banking client had high drop-off rates due to convoluted multi-step wire verification and unresponsive chart rendering.',
    challenge_ar: 'كان التطبيق القديم يعاني من بطء في استعراض الرسوم البيانية وصعوبة إجراءات التحقق من التحويلات المالية.',
    solution_en: 'Built a native-feel Flutter mobile application featuring hardware-backed biometrics, real-time market charts, and automated PDF tax reports.',
    solution_ar: 'بناء تطبيق هجين متقدم بتقنية Flutter يدعم البصمة البيومترية ورسوم بيانية فورية بمعدل 60 إطاراً في الثانية.',
    results_en: [
      'Achieved 4.9 App Store rating across 12,000 active users',
      'Rendered real-time portfolio charts at stable 60 FPS',
      'Bank-grade encrypted token exchanges compliant with financial regulations',
    ],
    results_ar: [
      'حقق تقييم 4.9 في متجر التطبيقات لأكثر من 12,000 مستخدم نشط',
      'عرض الرسوم البيانية والأسعار اللحظية بسلاسة تامة 60 إطاراً/ثانية',
      'تشفير بنكي متكامل متوافق مع لوائح الهيئات المالية',
    ],
    techStack: ['Flutter', 'Dart', 'Node.js', 'OAuth 2.0', 'WebSockets'],
    deliverables_en: ['iOS App', 'Android App', 'Security Whitepaper', 'Biometric Auth Module'],
    deliverables_ar: ['تطبيق iOS', 'تطبيق Android', 'وثيقة الأمان المصرفي', 'وحدة التحقق البيومتري'],
    featured: false,
    status: 'published',
    accentColor: '#3f71d4',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    ],
    seoTitle_en: 'Apex Wealth Mobile Case Study | DevRopix',
    seoTitle_ar: 'دراسة حالة تطبيق أبيكس المالي | ديف روبيكس',
    seoDesc_en: 'Secure high-net-worth wealth management mobile application engineered by DevRopix.',
    seoDesc_ar: 'تطبيق إدارة محافظ استثمارية متطور وآمن من هندسة ديف روبيكس.',
    order: 2,
    createdAt: '2026-05-20T10:00:00.000Z',
    updatedAt: '2026-09-10T12:00:00.000Z',
  },
  {
    id: 'lumina-health',
    slug: 'lumina-care-portal',
    name_en: 'Lumina Care Portal',
    name_ar: 'بوابة لومينا الطبية للرعاية الصحية',
    category: 'Web Application',
    categoryKey: 'webDev',
    categoryId: 'cat_web',
    clientType_en: 'Specialized Medical Clinics',
    clientType_ar: 'مجمعات العيادات الطبية المتخصصة',
    clientName: 'Lumina Health Network',
    industry_en: 'Healthcare & Telemedicine',
    industry_ar: 'الرعاية الصحية والطب الاتصالي',
    projectUrl: 'https://lumina.devropix.demo',
    projectDate: '2026-04',
    summary_en: 'HIPAA-compliant telemedicine and patient booking web platform connecting doctors with patients seamlessly.',
    summary_ar: 'منصة ويب متوافقة مع معايير الأمان الطبية لحجز المواعيد والاستشارات الطبية المرئية المشفرة.',
    challenge_en: 'Clinics were overwhelmed by phone appointments and missed visits, while doctors struggled with fragmented medical record lookups.',
    challenge_ar: 'ضغط كبير في حجز المواعيد الهاتفية مع نسبة تخلف عالية وصعوبة الوصول الفوري لملفات المرضى.',
    solution_en: 'DevRopix developed a progressive web app with encrypted video consultations, smart doctor calendars, and automated SMS appointment reminders.',
    solution_ar: 'طوّرت ديف روبيكس منصة PWA متقدمة تدعم الاستشارات المرئية المشفرة، وتقويم الطبيب الذكي، والتنبيهات الآلية.',
    results_en: [
      'Lowered missed appointments by 42% in first quarter',
      'Secure end-to-end encrypted medical consults with zero plug-ins',
      'Integrated payment gateway handling domestic & international cards',
    ],
    results_ar: [
      'انخفاض نسبة المواعيد الفائتة بنسبة 42% في الربع الأول',
      'استشارات طبية مرئية مشفرة بالكامل دون الحاجة لتثبيت برامج إضافية',
      'بوابة دفع إلكترونية تدعم جميع البطاقات المحلية والدولية',
    ],
    techStack: ['Next.js', 'TypeScript', 'WebRTC', 'Tailwind CSS', 'PostgreSQL'],
    deliverables_en: ['Patient Booking PWA', 'Doctor Workspace', 'Video Consultation Engine'],
    deliverables_ar: ['منصة حجز المرضى PWA', 'لوحة تحكم الأطباء', 'محرك الاستشارات المرئية'],
    featured: false,
    status: 'published',
    accentColor: '#1bb152',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    ],
    seoTitle_en: 'Lumina Care Telemedicine Portal | DevRopix',
    seoTitle_ar: 'بوابة لومينا الطبية | ديف روبيكس',
    seoDesc_en: 'Telemedicine web platform built for high patient volume and secure WebRTC video consults.',
    seoDesc_ar: 'منصة طب اتصالي متطورة واستشارات مرئية آمنة.',
    order: 3,
    createdAt: '2026-04-10T10:00:00.000Z',
    updatedAt: '2026-09-08T09:00:00.000Z',
  },
  {
    id: 'kroma-design',
    slug: 'kroma-digital-experience',
    name_en: 'Kroma Digital Experience',
    name_ar: 'منظومة كروما للتجارة والتصميم الرقمي',
    category: 'UI/UX Design',
    categoryKey: 'uiux',
    categoryId: 'cat_uiux',
    clientType_en: 'E-Commerce Marketplace',
    clientType_ar: 'سوق تجارة إلكترونية متكامل',
    clientName: 'Kroma Retail Inc.',
    industry_en: 'Retail & E-Commerce',
    industry_ar: 'التجارة الإلكترونية والتجزئة',
    projectUrl: 'https://kroma.devropix.demo',
    projectDate: '2026-03',
    summary_en: 'Complete brand identity, design token library, and frictionless checkout flow redesign for a premium retail ecosystem.',
    summary_ar: 'إعادة تصميم تجربة المستخدم وهوية التصميم الرقمي ومسار الدفع السريع لمتجر تجزئة رقمي فاخر.',
    challenge_en: 'Cart abandonment was hovering at 71% due to visual clutter, confusing nested navigation, and poor mobile touch targets.',
    challenge_ar: 'ارتفاع نسبة التخلي عن سلة الشراء إلى 71% بسبب التعقيد البصري والخطوات الإضافية غير الواضحة.',
    solution_en: 'Conducted iterative user testing sessions, overhauled the typography hierarchy, and engineered a single-screen checkout with instant address validation.',
    solution_ar: 'إجراء اختبارات استخدام دقيقة، وتوحيد التسلسل الطباعي، وتصميم شاشة دفع موحدة وسريعة مع تحقق فوري من العنوان.',
    results_en: [
      'Increased mobile conversion rate by 28%',
      'Complete reusable Figma design system with 200+ accessible components',
      'Streamlined checkout time from 3.2 minutes to 48 seconds',
    ],
    results_ar: [
      'زيادة معدل التحويل للشراء عبر الجوال بنسبة 28%',
      'نظام تصميم Figma متكامل بأكثر من 200 مكون رقمي قابل لإعادة الاستخدام',
      'تقليص وقت إتمام عملية الشراء من 3.2 دقيقة إلى 48 ثانية فقط',
    ],
    techStack: ['Figma', 'Design Tokens', 'Prototyping', 'Accessibility (WCAG)'],
    deliverables_en: ['Atomic Design System', 'High-Fidelity Prototypes', 'Interactive Micro-animations'],
    deliverables_ar: ['نظام تصميم ذري', 'نماذج تفاعلية عالية الدقة', 'حركات تفاعلية ميكروية'],
    featured: false,
    status: 'published',
    accentColor: '#e07a5f',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ],
    seoTitle_en: 'Kroma E-Commerce Redesign | DevRopix',
    seoTitle_ar: 'دراسة حالة كروما للتجارة الإلكترونية | ديف روبيكس',
    seoDesc_en: 'How modern UI/UX design tokens increased mobile checkout conversion by 28%.',
    seoDesc_ar: 'كيف ساهم التصميم الاحترافي في رفع مبيعات الجوال بنسبة 28%.',
    order: 4,
    createdAt: '2026-03-12T10:00:00.000Z',
    updatedAt: '2026-09-02T15:00:00.000Z',
  },
];

// Initial Blog Posts
const SEED_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'architecting-scalable-web-applications',
    title_en: 'Architecting Scalable Web Applications: Avoiding Common Early-Stage Bottlenecks',
    title_ar: 'هندسة تطبيقات الويب القابلة للتوسع: تجنب اختناقات الأداء في المراحل المبكرة',
    category_en: 'Technology',
    category_ar: 'التقنية والهندسة',
    categoryId: 'bcat_tech',
    date: 'Sep 12, 2026',
    readTime_en: '6 min',
    readTime_ar: '6 دقائق',
    excerpt_en: 'How modern software engineering teams balance rapid feature delivery with durable component architectures, caching strategies, and database indexing.',
    excerpt_ar: 'كيف توازن الفرق الهندسية الحديثة بين سرعة إطلاق الميزات وتصميم بنية معمارية قوية واستراتيجيات التخزين المؤقت وفهرسة قواعد البيانات.',
    content_en: [
      'In early-stage software development, the temptation to move fast often leads teams to bypass foundational architectural safeguards. While building rapidly is critical to establishing product viability, technical shortcuts taken in database schema design and state management quickly compound into expensive bottlenecks as active user concurrency climbs.',
      'A common pitfall is the failure to separate read-heavy operations from transactional state mutations. By establishing clean repository patterns and introducing strategic caching layers (such as Redis) early in the project lifecycle, teams can preserve database query response times even under sudden 10x traffic spikes.',
      'At DevRopix, our development doctrine enforces strict TypeScript typing across the entire stack, automated linting pipelines, and component modularity. This guarantees that as new features are added in later sprints, existing workflows remain stable, predictable, and maintainable.',
      'When planning your next digital product, invest in decoupling your frontend UI from backend business rules through well-documented API contracts. Your future engineering team—and your users—will thank you.',
    ],
    content_ar: [
      'في المراحل الأولى لتطوير البرمجيات، غالباً ما يدفع الحماس للسرعة بعض الفرق إلى تجاوز أساسيات البنية التحتية الصلبة. ورغم أهمية سرعة الوصول إلى السوق، إلا أن التهاون في تصميم مخطط قاعدة البيانات وهيكلة الحالة يؤدي سريعاً إلى اختناقات مكلفة مع نمو أعداد المستخدمين.',
      'من الأخطاء الشائعة عدم الفصل بين عمليات القراءة المكثفة وعمليات كتابة البيانات المعقدة. من خلال تطبيق أنماط معمارية نظيفة وإدخال طبقات تخزين مؤقت فعالة مثل Redis في وقت مبكر، تضمن الحفاظ على سرعة الاستجابة حتى أثناء طفرات الزيارات المفاجئة.',
      'في ديف روبيكس، نلتزم بتطبيق معايير صارمة في كتابة الأكواد واستخدام TypeScript على كافة المستويات، مما يضمن ثبات واستقرار النظام مع كل ميزة جديدة يتم إطلاقها.',
      'عند تخطيط منتجك الرقمي القادم، احرص على فصل واجهة المستخدم عن قواعد الأعمال الخلفية عبر عقود API واضحة وموثقة.',
    ],
    author: {
      name: 'DevRopix Architecture Group',
      role_en: 'Engineering Lead',
      role_ar: 'رئيس الفريق الهندسي',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['Architecture', 'Web Development', 'Scalability', 'Databases'],
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    status: 'published',
    featured: true,
    publishedDate: '2026-09-12',
    seoTitle_en: 'Architecting Scalable Web Applications | DevRopix Insights',
    seoTitle_ar: 'هندسة تطبيقات الويب القابلة للتوسع | مدونة ديف روبيكس',
    seoDesc_en: 'Avoid early stage architectural bottlenecks with proven database indexing and modular frontend architectures.',
    seoDesc_ar: 'تعرف على أفضل ممارسات بناء تطبيقات الويب القابلة للتوسع وتجنب مشاكل الأداء.',
    createdAt: '2026-09-12T08:00:00.000Z',
    updatedAt: '2026-09-12T08:00:00.000Z',
  },
  {
    id: 'post-2',
    slug: 'design-systems-that-scale',
    title_en: 'Design Systems That Actually Ship: Bridging the Designer-to-Developer Gap',
    title_ar: 'أنظمة التصميم القابلة للتطبيق الفعلي: جسر الفجوة بين المصممين والمطورين',
    category_en: 'UI/UX',
    category_ar: 'تصميم واجهات المستخدم',
    categoryId: 'bcat_design',
    date: 'Aug 28, 2026',
    readTime_en: '5 min',
    readTime_ar: '5 دقائق',
    excerpt_en: 'Why generic UI kits fail in production and how to establish a living design token system that engineers love working with.',
    excerpt_ar: 'لماذا تفشل حزم التصميم الجاهزة في بيئات الإنتاج الفعلية وكيف تبني منظومة Design Tokens موحدة يعشق المطورون استخدامها.',
    content_en: [
      'Too many design systems end up as pristine Figma libraries that developers find impossible to implement faithfully in production code. The gap between what is designed in visual canvases and what is rendered in DOM components often causes visual drift, redundant CSS, and frustration across teams.',
      'The solution lies in Design Tokens: named entities that store visual attributes (colors, spacing steps, typography scales, elevation shadows) in a platform-agnostic format such as JSON. When both Figma and code consume the identical token source, brand consistency becomes automated.',
      'Furthermore, building component cards with strict border-radius math and enforcing high-contrast typographic ratios eliminates the ambiguity that often leads to AI-generated or template-like aesthetics.',
      'DevRopix treats design systems not as static artwork, but as reusable engineering infrastructure that accelerates every subsequent product release.',
    ],
    content_ar: [
      'الكثير من أنظمة التصميم تتحول إلى مجرد مكتبات Figma جميلة يصعب على المبرمجين تطبيقها بدقة على أرض الواقع، مما يسبب تبايناً بصرياً وتراكماً في الأكواد غير الضرورية.',
      'الحل يكمن في استخدام رموز التصميم (Design Tokens): وهي قيم محددة تخزن الألوان، والمسافات، والخطوط بتنسيق موحد يفهمه التصميم والبرمجة في آن واحد.',
      'في ديف روبيكس، نتعامل مع أنظمة التصميم كبنية تحتية برمجية تدعم وتسريّع إطلاق المنتجات القادمة مع الحفاظ على هوية بصرية متناسقة.',
    ],
    author: {
      name: 'DevRopix Product Studio',
      role_en: 'Head of Product Design',
      role_ar: 'رئيس تصميم المنتجات',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['UI/UX', 'Design Systems', 'Figma', 'Frontend'],
    featuredImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    status: 'published',
    featured: true,
    publishedDate: '2026-08-28',
    seoTitle_en: 'Design Systems That Actually Ship | DevRopix',
    seoTitle_ar: 'أنظمة التصميم القابلة للتطبيق الفعلي | ديف روبيكس',
    seoDesc_en: 'How living design tokens bridge the designer-developer gap for enterprise digital products.',
    seoDesc_ar: 'كيف تبني نظام تصميم موحد يربط المصممين بالمطورين بكفاءة عالية.',
    createdAt: '2026-08-28T09:00:00.000Z',
    updatedAt: '2026-08-28T09:00:00.000Z',
  },
];

// Initial Testimonials
const SEED_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    author: 'Tariq Al-Mansoor',
    role_en: 'Co-Founder & CTO',
    role_ar: 'الشريك المؤسس والمدير التقني',
    company: 'Orbit Logistics',
    industry_en: 'Supply Chain Technology',
    industry_ar: 'تقنية سلاسل الإمداد',
    quote_en: 'DevRopix did not just build our platform; they challenged our assumptions and prevented months of unnecessary development. Our system handles peak traffic effortlessly.',
    quote_ar: 'لم تكتفِ ديف روبيكس ببناء منصتنا فحسب، بل ناقشوا متطلباتنا بعمق ووفروا علينا شهوراً من التطوير غير المجدي. نظامنا الآن يتحمل ضغط العمل دون أي بطء.',
    rating: 5,
    featured: true,
    status: 'published',
    order: 1,
    createdAt: '2026-07-01T10:00:00.000Z',
  },
  {
    id: 't2',
    author: 'Sarah Jenkins',
    role_en: 'VP of Digital Product',
    role_ar: 'نائب رئيس المنتجات الرقمية',
    company: 'Apex Wealth Partners',
    industry_en: 'Financial Services',
    industry_ar: 'الخدمات المالية والاستثمارية',
    quote_en: 'Finding a software partner that excels in both engineering rigor and design polish is rare. DevRopix delivered our mobile app on time, and our user satisfaction ratings reflect that quality.',
    quote_ar: 'من النادر إيجاد شريك برمجي يجمع بين الدقة الهندسية العالية واللمسة الجمالية في التصميم. سلّمتنا ديف روبيكس التطبيق في الموعد المحدد وتقييمات العملاء تشهد على ذلك.',
    rating: 5,
    featured: true,
    status: 'published',
    order: 2,
    createdAt: '2026-07-15T10:00:00.000Z',
  },
  {
    id: 't3',
    author: 'Khalid Al-Ghamdi',
    role_en: 'Operations Director',
    role_ar: 'مدير العمليات التشغيلية',
    company: 'Lumina Health Clinics',
    industry_en: 'Health Systems',
    industry_ar: 'المنظومات الصحية',
    quote_en: 'The communication was transparent from sprint zero. We received working builds every week and always understood where every hour of engineering effort was focused.',
    quote_ar: 'التواصل كان في غاية الشفافية منذ اليوم الأول. كنا نتلقى نسخاً تجريبية أسبوعياً ونتابع سير العمل خطوة بخطوة بكل وضوح.',
    rating: 5,
    featured: true,
    status: 'published',
    order: 3,
    createdAt: '2026-08-01T10:00:00.000Z',
  },
];

// Initial Clients / Partners
const SEED_CLIENTS: ClientPartner[] = [
  { id: 'cli_1', name: 'Orbit Logistics', industry_en: 'Supply Chain', industry_ar: 'سلاسل الإمداد', order: 1, status: 'active', websiteUrl: 'https://orbit.com' },
  { id: 'cli_2', name: 'Apex Wealth', industry_en: 'Fintech', industry_ar: 'التقنية المالية', order: 2, status: 'active', websiteUrl: 'https://apex.com' },
  { id: 'cli_3', name: 'Lumina Care', industry_en: 'Health Systems', industry_ar: 'الرعاية الصحية', order: 3, status: 'active', websiteUrl: 'https://lumina.com' },
  { id: 'cli_4', name: 'Kroma Retail', industry_en: 'E-Commerce', industry_ar: 'التجارة الإلكترونية', order: 4, status: 'active', websiteUrl: 'https://kroma.com' },
  { id: 'cli_5', name: 'Zenith Labs', industry_en: 'B2B SaaS', industry_ar: 'البرمجيات السحابية', order: 5, status: 'active', websiteUrl: 'https://zenith.com' },
  { id: 'cli_6', name: 'Vortex Energy', industry_en: 'CleanTech', industry_ar: 'الطاقة النظيفة', order: 6, status: 'active', websiteUrl: 'https://vortex.com' },
];

// Initial Messages
const SEED_MESSAGES: ContactMessage[] = [
  {
    id: 'msg_101',
    name: 'Faisal Al-Otaibi',
    email: 'faisal@logisource.sa',
    phone: '+966 50 123 4567',
    company: 'LogiSource KSA',
    service: 'Custom SaaS / Web Platform',
    budget: '$25,000 - $50,000',
    message: 'We are looking to build an internal dashboard for fleet dispatching with real-time GPS tracking and automated invoicing. We loved your Orbit case study and would like to schedule an introductory discovery session next Tuesday.',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
  },
  {
    id: 'msg_102',
    name: 'Elena Rostova',
    email: 'elena@finpulse.io',
    phone: '+971 52 987 6543',
    company: 'FinPulse MENA',
    service: 'Mobile Application (iOS & Android)',
    budget: '$50,000 - $100,000',
    message: 'Hello DevRopix team. We are a seed-stage fintech launching in the UAE and looking for a dedicated engineering partner to build our Flutter mobile app with biometric KYC. Please reach out with your availability.',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
  },
  {
    id: 'msg_103',
    name: 'Bader Al-Husseini',
    email: 'bader@clinicsync.com',
    phone: '+966 55 555 1212',
    company: 'ClinicSync',
    service: 'Enterprise System Modernization',
    budget: '$10,000 - $25,000',
    message: 'We need to migrate our legacy dental clinic booking system into a cloud-native React app with WhatsApp reminder integration.',
    status: 'read',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
];

// Initial Media Assets
const SEED_MEDIA: MediaItem[] = [
  {
    id: 'med_1',
    name: 'devropix-hero-banner.jpg',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    type: 'image/jpeg',
    size: '342 KB',
    dimensions: '1200 x 800',
    uploadDate: '2026-09-01',
  },
  {
    id: 'med_2',
    name: 'orbit-case-study-cover.jpg',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    type: 'image/jpeg',
    size: '418 KB',
    dimensions: '1200 x 800',
    uploadDate: '2026-09-05',
  },
  {
    id: 'med_3',
    name: 'apex-mobile-dashboard.jpg',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    type: 'image/jpeg',
    size: '289 KB',
    dimensions: '1200 x 800',
    uploadDate: '2026-09-08',
  },
  {
    id: 'med_4',
    name: 'lumina-telemedicine-preview.jpg',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    type: 'image/jpeg',
    size: '315 KB',
    dimensions: '1200 x 800',
    uploadDate: '2026-09-10',
  },
];

// Initial Global Settings
const SEED_SETTINGS: GlobalSettings = {
  general: {
    companyName: 'DevRopix',
    logoUrl: '/logo.svg',
    faviconUrl: '/favicon.ico',
    email: 'contact@devropix.com',
    phone: '+201110428301',
    whatsapp: '+201110428301',
    address_en: 'Hurghada, Red Sea, Egypt',
    address_ar: 'الغردقة، البحر الأحمر، مصر',
  },
  social: {
    facebook: 'https://facebook.com/devropix',
    instagram: 'https://instagram.com/devropix',
    linkedin: 'https://linkedin.com/company/devropix',
    x: 'https://x.com/devropix',
    tiktok: 'https://tiktok.com/@devropix',
    youtube: 'https://youtube.com/@devropix',
    github: 'https://github.com/devropix',
  },
  socialLinks: {
    facebook: 'https://facebook.com/devropix',
    instagram: 'https://instagram.com/devropix',
    linkedin: 'https://linkedin.com/company/devropix',
    twitter: 'https://x.com/devropix',
    tiktok: 'https://tiktok.com/@devropix',
    youtube: 'https://youtube.com/@devropix',
    github: 'https://github.com/devropix',
    discord: '',
    dribbble: '',
  },
  seo: {
    defaultMetaTitle_en: 'DevRopix – Modern Software Engineering & Digital Products',
    defaultMetaTitle_ar: 'ديف روبيكس – هندسة البرمجيات وتطوير المنتجات الرقمية الحديثة',
    defaultMetaDesc_en: 'Bespoke web applications, cross-platform mobile apps, and scalable digital products engineered for ambitious brands.',
    defaultMetaDesc_ar: 'تطوير تطبيقات الويب والجوال المتقدمة، وحلول البرمجيات السحابية المخصصة للشركات الطموحة.',
    ogImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    googleAnalyticsId: 'G-DVX202609',
    searchEngineVisibility: true,
  },
  contact: {
    contactEmail: 'projects@devropix.com',
    whatsapp: '+201110428301',
    phone: '+201110428301',
    workingHours_en: 'Sunday - Thursday: 9:00 AM – 6:00 PM (GMT+3)',
    workingHours_ar: 'الأحد - الخميس: 9:00 صباحاً – 6:00 مساءً (توقيت مكة)',
  },
  footer: {
    footerDesc_en: 'Modern Software Engineering & Digital Product Studio. We build mission-critical web applications, mobile platforms, and enterprise software.',
    footerDesc_ar: 'استوديو هندسة وتطوير البرمجيات والمنتجات الرقمية الحديثة. نبني تطبيقات الويب والجوال المتقدمة بأعلى معايير الجودة العالمية.',
    copyright_en: '© 2026 DevRopix. All rights reserved.',
    copyright_ar: '© 2026 ديف روبيكس. جميع الحقوق محفوظة.',
  },
};

// Initial Homepage Content
const SEED_HOMEPAGE: HomepageContent = {
  hero: {
    tag_en: 'DevRopix • Software & Digital Products',
    tag_ar: 'ديف روبيكس • هندسة وتطوير المنتجات الرقمية',
    badge_en: 'DevRopix • Software & Digital Products',
    badge_ar: 'ديف روبيكس • هندسة وتطوير المنتجات الرقمية',
    title_en: 'We Build Modern Software & High-Impact Digital Products',
    title_ar: 'نبني برمجيات حديثة ومنتجات رقمية عالية الأثر',
    subtitle_en: 'DevRopix is a dedicated technology partner delivering bespoke web applications, mobile platforms, and custom software engineered for enterprise scale and speed.',
    subtitle_ar: 'ديف روبيكس هي شريكك التقني الموثوق لبناء تطبيقات الويب والهواتف والبرمجيات المخصصة المصممة للتوسع والسرعة والاستدامة.',
    primaryCtaText_en: 'Start a Project',
    primaryCtaText_ar: 'ابدأ مشروعك الآن',
    primaryCtaLink: '/contact',
    secondaryCtaText_en: 'Explore Selected Work',
    secondaryCtaText_ar: 'استعرض أعمالنا السابقة',
    secondaryCtaLink: '#portfolio',
  },
  stats: [
    {
      value: '35+',
      label_en: 'Projects Delivered',
      label_ar: 'مشروعاً ناجحاً تم تسليمه',
    },
    {
      value: '99.9%',
      label_en: 'Uptime Reliability',
      label_ar: 'نسبة استقرار وجاهزية الأنظمة',
    },
    {
      value: '60 FPS',
      label_en: 'Fluid Performance',
      label_ar: 'أداء فائق وسلس للتطبيقات',
    },
    {
      value: '100%',
      label_en: 'TypeScript & Type-Safe',
      label_ar: 'أكواد مؤمنة ومكتوبة بدقة',
    },
  ],
  trustedByEnabled: true,
  processSteps: [
    {
      stepNumber: 1,
      title_en: 'Architecture & Discovery',
      title_ar: 'التخطيط وتحديد المعمارية',
      desc_en: 'Deep-dive into business workflows, data schemas, API contracts, and user journeys before writing a single line of code.',
      desc_ar: 'دراسة متعمقة لنموذج العمل، ومخططات البيانات، ونقاط الربط قبل البدء في كتابة الأكواد.',
    },
    {
      stepNumber: 2,
      title_en: 'Iterative Engineering',
      title_ar: 'التطوير الهندسي التكراري',
      desc_en: 'Weekly working software builds in 2-week agile sprints with strict automated testing and type safety.',
      desc_ar: 'بناء تدريجي على دورات رشيقة مع اختبارات آلية وفحص مستمر لجودة واستقرار الأكواد.',
    },
    {
      stepNumber: 3,
      title_en: 'Quality Audit & Load Testing',
      title_ar: 'تدقيق الجودة واختبارات الضغط',
      desc_en: 'Auditing security, accessibility, cross-device responsiveness, and peak concurrency latency.',
      desc_ar: 'فحص الأمان، وسهولة الوصول، وتوافق كافة الشاشات، واختبار الأداء تحت ضغط الزيارات العالي.',
    },
    {
      stepNumber: 4,
      title_en: 'Deployment & Telemetry',
      title_ar: 'النشر السحابي والمراقبة المستمرة',
      desc_en: 'Zero-downtime production rollout with continuous telemetry monitoring and guaranteed SLA support.',
      desc_ar: 'إطلاق سلس بدون انقطاع مع ربط أنظمة المراقبة الفورية واتفاقية دعم فني موثوقة.',
    },
  ],
  ctaBanner: {
    title_en: 'Let’s Engineer Your Next Digital Solution',
    title_ar: 'لنبدأ في هندسة وتطوير حلّك البرمجي القادم',
    subtitle_en: 'Schedule an introductory architecture discussion with our engineering team to review your scope and receive a transparent timeline.',
    subtitle_ar: 'احجز جلسة استشارية هندسية مع فريقنا التقني لمناقشة نطاق العمل واستلام خارطة طريق واضحة ومحددة.',
    buttonText_en: 'Contact DevRopix',
    buttonText_ar: 'تواصل مع فريق ديف روبيكس',
    buttonLink: '/contact',
  },
};

// Initial Job Postings
const SEED_JOBS: JobPosting[] = [
  {
    id: 'job_fullstack',
    title_en: 'Senior Full-Stack TypeScript Engineer',
    title_ar: 'مهندس برمجيات متكامل (Full-Stack TypeScript)',
    department_en: 'Engineering',
    department_ar: 'الهندسة والتطوير',
    location_en: 'Hurghada, Egypt / Remote',
    location_ar: 'الغردقة، مصر / عن بُعد',
    type: 'Full-time',
    experience_en: '3-5+ Years',
    experience_ar: '٣-٥+ سنوات خبرة',
    description_en: 'We are looking for an experienced Senior Full-Stack Engineer to lead the architecture and implementation of scalable web platforms, APIs, and real-time cloud services.',
    description_ar: 'نبحث عن مهندس برمجيات أول ذو خبرة عالية لقيادة بناء وتطوير منصات الويب السحابية، وواجهات برمجة التطبيقات (APIs)، والأنظمة المتزامنة فائقة السرعة.',
    requirements_en: [
      'Strong proficiency with React, TypeScript, Node.js, and modern databases.',
      'Experience architecting modular, testable, and production-grade applications.',
      'Familiarity with cloud platforms (GCP, AWS) and Docker containerization.',
      'Strong problem-solving and proactive communication skills.',
    ],
    requirements_ar: [
      'إتقان عميق لتقنيات React وTypeScript وNode.js وقواعد البيانات الحديثة.',
      'خبرة في تصميم وتطوير بنى برمجية معيارية وقابلة للتوسع والإنتاج الفعلي.',
      'معرفة بمنصات الحوسبة السحابية (GCP، AWS) وتقنيات الحاويات Docker.',
      'مهارات تواصل وحل مشكلات استثنائية ضمن بيئة عمل سريعة النمو.',
    ],
    responsibilities_en: [
      'Build end-to-end features across frontend and backend services with clean architecture.',
      'Optimize application performance, accessibility, and query latency.',
      'Collaborate closely with UI/UX designers and product managers.',
    ],
    responsibilities_ar: [
      'تطوير ميزات متكاملة في الواجهات الأمامية والأنظمة الخلفية بكود نظيف ومعياري.',
      'تحسين سرعة وأداء الأنظمة ومعايير الأمان وسهولة الوصول وزمن الاستجابة.',
      'التعاون الوثيق مع مصممي الواجهات ومديري المنتجات لتسليم المشروعات بجودة فائقة.',
    ],
    status: 'published',
    postedAt: '2026-03-01',
  },
  {
    id: 'job_mobile',
    title_en: 'Mobile Application Developer (Flutter / React Native)',
    title_ar: 'مطور تطبيقات هواتف ذكية (Flutter / React Native)',
    department_en: 'Mobile Engineering',
    department_ar: 'تطوير تطبيقات الجوال',
    location_en: 'Hurghada, Egypt / Hybrid',
    location_ar: 'الغردقة، مصر / هجين',
    type: 'Full-time',
    experience_en: '2-4 Years',
    experience_ar: '٢-٤ سنوات خبرة',
    description_en: 'Seeking a talented mobile engineer passionate about crafting smooth 60fps animations, intuitive offline-first mobile apps, and robust API integrations.',
    description_ar: 'نبحث عن مطور تطبيقات هواتف موهوب وشغوف ببناء تطبيقات سلسة تدعم العمل دون اتصال بالإنترنت مع تجربة مستخدم مبهرة.',
    requirements_en: [
      'Proven experience shipping iOS and Android apps using Flutter or React Native.',
      'Solid grasp of state management, offline storage, and push notifications.',
      'Strong eye for micro-interactions and pixel-perfect design adherence.',
    ],
    requirements_ar: [
      'خبرة عملية مثبتة في نشر تطبيقات لأنظمة iOS وAndroid باستخدام Flutter أو React Native.',
      'فهم متعمق لإدارة الحالة والتخزين المحلي والإشعارات الفورية.',
      'اهتمام فائق بالتفاصيل البصرية والتطابق التام مع تصاميم واجهات الاستخدام.',
    ],
    responsibilities_en: [
      'Develop high-performance mobile apps for diverse consumer and enterprise domains.',
      'Integrate RESTful and WebSocket backends reliably with complete error handling.',
      'Maintain automated build and distribution pipelines for app store submissions.',
    ],
    responsibilities_ar: [
      'برمجة وتطوير تطبيقات جوال عالية الكفاءة لمختلف قطاعات الأعمال والمستهلكين.',
      'ربط الأنظمة الخلفية عبر RESTful وWebSockets مع معالجة استثنائية للأخطاء.',
      'إدارة وتسهيل مسارات النشر الآلي على متجري App Store وGoogle Play.',
    ],
    status: 'published',
    postedAt: '2026-03-10',
  },
  {
    id: 'job_uiux',
    title_en: 'UI/UX Product & Design Systems Designer',
    title_ar: 'مصمم واجهات وتجربة مستخدم وأنظمة تصميم (UI/UX)',
    department_en: 'Design & Experience',
    department_ar: 'التصميم وتجربة المستخدم',
    location_en: 'Hurghada, Egypt / Remote',
    location_ar: 'الغردقة، مصر / عن بُعد',
    type: 'Full-time',
    experience_en: '3+ Years',
    experience_ar: '٣+ سنوات خبرة',
    description_en: 'Join our design collective to create high-conversion interfaces, comprehensive Figma design systems, and delightful digital product journeys.',
    description_ar: 'انضم إلى فريق التصميم لتصميم واجهات مستخدم متميزة، وأنظمة تصميم شاملة في Figma، ورحلات رقمية ملهمة لعملائنا.',
    requirements_en: [
      'Extensive portfolio demonstrating web and mobile UX case studies with rationale.',
      'Mastery of Figma (auto-layout, components, variables, tokens) and interactive prototyping.',
      'Understanding of modern frontend styling constraints (Tailwind CSS, responsive breakpoints).',
    ],
    requirements_ar: [
      'ملف أعمال (Portfolio) غني بدراسات حالة حقيقية لتطبيقات الويب والجوال مع توضيح منهجية التفكير.',
      'احتراف تام لبرنامج Figma ومكوناته ومتغيراته ونماذج التفاعل الأولية.',
      'فهم عملي لمعايير التنسيق البرمجية الحديثة مثل Tailwind CSS واستجابة الشاشات المختلفة.',
    ],
    responsibilities_en: [
      'Lead user research, wireframing, high-fidelity UI design, and design system governance.',
      'Work alongside engineers during implementation to ensure design fidelity.',
      'Conduct usability tests and iterate based on quantitative metrics.',
    ],
    responsibilities_ar: [
      'إجراء بحوث المستخدمين، وتصميم المخططات الهيكلية والواجهات النهائية عالية الدقة.',
      'متابعة ومراجعة التنفيذ البرمجي مع المطورين لضمان التطابق التام مع التصميم.',
      'إجراء اختبارات قابلية الاستخدام وتطوير الحلول وفق البيانات وتجربة العملاء.',
    ],
    status: 'published',
    postedAt: '2026-03-15',
  },
];

// Initial Activity Logs
const SEED_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act_1',
    action: 'System Initialized',
    entityType: 'System',
    entityTitle: 'DevRopix CMS Engine',
    userEmail: 'admin@devropix.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'act_2',
    action: 'Published',
    entityType: 'Project',
    entityTitle: 'Orbit Logistics Cloud',
    userEmail: 'admin@devropix.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'act_3',
    action: 'New Message Received',
    entityType: 'Message',
    entityTitle: 'From Faisal Al-Otaibi',
    userEmail: 'system',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
];

type ChangeListener = () => void;

class CmsStoreService {
  private listeners: Set<ChangeListener> = new Set();

  constructor() {
    this.initializeIfEmpty();
  }

  public subscribe(listener: ChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (e) {
        console.error('Error notifying CMS listener:', e);
      }
    });
  }

  private get<T>(key: string, fallback: T): T {
    const raw = safeLocalStorage.getItem(CMS_STORAGE_PREFIX + key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    safeLocalStorage.setItem(CMS_STORAGE_PREFIX + key, JSON.stringify(value));
    this.notify();
  }

  public initializeIfEmpty(): void {
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'services')) {
      this.set('services', SEED_SERVICES);
    }
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'projects')) {
      this.set('projects', SEED_PROJECTS);
    }
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'project_categories')) {
      this.set('project_categories', SEED_PROJECT_CATEGORIES);
    }
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'blog_posts')) {
      this.set('blog_posts', SEED_BLOG_POSTS);
    }
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'blog_categories')) {
      this.set('blog_categories', SEED_BLOG_CATEGORIES);
    }
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'testimonials')) {
      this.set('testimonials', SEED_TESTIMONIALS);
    }
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'clients')) {
      this.set('clients', SEED_CLIENTS);
    }
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'messages')) {
      this.set('messages', SEED_MESSAGES);
    }
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'media')) {
      this.set('media', SEED_MEDIA);
    }
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'settings')) {
      this.set('settings', SEED_SETTINGS);
    }
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'homepage')) {
      this.set('homepage', SEED_HOMEPAGE);
    }
    if (!safeLocalStorage.getItem(CMS_STORAGE_PREFIX + 'activity_logs')) {
      this.set('activity_logs', SEED_ACTIVITY_LOGS);
    }
  }

  public logActivity(action: string, entityType: string, entityTitle: string): void {
    const user = AuthService.getCurrentUser();
    const logs = this.getActivityLogs();
    const newLog: ActivityLog = {
      id: `act_${Date.now()}`,
      action,
      entityType,
      entityTitle,
      userEmail: user ? user.email : 'system',
      timestamp: new Date().toISOString(),
    };
    const updated = [newLog, ...logs.slice(0, 49)]; // keep latest 50
    this.set('activity_logs', updated);
  }

  public getActivityLogs(): ActivityLog[] {
    return this.get<ActivityLog[]>('activity_logs', SEED_ACTIVITY_LOGS);
  }

  // --- SERVICES CRUD ---
  public getServices(): ServiceItem[] {
    return this.get<ServiceItem[]>('services', SEED_SERVICES);
  }

  public createService(item: Omit<ServiceItem, 'id' | 'createdAt' | 'updatedAt'>): ServiceItem {
    const services = this.getServices();
    const newService: ServiceItem = {
      ...item,
      id: `svc_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...services, newService];
    this.set('services', updated);
    this.logActivity('Created', 'Service', newService.title_en || newService.titleKey || 'Service');
    return newService;
  }

  public updateService(id: string, updates: Partial<ServiceItem>): ServiceItem | null {
    const services = this.getServices();
    const idx = services.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    const updatedService: ServiceItem = {
      ...services[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    services[idx] = updatedService;
    this.set('services', [...services]);
    this.logActivity('Updated', 'Service', updatedService.title_en || updatedService.titleKey || 'Service');
    return updatedService;
  }

  public deleteService(id: string): boolean {
    const services = this.getServices();
    const target = services.find((s) => s.id === id);
    if (!target) return false;
    const filtered = services.filter((s) => s.id !== id);
    this.set('services', filtered);
    this.logActivity('Deleted', 'Service', target.title_en || target.titleKey || 'Service');
    return true;
  }

  public toggleServicePublish(id: string): boolean {
    const service = this.getServices().find((s) => s.id === id);
    if (!service) return false;
    const newStatus = service.status === 'published' ? 'draft' : 'published';
    this.updateService(id, { status: newStatus });
    return true;
  }

  public toggleServiceFeatured(id: string): boolean {
    const service = this.getServices().find((s) => s.id === id);
    if (!service) return false;
    this.updateService(id, { featured: !service.featured });
    return true;
  }

  // --- PROJECTS CRUD ---
  public getProjects(): ProjectItem[] {
    return this.get<ProjectItem[]>('projects', SEED_PROJECTS);
  }

  public createProject(item: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>): ProjectItem {
    const projects = this.getProjects();
    const newProject: ProjectItem = {
      ...item,
      id: `proj_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...projects, newProject];
    this.set('projects', updated);
    this.logActivity('Created', 'Project', newProject.name_en || newProject.name || 'Project');
    return newProject;
  }

  public updateProject(id: string, updates: Partial<ProjectItem>): ProjectItem | null {
    const projects = this.getProjects();
    const idx = projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const updatedProject: ProjectItem = {
      ...projects[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    projects[idx] = updatedProject;
    this.set('projects', [...projects]);
    this.logActivity('Updated', 'Project', updatedProject.name_en || updatedProject.name || 'Project');
    return updatedProject;
  }

  public duplicateProject(id: string): ProjectItem | null {
    const projects = this.getProjects();
    const target = projects.find((p) => p.id === id);
    if (!target) return null;
    const duplicated: ProjectItem = {
      ...target,
      id: `proj_${Date.now()}`,
      slug: `${target.slug || 'project'}-copy-${Date.now().toString().slice(-4)}`,
      name_en: `${target.name_en || target.name || 'Project'} (Copy)`,
      name_ar: `${target.name_ar || target.name || 'مشروع'} (نسخة)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.set('projects', [...projects, duplicated]);
    this.logActivity('Duplicated', 'Project', duplicated.name_en || 'Project');
    return duplicated;
  }

  public deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const target = projects.find((p) => p.id === id);
    if (!target) return false;
    const filtered = projects.filter((p) => p.id !== id);
    this.set('projects', filtered);
    this.logActivity('Deleted', 'Project', target.name_en || target.name || 'Project');
    return true;
  }

  public toggleProjectPublish(id: string): boolean {
    const project = this.getProjects().find((p) => p.id === id);
    if (!project) return false;
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    this.updateProject(id, { status: newStatus });
    return true;
  }

  public toggleProjectFeatured(id: string): boolean {
    const project = this.getProjects().find((p) => p.id === id);
    if (!project) return false;
    this.updateProject(id, { featured: !project.featured });
    return true;
  }

  // --- PROJECT CATEGORIES CRUD ---
  public getProjectCategories(): ProjectCategory[] {
    return this.get<ProjectCategory[]>('project_categories', SEED_PROJECT_CATEGORIES);
  }

  public createProjectCategory(item: Omit<ProjectCategory, 'id'>): ProjectCategory {
    const cats = this.getProjectCategories();
    const newCat: ProjectCategory = { ...item, id: `cat_${Date.now()}` };
    this.set('project_categories', [...cats, newCat]);
    this.logActivity('Created', 'Project Category', newCat.name_en);
    return newCat;
  }

  public updateProjectCategory(id: string, updates: Partial<ProjectCategory>): ProjectCategory | null {
    const cats = this.getProjectCategories();
    const idx = cats.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    cats[idx] = { ...cats[idx], ...updates };
    this.set('project_categories', [...cats]);
    this.logActivity('Updated', 'Project Category', cats[idx].name_en);
    return cats[idx];
  }

  public deleteProjectCategory(id: string): boolean {
    const cats = this.getProjectCategories();
    const target = cats.find((c) => c.id === id);
    if (!target) return false;
    this.set('project_categories', cats.filter((c) => c.id !== id));
    this.logActivity('Deleted', 'Project Category', target.name_en);
    return true;
  }

  // --- BLOG POSTS CRUD ---
  public getBlogPosts(): BlogPost[] {
    return this.get<BlogPost[]>('blog_posts', SEED_BLOG_POSTS);
  }

  public createBlogPost(item: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost {
    const posts = this.getBlogPosts();
    const newPost: BlogPost = {
      ...item,
      id: `post_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.set('blog_posts', [...posts, newPost]);
    this.logActivity('Created', 'Blog Post', newPost.title_en || newPost.title || 'Blog Post');
    return newPost;
  }

  public updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = this.getBlogPosts();
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const updatedPost: BlogPost = {
      ...posts[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    posts[idx] = updatedPost;
    this.set('blog_posts', [...posts]);
    this.logActivity('Updated', 'Blog Post', updatedPost.title_en || updatedPost.title || 'Blog Post');
    return updatedPost;
  }

  public deleteBlogPost(id: string): boolean {
    const posts = this.getBlogPosts();
    const target = posts.find((p) => p.id === id);
    if (!target) return false;
    this.set('blog_posts', posts.filter((p) => p.id !== id));
    this.logActivity('Deleted', 'Blog Post', target.title_en || target.title || 'Blog Post');
    return true;
  }

  public toggleBlogPublish(id: string): boolean {
    const post = this.getBlogPosts().find((p) => p.id === id);
    if (!post) return false;
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    this.updateBlogPost(id, { status: newStatus });
    return true;
  }

  public toggleBlogPostPublish(id: string): boolean {
    return this.toggleBlogPublish(id);
  }

  public toggleBlogPostFeatured(id: string): boolean {
    const post = this.getBlogPosts().find((p) => p.id === id);
    if (!post) return false;
    this.updateBlogPost(id, { featured: !post.featured });
    return true;
  }

  // --- BLOG CATEGORIES CRUD ---
  public getBlogCategories(): BlogCategory[] {
    return this.get<BlogCategory[]>('blog_categories', SEED_BLOG_CATEGORIES);
  }

  public createBlogCategory(item: Omit<BlogCategory, 'id'>): BlogCategory {
    const cats = this.getBlogCategories();
    const newCat: BlogCategory = { ...item, id: `bcat_${Date.now()}` };
    this.set('blog_categories', [...cats, newCat]);
    this.logActivity('Created', 'Blog Category', newCat.name_en);
    return newCat;
  }

  public updateBlogCategory(id: string, updates: Partial<BlogCategory>): BlogCategory | null {
    const cats = this.getBlogCategories();
    const idx = cats.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    cats[idx] = { ...cats[idx], ...updates };
    this.set('blog_categories', [...cats]);
    this.logActivity('Updated', 'Blog Category', cats[idx].name_en);
    return cats[idx];
  }

  public deleteBlogCategory(id: string): boolean {
    const cats = this.getBlogCategories();
    const target = cats.find((c) => c.id === id);
    if (!target) return false;
    this.set('blog_categories', cats.filter((c) => c.id !== id));
    this.logActivity('Deleted', 'Blog Category', target.name_en);
    return true;
  }

  // --- TESTIMONIALS CRUD ---
  public getTestimonials(): TestimonialItem[] {
    return this.get<TestimonialItem[]>('testimonials', SEED_TESTIMONIALS);
  }

  public createTestimonial(item: Omit<TestimonialItem, 'id' | 'createdAt'>): TestimonialItem {
    const items = this.getTestimonials();
    const newItem: TestimonialItem = {
      ...item,
      id: `t_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.set('testimonials', [...items, newItem]);
    this.logActivity('Created', 'Testimonial', newItem.author);
    return newItem;
  }

  public updateTestimonial(id: string, updates: Partial<TestimonialItem>): TestimonialItem | null {
    const items = this.getTestimonials();
    const idx = items.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...updates };
    this.set('testimonials', [...items]);
    this.logActivity('Updated', 'Testimonial', items[idx].author);
    return items[idx];
  }

  public deleteTestimonial(id: string): boolean {
    const items = this.getTestimonials();
    const target = items.find((t) => t.id === id);
    if (!target) return false;
    this.set('testimonials', items.filter((t) => t.id !== id));
    this.logActivity('Deleted', 'Testimonial', target.author);
    return true;
  }

  public toggleTestimonialPublish(id: string): boolean {
    const item = this.getTestimonials().find((t) => t.id === id);
    if (!item) return false;
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    this.updateTestimonial(id, { status: newStatus });
    return true;
  }

  // --- CLIENTS / TRUSTED BY CRUD ---
  public getClients(): ClientPartner[] {
    return this.get<ClientPartner[]>('clients', SEED_CLIENTS);
  }

  public createClient(item: Omit<ClientPartner, 'id'>): ClientPartner {
    const items = this.getClients();
    const newItem: ClientPartner = { ...item, id: `cli_${Date.now()}` };
    this.set('clients', [...items, newItem]);
    this.logActivity('Created', 'Partner Client', newItem.name);
    return newItem;
  }

  public updateClient(id: string, updates: Partial<ClientPartner>): ClientPartner | null {
    const items = this.getClients();
    const idx = items.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...updates };
    this.set('clients', [...items]);
    this.logActivity('Updated', 'Partner Client', items[idx].name);
    return items[idx];
  }

  public deleteClient(id: string): boolean {
    const items = this.getClients();
    const target = items.find((c) => c.id === id);
    if (!target) return false;
    this.set('clients', items.filter((c) => c.id !== id));
    this.logActivity('Deleted', 'Partner Client', target.name);
    return true;
  }

  public reorderClients(newOrder: ClientPartner[]): void {
    const updated = newOrder.map((c, i) => ({ ...c, order: i + 1 }));
    this.set('clients', updated);
  }

  // --- MESSAGES INBOX ---
  public getMessages(): ContactMessage[] {
    return this.get<ContactMessage[]>('messages', SEED_MESSAGES);
  }

  public addMessage(item: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const messages = this.getMessages();
    const newMsg: ContactMessage = {
      ...item,
      id: `msg_${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    this.set('messages', [newMsg, ...messages]);
    this.logActivity('New Contact Message', 'Message', `From ${newMsg.name}`);
    return newMsg;
  }

  public updateMessageStatus(id: string, status: 'unread' | 'read' | 'replied' | 'archived'): void {
    const messages = this.getMessages();
    const idx = messages.findIndex((m) => m.id === id);
    if (idx !== -1) {
      messages[idx].status = status;
      this.set('messages', [...messages]);
    }
  }

  public deleteMessage(id: string): boolean {
    const messages = this.getMessages();
    const filtered = messages.filter((m) => m.id !== id);
    this.set('messages', filtered);
    return true;
  }

  public getUnreadMessagesCount(): number {
    return this.getMessages().filter((m) => m.status === 'unread').length;
  }

  // --- CAREERS & JOB POSTINGS ---
  public getJobs(): JobPosting[] {
    return this.get<JobPosting[]>('jobs', SEED_JOBS);
  }

  public getPublishedJobs(): JobPosting[] {
    return this.getJobs().filter((j) => j.status === 'published');
  }

  public getJobById(id: string): JobPosting | undefined {
    return this.getJobs().find((j) => j.id === id);
  }

  public saveJob(job: JobPosting): JobPosting {
    const jobs = this.getJobs();
    const idx = jobs.findIndex((j) => j.id === job.id);
    if (idx >= 0) {
      jobs[idx] = job;
      this.set('jobs', [...jobs]);
      this.logActivity('Updated Job', 'Job', job.title_en);
    } else {
      jobs.unshift(job);
      this.set('jobs', [...jobs]);
      this.logActivity('Created Job', 'Job', job.title_en);
    }
    return job;
  }

  public deleteJob(id: string): boolean {
    const jobs = this.getJobs();
    const target = jobs.find((j) => j.id === id);
    if (!target) return false;
    this.set('jobs', jobs.filter((j) => j.id !== id));
    this.logActivity('Deleted Job', 'Job', target.title_en);
    return true;
  }

  // --- JOB APPLICATIONS ---
  public getJobApplications(): JobApplication[] {
    return this.get<JobApplication[]>('job_applications', []);
  }

  public submitJobApplication(
    app: Omit<JobApplication, 'id' | 'createdAt' | 'status'>
  ): JobApplication {
    const apps = this.getJobApplications();
    const newApp: JobApplication = {
      ...app,
      id: `app_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    this.set('job_applications', [newApp, ...apps]);
    this.logActivity('Job Application Received', 'Job Application', `${newApp.fullName} for ${newApp.jobTitle}`);
    return newApp;
  }

  public updateApplicationStatus(id: string, status: JobApplication['status']): void {
    const apps = this.getJobApplications();
    const idx = apps.findIndex((a) => a.id === id);
    if (idx !== -1) {
      apps[idx].status = status;
      this.set('job_applications', [...apps]);
    }
  }

  // --- MEDIA ASSETS ---
  public getMedia(): MediaItem[] {
    return this.get<MediaItem[]>('media', SEED_MEDIA);
  }

  public getMediaList(): MediaItem[] {
    return this.getMedia();
  }

  public uploadMedia(item: Omit<MediaItem, 'id' | 'uploadDate'>): MediaItem {
    const media = this.getMedia();
    const newMedia: MediaItem = {
      ...item,
      id: `med_${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
    };
    this.set('media', [newMedia, ...media]);
    this.logActivity('Uploaded', 'Media Asset', newMedia.name || newMedia.title || 'Asset');
    return newMedia;
  }

  public addMedia(item: Omit<MediaItem, 'id' | 'uploadDate'>): MediaItem {
    return this.uploadMedia(item);
  }

  public deleteMedia(id: string): boolean {
    const media = this.getMedia();
    const target = media.find((m) => m.id === id);
    if (!target) return false;
    this.set('media', media.filter((m) => m.id !== id));
    this.logActivity('Deleted', 'Media Asset', target.name);
    return true;
  }

  // --- SETTINGS ---
  public getSettings(): GlobalSettings {
    const raw = this.get<GlobalSettings>('settings', SEED_SETTINGS);
    let changed = false;

    // Migrate old placeholder phone/whatsapp numbers cached in user's localStorage
    if (!raw.contact) {
      raw.contact = { ...SEED_SETTINGS.contact };
      changed = true;
    }
    if (!raw.general) {
      raw.general = { ...SEED_SETTINGS.general };
      changed = true;
    }

    if (!raw.contact.whatsapp || raw.contact.whatsapp.includes('966') || raw.contact.whatsapp.includes('000 0000')) {
      raw.contact.whatsapp = '+201110428301';
      changed = true;
    }
    if (!raw.general.whatsapp || raw.general.whatsapp.includes('966') || raw.general.whatsapp.includes('000 0000')) {
      raw.general.whatsapp = '+201110428301';
      changed = true;
    }
    if (!raw.contact.phone || raw.contact.phone.includes('966') || raw.contact.phone.includes('000 0000')) {
      raw.contact.phone = '+201110428301';
      changed = true;
    }
    if (!raw.general.phone || raw.general.phone.includes('966') || raw.general.phone.includes('000 0000')) {
      raw.general.phone = '+201110428301';
      changed = true;
    }

    if (!raw.general.address_en || raw.general.address_en.includes('Riyadh') || raw.general.address_en.includes('Saudi')) {
      raw.general.address_en = 'Hurghada, Red Sea, Egypt';
      changed = true;
    }
    if (!raw.general.address_ar || raw.general.address_ar.includes('الرياض') || raw.general.address_ar.includes('السعودية')) {
      raw.general.address_ar = 'الغردقة، البحر الأحمر، مصر';
      changed = true;
    }

    if (!raw.socialLinks) {
      raw.socialLinks = {
        facebook: raw.social?.facebook || SEED_SETTINGS.social.facebook,
        instagram: raw.social?.instagram || SEED_SETTINGS.social.instagram,
        linkedin: raw.social?.linkedin || SEED_SETTINGS.social.linkedin,
        twitter: raw.social?.x || SEED_SETTINGS.social.x,
        tiktok: (raw.social as any)?.tiktok || 'https://tiktok.com/@devropix',
        youtube: raw.social?.youtube || SEED_SETTINGS.social.youtube,
        github: raw.social?.github || SEED_SETTINGS.social.github,
        discord: '',
        dribbble: '',
      };
      changed = true;
    } else if (!raw.socialLinks.tiktok) {
      raw.socialLinks.tiktok = 'https://tiktok.com/@devropix';
      changed = true;
    }

    if (changed) {
      safeLocalStorage.setItem(CMS_STORAGE_PREFIX + 'settings', JSON.stringify(raw));
    }
    return raw;
  }

  public updateSettings(updates: Partial<GlobalSettings>): GlobalSettings {
    const current = this.getSettings();
    const updated: GlobalSettings = {
      general: { ...current.general, ...updates.general },
      social: { ...current.social, ...updates.social },
      socialLinks: { ...current.socialLinks, ...updates.socialLinks },
      seo: { ...current.seo, ...updates.seo },
      contact: { ...current.contact, ...updates.contact },
      footer: { ...current.footer, ...updates.footer },
    };
    this.set('settings', updated);
    this.logActivity('Updated', 'Settings', 'Global Website Settings');
    return updated;
  }

  // --- HOMEPAGE CONTENT ---
  public getHomepage(): HomepageContent {
    const raw = this.get<HomepageContent>('homepage', SEED_HOMEPAGE);
    if (!raw || !Array.isArray(raw.stats) || !Array.isArray(raw.processSteps) || !raw.ctaBanner) {
      safeLocalStorage.setItem(CMS_STORAGE_PREFIX + 'homepage', JSON.stringify(SEED_HOMEPAGE));
      return SEED_HOMEPAGE;
    }
    return raw;
  }

  public updateHomepage(updates: Partial<HomepageContent>): HomepageContent {
    const current = this.getHomepage();
    const updated: HomepageContent = {
      hero: { ...current.hero, ...updates.hero },
      stats: updates.stats !== undefined ? updates.stats : current.stats,
      trustedByEnabled: updates.trustedByEnabled !== undefined ? updates.trustedByEnabled : current.trustedByEnabled,
      processSteps: updates.processSteps !== undefined ? updates.processSteps : current.processSteps,
      ctaBanner: { ...current.ctaBanner, ...updates.ctaBanner },
    };
    this.set('homepage', updated);
    this.logActivity('Updated', 'Homepage', 'Hero & Page Sections');
    return updated;
  }

  // --- BACKUP & RESET ---
  public resetToDefaults(): void {
    this.set('services', SEED_SERVICES);
    this.set('projects', SEED_PROJECTS);
    this.set('project_categories', SEED_PROJECT_CATEGORIES);
    this.set('blog_posts', SEED_BLOG_POSTS);
    this.set('blog_categories', SEED_BLOG_CATEGORIES);
    this.set('testimonials', SEED_TESTIMONIALS);
    this.set('clients', SEED_CLIENTS);
    this.set('messages', SEED_MESSAGES);
    this.set('media', SEED_MEDIA);
    this.set('settings', SEED_SETTINGS);
    this.set('homepage', SEED_HOMEPAGE);
    this.set('activity_logs', SEED_ACTIVITY_LOGS);
    this.logActivity('Reset Database', 'System', 'Restored Default Seeds');
  }

  public exportData(): string {
    const data = {
      services: this.getServices(),
      projects: this.getProjects(),
      project_categories: this.getProjectCategories(),
      blog_posts: this.getBlogPosts(),
      blog_categories: this.getBlogCategories(),
      testimonials: this.getTestimonials(),
      clients: this.getClients(),
      messages: this.getMessages(),
      media: this.getMedia(),
      jobs: this.getJobs(),
      job_applications: this.getJobApplications(),
      settings: this.getSettings(),
      homepage: this.getHomepage(),
      activity_logs: this.getActivityLogs(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }

  public exportAllData(): string {
    return this.exportData();
  }

  public importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.services) this.set('services', data.services);
      if (data.projects) this.set('projects', data.projects);
      if (data.project_categories) this.set('project_categories', data.project_categories);
      if (data.blog_posts) this.set('blog_posts', data.blog_posts);
      if (data.blog_categories) this.set('blog_categories', data.blog_categories);
      if (data.testimonials) this.set('testimonials', data.testimonials);
      if (data.clients) this.set('clients', data.clients);
      if (data.messages) this.set('messages', data.messages);
      if (data.media) this.set('media', data.media);
      if (data.jobs) this.set('jobs', data.jobs);
      if (data.job_applications) this.set('job_applications', data.job_applications);
      if (data.settings) this.set('settings', data.settings);
      if (data.homepage) this.set('homepage', data.homepage);
      this.logActivity('Imported Database', 'System', 'Loaded from JSON Backup');
      return true;
    } catch {
      return false;
    }
  }

  public importAllData(jsonString: string): boolean {
    return this.importData(jsonString);
  }
}

export const cmsStore = new CmsStoreService();
