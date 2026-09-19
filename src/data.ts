import { BlogPost, ProjectItem, ServiceItem, TestimonialItem } from './types';

export const servicesData: ServiceItem[] = [
  {
    id: 'web-development',
    titleKey: 'webDev',
    shortDescKey: 'webDev',
    fullDescKey: 'webDev',
    iconName: 'Globe',
    deliverables: [
      'Responsive Web Applications (SPA & SSR)',
      'Enterprise Admin Portals & Dashboards',
      'High-Conversion Marketing & Product Websites',
      'API Integrations & Payment Gateways',
      'Performance Optimization & Core Web Vitals',
    ],
    deliverables_en: [
      'Responsive Web Applications (SPA & SSR)',
      'Enterprise Admin Portals & Dashboards',
      'High-Conversion Marketing & Product Websites',
      'API Integrations & Payment Gateways',
      'Performance Optimization & Core Web Vitals',
    ],
    deliverables_ar: [
      'تطبيقات ويب متجاوبة فائقة السرعة (SPA & SSR)',
      'بوابات إدارية ولوحات تحكم مؤسسية ذكية',
      'مواقع تسويقية ومنصات رقمية عالية التحويل',
      'ربط واجهات API وبوابات الدفع الإلكتروني',
      'تحسين معايير الأداء ومؤشرات Core Web Vitals',
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    metrics: '99+ Lighthouse Score Standard',
    metrics_en: '99+ Lighthouse Score Standard',
    metrics_ar: 'معيار درجات +99 على أداة Lighthouse العالمية',
  },
  {
    id: 'mobile-development',
    titleKey: 'mobileApp',
    shortDescKey: 'mobileApp',
    fullDescKey: 'mobileApp',
    iconName: 'Smartphone',
    deliverables: [
      'iOS & Android Cross-Platform Apps',
      'Offline-First Local Sync Architecture',
      'Biometric Authentication & Security',
      'Push Notifications & Engagement Pipelines',
      'App Store & Google Play Deployment',
    ],
    deliverables_en: [
      'iOS & Android Cross-Platform Apps',
      'Offline-First Local Sync Architecture',
      'Biometric Authentication & Security',
      'Push Notifications & Engagement Pipelines',
      'App Store & Google Play Deployment',
    ],
    deliverables_ar: [
      'تطبيقات متعددة المنصات لنظامي iOS و Android',
      'معمارية مزامنة محلية بدون إنترنت (Offline-First)',
      'المصادقة البيومترية وحماية البيانات المصرفية',
      'إشعارات لحظية مخصصة لزيادة تفاعل المستخدمين',
      'النشر وإدارة الحسابات على App Store و Google Play',
    ],
    techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'REST/GraphQL'],
    metrics: '60 FPS Native Responsiveness',
    metrics_en: '60 FPS Native Responsiveness',
    metrics_ar: 'استجابة حركية فائقة السلاسة بمعدل 60 إطار/ثانية',
  },
  {
    id: 'ui-ux-design',
    titleKey: 'uiux',
    shortDescKey: 'uiux',
    fullDescKey: 'uiux',
    iconName: 'Layers',
    deliverables: [
      'User Research & Mental Model Mapping',
      'Interactive Figma Prototypes & Wireframes',
      'Design Token Systems & Component Libraries',
      'Usability Testing & Accessibility Audits',
      'Developer Handoff Documentation',
    ],
    deliverables_en: [
      'User Research & Mental Model Mapping',
      'Interactive Figma Prototypes & Wireframes',
      'Design Token Systems & Component Libraries',
      'Usability Testing & Accessibility Audits',
      'Developer Handoff Documentation',
    ],
    deliverables_ar: [
      'أبحاث المستخدمين ورسم المخططات الذهنية وسير العمل',
      'نماذج فيجما تفاعلية ومخططات هيكلية عالية الدقة',
      'أنظمة معطيات التصميم ومكتبات المكونات الموحدة',
      'اختبارات قابلية الاستخدام وتدقيق الوصول الرقمي (WCAG)',
      'وثائق تسليم دقيقة ومفصلة للمطورين والمهندسين',
    ],
    techStack: ['Figma', 'Tokens Studio', 'Design Systems', 'WCAG 2.1 AA'],
    metrics: 'Zero-Ambiguity Component Specs',
    metrics_en: 'Zero-Ambiguity Component Specs',
    metrics_ar: 'مواصفات تصميم خالية من أي غموض للمطورين',
  },
  {
    id: 'custom-software',
    titleKey: 'customSoftware',
    shortDescKey: 'customSoftware',
    fullDescKey: 'customSoftware',
    iconName: 'Cpu',
    deliverables: [
      'Custom ERP, CRM & Logistics Platforms',
      'Automated Document & Invoice Pipelines',
      'Microservices & Event-Driven Architecture',
      'Role-Based Access Control (RBAC)',
      'Legacy System Refactoring & Modernization',
    ],
    deliverables_en: [
      'Custom ERP, CRM & Logistics Platforms',
      'Automated Document & Invoice Pipelines',
      'Microservices & Event-Driven Architecture',
      'Role-Based Access Control (RBAC)',
      'Legacy System Refactoring & Modernization',
    ],
    deliverables_ar: [
      'منصات ERP و CRM ولوجستية مخصصة للعمليات',
      'خطوط أتمتة المستندات والفواتير والفوترة الإلكترونية',
      'معمارية خدمات مصغرة مبنية على الأحداث السريعة',
      'نظام أمان وصلاحيات متعدد المستويات والأدوار (RBAC)',
      'تحديث وإعادة هيكلة الأنظمة القديمة ونقل البيانات بأمان',
    ],
    techStack: ['Node.js', 'Laravel', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    metrics: 'Tailored Business Logic Flow',
    metrics_en: 'Tailored Business Logic Flow',
    metrics_ar: 'تدفقات برمجية مصممة خصيصاً لدورات عملك',
  },
  {
    id: 'digital-product',
    titleKey: 'digitalProduct',
    shortDescKey: 'digitalProduct',
    fullDescKey: 'digitalProduct',
    iconName: 'Rocket',
    deliverables: [
      'Rapid MVP Definition & Roadmapping',
      'Architecture Spikes & Feasibility Proofs',
      'Continuous CI/CD Delivery Pipeline',
      'Product Analytics & Behavioral Telemetry',
      'Iterative Feature Expansion',
    ],
    deliverables_en: [
      'Rapid MVP Definition & Roadmapping',
      'Architecture Spikes & Feasibility Proofs',
      'Continuous CI/CD Delivery Pipeline',
      'Product Analytics & Behavioral Telemetry',
      'Iterative Feature Expansion',
    ],
    deliverables_ar: [
      'تحديد نطاق وبناء خارطة طريق المنتج الأولي السريع (MVP)',
      'تجارب معمارية وبراهين جدوى تقنية موثوقة',
      'خط أنابيب تسليم وتطوير مؤتمت ومستمر (CI/CD)',
      'تحليلات سلوك المستخدمين وأنظمة القياس اللحظية',
      'تطوير وتوسيع ميزات المنتج بمرونة وتكرار مدروس',
    ],
    techStack: ['TypeScript', 'Cloud Native', 'Tailwind', 'Stripe', 'Docker'],
    metrics: '4-8 Week Target MVP Delivery',
    metrics_en: '4-8 Week Target MVP Delivery',
    metrics_ar: 'إطلاق نموذج MVP مكتمل خلال 4 إلى 8 أسابيع',
  },
  {
    id: 'maintenance-support',
    titleKey: 'maintenance',
    shortDescKey: 'maintenance',
    fullDescKey: 'maintenance',
    iconName: 'ShieldCheck',
    deliverables: [
      '24/7 Server Health & Telemetry Monitoring',
      'Quarterly Dependency & Security Patching',
      'Database Backup & Recovery Drills',
      'Performance Auditing & Load Testing',
      'Guaranteed Response Time SLA',
    ],
    deliverables_en: [
      '24/7 Server Health & Telemetry Monitoring',
      'Quarterly Dependency & Security Patching',
      'Database Backup & Recovery Drills',
      'Performance Auditing & Load Testing',
      'Guaranteed Response Time SLA',
    ],
    deliverables_ar: [
      'مراقبة لحظية لصحة الخوادم والأنظمة على مدار الساعة',
      'تحديثات دورية للمكتبات البرمجية وترقيع الثغرات الأمنية',
      'نسخ احتياطي مجدول وتجارب استعادة واختبار قواعد البيانات',
      'تدقيق الأداء واختبارات تحمل الأحمال العالية والضغط',
      'اتفاقيات مستوى خدمة (SLA) مع ضمان سرعة الاستجابة',
    ],
    techStack: ['Docker', 'Prometheus', 'Grafana', 'CloudWatch', 'Sentry'],
    metrics: '99.98% System Uptime SLA',
    metrics_en: '99.98% System Uptime SLA',
    metrics_ar: 'ضمان تشغيل بنسبة موثوقية 99.98% وفق اتفاقية SLA',
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: 'orbit-saas',
    name: 'Orbit Logistics Cloud',
    name_en: 'Orbit Logistics Cloud',
    name_ar: 'سحابة أوربت للخدمات اللوجستية',
    category: 'Custom Software & Web',
    category_en: 'Custom Software & Web',
    category_ar: 'برمجيات مخصصة وتطبيقات ويب',
    categoryKey: 'customSoftware',
    clientType: 'Supply Chain Enterprise',
    clientType_en: 'Supply Chain Enterprise',
    clientType_ar: 'مؤسسة سلاسل الإمداد والشحن',
    summary:
      'A real-time fleet orchestration and consignment tracking platform consolidating distributed warehouse workflows across 14 hubs.',
    summary_en:
      'A real-time fleet orchestration and consignment tracking platform consolidating distributed warehouse workflows across 14 hubs.',
    summary_ar:
      'منصة مركزية لحظية لإدارة وتوجيه أساطيل النقل وتتبع الشحنات تجمع عمليات المستودعات الموزعة عبر 14 مركزاً إقليمياً.',
    challenge:
      'The client suffered from fragmented legacy spreadsheets, manual dispatch errors, and delayed freight tracking updates that frustrated commercial accounts.',
    challenge_en:
      'The client suffered from fragmented legacy spreadsheets, manual dispatch errors, and delayed freight tracking updates that frustrated commercial accounts.',
    challenge_ar:
      'كان العميل يعاني من جداول بيانات قديمة ومبعثرة، وأخطاء بشرية في توجيه السائقين، وتأخر في تحديثات تتبع الشحنات مما أثار استياء كبار العملاء التجاريين.',
    solution:
      'DevRopix designed and engineered an event-driven web portal with live geo-tracking, automated driver dispatching, and unified REST APIs connecting ERP databases.',
    solution_en:
      'DevRopix designed and engineered an event-driven web portal with live geo-tracking, automated driver dispatching, and unified REST APIs connecting ERP databases.',
    solution_ar:
      'صممت وطورت ديف روبيكس بوابة ويب حديثة تعتمد على بنية الأحداث الآنية، مع تتبع جغرافي حي على الخرائط، وأتمتة توجيه السائقين، وربط واجهات REST API مع قواعد بيانات ERP.',
    results: [
      'Reduced dispatch latency from 45 minutes to under 90 seconds',
      '100% cloud telemetry with sub-second driver location updates',
      'Zero downtime migration for over 250,000 historic freight manifests',
    ],
    results_en: [
      'Reduced dispatch latency from 45 minutes to under 90 seconds',
      '100% cloud telemetry with sub-second driver location updates',
      'Zero downtime migration for over 250,000 historic freight manifests',
    ],
    results_ar: [
      'تقليص زمن توجيه الشحنات من 45 دقيقة إلى أقل من 90 ثانية فقط',
      'تتبع سحابي فوري 100% مع تحديث موقع السائق خلال أجزاء من الثانية',
      'ترحيل أكثر من 250,000 بوليصة شحن تاريخية دون أي توقف في الخدمة',
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    deliverables: ['Web Portal', 'Driver Dispatch Mobile API', 'Automated Invoicing Engine', 'Design System'],
    deliverables_en: ['Web Portal', 'Driver Dispatch Mobile API', 'Automated Invoicing Engine', 'Design System'],
    deliverables_ar: ['بوابة الويب اللوجستية', 'واجهة API لتطبيق السائقين', 'محرك الفوترة الآلية', 'نظام تصميم شامل'],
    featured: true,
    accentColor: '#6366F1',
  },
  {
    id: 'apex-fintech',
    name: 'Apex Wealth Mobile',
    name_en: 'Apex Wealth Mobile',
    name_ar: 'تطبيق أبيكس لإدارة الثروات',
    category: 'Mobile App',
    category_en: 'Mobile App',
    category_ar: 'تطبيق جوال',
    categoryKey: 'mobileApp',
    clientType: 'Private Wealth Management',
    clientType_en: 'Private Wealth Management',
    clientType_ar: 'إدارة الثروات الخاصة والاستثمار',
    summary:
      'A biometric-secured investment portfolio mobile application for high-net-worth clients with instant multi-currency settlement.',
    summary_en:
      'A biometric-secured investment portfolio mobile application for high-net-worth clients with instant multi-currency settlement.',
    summary_ar:
      'تطبيق جوال آمن ومحمي بالمصادقة البيومترية لإدارة المحافظ الاستثمارية للعملاء المتميزين مع تسوية فورية متعددة العملات.',
    challenge:
      'Existing mobile banking client had high drop-off rates due to convoluted multi-step wire verification and unresponsive chart rendering.',
    challenge_en:
      'Existing mobile banking client had high drop-off rates due to convoluted multi-step wire verification and unresponsive chart rendering.',
    challenge_ar:
      'كان العميل يعاني من معدلات خروج عالية للمستخدمين بسبب التعقيد في التحقق من التحويلات المالية على مراحل متعددة، وبطء استجابة الرسوم البيانية الاستثمارية.',
    solution:
      'Built a native-feel Flutter mobile application featuring hardware-backed biometrics, real-time market charts, and automated PDF tax reports.',
    solution_en:
      'Built a native-feel Flutter mobile application featuring hardware-backed biometrics, real-time market charts, and automated PDF tax reports.',
    solution_ar:
      'طورنا تطبيقاً فائق السلاسة بتقنية Flutter يوفر مصادقة بيومترية مدعومة بالأجهزة الذكية، ورسوماً بيانية لحظية لأسواق المال، وتقارير ضريبية بصيغة PDF قابلة للتصدير الفوري.',
    results: [
      'Achieved 4.9 App Store rating across 12,000 active users',
      'Rendered real-time portfolio charts at stable 60 FPS',
      'Bank-grade encrypted token exchanges compliant with financial regulations',
    ],
    results_en: [
      'Achieved 4.9 App Store rating across 12,000 active users',
      'Rendered real-time portfolio charts at stable 60 FPS',
      'Bank-grade encrypted token exchanges compliant with financial regulations',
    ],
    results_ar: [
      'تحقيق تقييم 4.9 في متجر التطبيقات بين أكثر من 12,000 مستخدم نشط',
      'عرض رسوم بيانية تفاعلية للمحافظ الاستثمارية بمعدل ثابت 60 إطار/ثانية',
      'تبادل رموز مشفرة بمستوى الأمان المصرفي ومتوافقة مع الأنظمة المالية',
    ],
    techStack: ['Flutter', 'Dart', 'Node.js', 'OAuth 2.0', 'WebSockets'],
    deliverables: ['iOS App', 'Android App', 'Security Whitepaper', 'Biometric Auth Module'],
    deliverables_en: ['iOS App', 'Android App', 'Security Whitepaper', 'Biometric Auth Module'],
    deliverables_ar: ['تطبيق لنظام iOS', 'تطبيق لنظام Android', 'وثيقة الأمان والامتثال', 'وحدة المصادقة البيومترية'],
    featured: false,
    accentColor: '#7C3AED',
  },
  {
    id: 'lumina-health',
    name: 'Lumina Care Portal',
    name_en: 'Lumina Care Portal',
    name_ar: 'بوابة لومينا للرعاية الصحية',
    category: 'Web Application',
    category_en: 'Web Application',
    category_ar: 'تطبيق ويب',
    categoryKey: 'webDev',
    clientType: 'Specialized Medical Clinics',
    clientType_en: 'Specialized Medical Clinics',
    clientType_ar: 'مجمعات العيادات الطبية التخصصية',
    summary:
      'HIPAA-compliant telemedicine and patient booking web platform connecting doctors with patients seamlessly.',
    summary_en:
      'HIPAA-compliant telemedicine and patient booking web platform connecting doctors with patients seamlessly.',
    summary_ar:
      'منصة ويب طبية متوافقة مع معايير HIPAA لحجز المواعيد والاستشارات الطبية المرئية تربط الأطباء بالمرضى بكل سلاسة.',
    challenge:
      'Clinics were overwhelmed by phone appointments and missed visits, while doctors struggled with fragmented medical record lookups.',
    challenge_en:
      'Clinics were overwhelmed by phone appointments and missed visits, while doctors struggled with fragmented medical record lookups.',
    challenge_ar:
      'كانت العيادات تعاني من ضغط حجوزات الاتصال الهاتفي وتخلف المرضى عن الحضور، بينما واجه الأطباء صعوبة في الوصول للملفات الطبية المبعثرة.',
    solution:
      'DevRopix developed a progressive web app with encrypted video consultations, smart doctor calendars, and automated SMS appointment reminders.',
    solution_en:
      'DevRopix developed a progressive web app with encrypted video consultations, smart doctor calendars, and automated SMS appointment reminders.',
    solution_ar:
      'طورت ديف روبيكس تطبيق ويب متقدم (PWA) مع مكالمات استشارة فيديو مشفرة، وتقاويم مواعيد ذكية للأطباء، وتذكير تلقائي عبر الرسائل النصية القصيرة SMS.',
    results: [
      'Lowered missed appointments by 42% in first quarter',
      'Secure end-to-end encrypted medical consults with zero plug-ins',
      'Integrated payment gateway handling domestic & international cards',
    ],
    results_en: [
      'Lowered missed appointments by 42% in first quarter',
      'Secure end-to-end encrypted medical consults with zero plug-ins',
      'Integrated payment gateway handling domestic & international cards',
    ],
    results_ar: [
      'خفض نسبة التخلف عن المواعيد بنسبة 42% في الربع الأول من الإطلاق',
      'استشارات طبية مشفرة تماماً بين الطرفين بدون الحاجة لتثبيت أي برامج إضافية',
      'بوابة دفع متكاملة تدعم البطاقات المحلية (مدى) والبطاقات الائتمانية الدولية',
    ],
    techStack: ['Next.js', 'TypeScript', 'WebRTC', 'Tailwind CSS', 'PostgreSQL'],
    deliverables: ['Patient Booking PWA', 'Doctor Workspace', 'Video Consultation Engine'],
    deliverables_en: ['Patient Booking PWA', 'Doctor Workspace', 'Video Consultation Engine'],
    deliverables_ar: ['تطبيق حجز المرضى PWA', 'مساحة عمل الأطباء', 'محرك الاستشارات المرئية'],
    featured: false,
    accentColor: '#6366F1',
  },
  {
    id: 'kroma-design',
    name: 'Kroma Digital Experience',
    name_en: 'Kroma Digital Experience',
    name_ar: 'تجربة كروما الرقمية للتجارة',
    category: 'UI/UX Design',
    category_en: 'UI/UX Design',
    category_ar: 'تصميم تجربة وواجهات المستخدم',
    categoryKey: 'uiux',
    clientType: 'E-Commerce Marketplace',
    clientType_en: 'E-Commerce Marketplace',
    clientType_ar: 'سوق ومنصة تجارة إلكترونية راقية',
    summary:
      'Complete brand identity, design token library, and frictionless checkout flow redesign for a premium retail ecosystem.',
    summary_en:
      'Complete brand identity, design token library, and frictionless checkout flow redesign for a premium retail ecosystem.',
    summary_ar:
      'هوية علامة تجارية متكاملة ومكتبة معطيات تصميم موحدة وإعادة هندسة مسار الشراء والدفع السريع لمنظومة تجزئة متميزة.',
    challenge:
      'Cart abandonment was hovering at 71% due to visual clutter, confusing nested navigation, and poor mobile touch targets.',
    challenge_en:
      'Cart abandonment was hovering at 71% due to visual clutter, confusing nested navigation, and poor mobile touch targets.',
    challenge_ar:
      'كانت نسبة التخلي عن سلة المشتريات تصل إلى 71% بسبب التشتت البصري، وقوائم التنقل المعقدة، وضعف مساحات اللمس على الهواتف الذكية.',
    solution:
      'Conducted iterative user testing sessions, overhauled the typography hierarchy, and engineered a single-screen checkout with instant address validation.',
    solution_en:
      'Conducted iterative user testing sessions, overhauled the typography hierarchy, and engineered a single-screen checkout with instant address validation.',
    solution_ar:
      'أجرينا جلسات اختبار مستخدمين تكرارية، وأعدنا هيكلة التدرج الطباعي، وصممنا صفحة دفع في شاشة واحدة مع التحقق التلقائي الفوري من العناوين الوطنية.',
    results: [
      'Increased mobile conversion rate by 28%',
      'Complete reusable Figma design system with 200+ accessible components',
      'Streamlined checkout time from 3.2 minutes to 48 seconds',
    ],
    results_en: [
      'Increased mobile conversion rate by 28%',
      'Complete reusable Figma design system with 200+ accessible components',
      'Streamlined checkout time from 3.2 minutes to 48 seconds',
    ],
    results_ar: [
      'زيادة معدل إتمام الشراء عبر الهواتف الذكية بنسبة 28%',
      'نظام تصميم فيجما متكامل وقابل لإعادة الاستخدام يضم أكثر من 200 مكون معتمد',
      'تسريع زمن إتمام عملية الدفع من 3.2 دقيقة إلى 48 ثانية فقط',
    ],
    techStack: ['Figma', 'Design Tokens', 'Prototyping', 'Accessibility (WCAG)'],
    deliverables: ['Atomic Design System', 'High-Fidelity Prototypes', 'Interactive Micro-animations'],
    deliverables_en: ['Atomic Design System', 'High-Fidelity Prototypes', 'Interactive Micro-animations'],
    deliverables_ar: ['نظام التصميم الذري الموحد', 'نماذج تفاعلية عالية الدقة', 'حركات وتفاعلات مجهرية سلسة'],
    featured: false,
    accentColor: '#7C3AED',
  },
  {
    id: 'vortex-iot',
    name: 'Vortex Industrial Telemetry',
    name_en: 'Vortex Industrial Telemetry',
    name_ar: 'نظام فورتكس للمقاييس الصناعية (IoT)',
    category: 'Custom Software',
    category_en: 'Custom Software',
    category_ar: 'برمجيات صناعية مخصصة',
    categoryKey: 'customSoftware',
    clientType: 'Clean Energy & Manufacturing',
    clientType_en: 'Clean Energy & Manufacturing',
    clientType_ar: 'الطاقة النظيفة والتصنيع المتقدم',
    summary:
      'Industrial IoT management platform processing thousands of sensor metrics per second with predictive maintenance alerts.',
    summary_en:
      'Industrial IoT management platform processing thousands of sensor metrics per second with predictive maintenance alerts.',
    summary_ar:
      'منصة متقدمة لإدارة إنترنت الأشياء الصناعي تعالج آلاف قراءات الحساسات في الثانية مع تنبيهات الصيانة التنبؤية الاستباقية.',
    challenge:
      'Equipment breakdowns caused costly manufacturing pauses because manual inspection rounds occurred only once weekly.',
    challenge_en:
      'Equipment breakdowns caused costly manufacturing pauses because manual inspection rounds occurred only once weekly.',
    challenge_ar:
      'تسببت الأعطال المفاجئة للآلات في توقفات تصنيع باهظة التكلفة، حيث كانت جولات الفحص اليدوي تتم مرة واحدة فقط أسبوعياً.',
    solution:
      'Created an ultra-fast streaming dashboard that ingests MQTT sensor payloads, visualizes temperature variance, and alerts technicians before failures occur.',
    solution_en:
      'Created an ultra-fast streaming dashboard that ingests MQTT sensor payloads, visualizes temperature variance, and alerts technicians before failures occur.',
    solution_ar:
      'طورنا لوحة تحكم تدفق لحظية فائقة السرعة تستقبل بيانات بروتوكول MQTT، وتعرض تباين درجات الحرارة والاهتزاز، وتنبه الفنيين فوراً قبل حدوث الأعطال.',
    results: [
      'Eliminated unplanned machine downtime by 65%',
      'Processed over 15 million daily data points with under 50ms ingestion latency',
      'Role-based operator controls for field technicians and plant executives',
    ],
    results_en: [
      'Eliminated unplanned machine downtime by 65%',
      'Processed over 15 million daily data points with under 50ms ingestion latency',
      'Role-based operator controls for field technicians and plant executives',
    ],
    results_ar: [
      'خفض فترات التوقف غير المخطط لها للمصانع بنسبة 65%',
      'معالجة أكثر من 15 مليون نقطة بيانات يومياً بزمن استجابة يقل عن 50ms',
      'لوحات تحكم متعددة الصلاحيات تناسب الفنيين الميدانيين وإدارة المصنع',
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'TimescaleDB', 'MQTT', 'Docker'],
    deliverables: ['Telemetry Web Dashboard', 'Alert Notification Gateway', 'REST API'],
    deliverables_en: ['Telemetry Web Dashboard', 'Alert Notification Gateway', 'REST API'],
    deliverables_ar: ['لوحة تحكم الويب للمقاييس', 'بوابة التنبيهات الفورية', 'واجهات REST API المؤسسية'],
    featured: false,
    accentColor: '#6366F1',
  },
  {
    id: 'zenith-mvp',
    name: 'Zenith Workspace',
    name_en: 'Zenith Workspace',
    name_ar: 'مساحة عمل زينيث للفرق الرقمية',
    category: 'Digital Product',
    category_en: 'Digital Product',
    category_ar: 'تطوير منتج رقمي',
    categoryKey: 'digitalProduct',
    clientType: 'Productivity Startup',
    clientType_en: 'Productivity Startup',
    clientType_ar: 'شركة ناشئة في مجال الإنتاجية الرقمية',
    summary:
      'Collaborative async team workspace combining document collaboration, task kanban boards, and structured team standups.',
    summary_en:
      'Collaborative async team workspace combining document collaboration, task kanban boards, and structured team standups.',
    summary_ar:
      'مساحة عمل تعاونية غير متزامنة لفرق العمل تجمع بين تحرير المستندات التشاركي، لوحات كانبان للمهام، والاجتماعات اليومية المنظمة.',
    challenge:
      'Early-stage startup needed to validate product market fit with real customers on a strict 6-week timeline before seed fundraising.',
    challenge_en:
      'Early-stage startup needed to validate product market fit with real customers on a strict 6-week timeline before seed fundraising.',
    challenge_ar:
      'احتاجت الشركة الناشئة إلى التحقق السريع من ملاءمة المنتج للسوق مع عملاء حقيقيين في جدول زمني صارم مدته 6 أسابيع فقط قبل جولة الاستثمار الأولي.',
    solution:
      'DevRopix scoped a tight, high-impact MVP, rapidly designed the visual identity, and built a lightning-fast real-time web application.',
    solution_en:
      'DevRopix scoped a tight, high-impact MVP, rapidly designed the visual identity, and built a lightning-fast real-time web application.',
    solution_ar:
      'حددت ديف روبيكس نطاقاً محكماً لمنتج أولي (MVP) عالي التأثير، وصممت الهوية البصرية بسرعة، وبنت تطبيق ويب فوري فائق السرعة والأداء.',
    results: [
      'Successfully launched public beta in 5 weeks',
      'Acquired initial 3,500 registered team workspaces in month one',
      'Assisted founders in securing $1.2M initial pre-seed funding',
    ],
    results_en: [
      'Successfully launched public beta in 5 weeks',
      'Acquired initial 3,500 registered team workspaces in month one',
      'Assisted founders in securing $1.2M initial pre-seed funding',
    ],
    results_ar: [
      'إطلاق ناجح للنسخة التجريبية العامة في غضون 5 أسابيع فقط',
      'تسجيل أكثر من 3,500 مساحة عمل لفريق في الشهر الأول للإطلاق',
      'مساعدة المؤسسين في إغلاق جولة تمويل ما قبل الأولي بقيمة 1.2 مليون دولار',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    deliverables: ['Full-Stack MVP', 'Marketing Landing Page', 'Stripe Billing Integration'],
    deliverables_en: ['Full-Stack MVP', 'Marketing Landing Page', 'Stripe Billing Integration'],
    deliverables_ar: ['تطبيق MVP متكامل الواجهات والخلفية', 'صفحة هبوط تسويقية جذابة', 'بوابة الدفع والاشتراكات عبر Stripe'],
    featured: false,
    accentColor: '#7C3AED',
  },
];

export const technologiesData = [
  {
    name: 'React',
    category: 'Frontend',
    desc_en: 'Component architecture for scalable web apps',
    desc_ar: 'بنية مكونات برمجية لتطبيقات ويب قابلة للتوسع الكبير',
  },
  {
    name: 'TypeScript',
    category: 'Language',
    desc_en: 'Type-safe, maintainable enterprise codebases',
    desc_ar: 'قواعد أكواد برمجية آمنة الأنواع وقابلة للصيانة للمؤسسات',
  },
  {
    name: 'Next.js',
    category: 'Fullstack',
    desc_en: 'Server-side rendering, SEO, and fast routing',
    desc_ar: 'تصدير برمي من جهة الخادم، تهيئة محركات البحث والتوجيه السريع',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    desc_en: 'High-concurrency microservices and REST APIs',
    desc_ar: 'خدمات مصغرة ذات توازي عالي السرعة وواجهات برمجية REST APIs',
  },
  {
    name: 'Flutter',
    category: 'Mobile',
    desc_en: 'Multi-platform native iOS & Android applications',
    desc_ar: 'تطبيقات أصلية متعددة المنصات لنظامي iOS و Android',
  },
  {
    name: 'Laravel',
    category: 'Backend',
    desc_en: 'Robust, elegant PHP backend solutions',
    desc_ar: 'حلول خلفية برمجية متينة وأنيقة بلغة PHP',
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    desc_en: 'ACID-compliant relational data modeling',
    desc_ar: 'نمذجة بيانات علائقية متوافقة مع معايير ACID الآمنة',
  },
  {
    name: 'MySQL',
    category: 'Database',
    desc_en: 'Reliable, battle-tested structured storage',
    desc_ar: 'تخزين بيانات مهيكل وموثوق ومجرّب بكفاءة في الإنتاج',
  },
  {
    name: 'Docker',
    category: 'DevOps',
    desc_en: 'Containerized reproducible deployments',
    desc_ar: 'بيئات تشغيل برمجية معزولة قابلة لإعادة الإنتاج ومؤتمتة',
  },
  {
    name: 'Figma',
    category: 'Design',
    desc_en: 'Collaborative UI/UX design systems and tokens',
    desc_ar: 'أنظمة تصميم ومصطلحات مرئية تعاونية لواجهات وتجربة المستخدم',
  },
  {
    name: 'Git',
    category: 'Workflow',
    desc_en: 'Version control with strict peer-review CI/CD',
    desc_ar: 'إدارة الإصدارات ومراجعة الأكواد مع تدفقات CI/CD مؤتمتة',
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling',
    desc_en: 'Utility-first modern design token engine',
    desc_ar: 'محرك تنسيق عصري يعتمد على فئات المرافق المباشرة',
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't1',
    quote_en: 'DevRopix did not just build our platform; they challenged our assumptions and prevented months of unnecessary development. Our system handles peak traffic effortlessly.',
    quote_ar: 'لم تكتفِ ديف روبيكس ببناء منصتنا البرمجية فحسب، بل تحدوا افتراضاتنا التقنية ووفروا علينا أشهراً من التطوير غير المجدي. نظامنا الآن يتعامل مع ذروة الحركة اللوجستية بكل سلاسة وبدون أدنى جهد.',
    author: 'Tariq Al-Mansoor',
    role_en: 'Co-Founder & CTO',
    role_ar: 'المؤسس الشريك والمدير التقني',
    company: 'Orbit Logistics',
    industry_en: 'Supply Chain Technology',
    industry_ar: 'تكنولوجيا سلاسل الإمداد والخدمات اللوجستية',
  },
  {
    id: 't2',
    quote_en: 'Finding a software partner that excels in both engineering rigor and design polish is rare. DevRopix delivered our mobile app on time, and our user satisfaction ratings reflect that quality.',
    quote_ar: 'من النادر جداً العثور على شريك برمجيات يجمع بين دقة الهندسة وجودة التصميم واللمسات النهائية. ديف روبيكس سلمت تطبيق الهاتف الخاص بنا في الموعد المحدد، وتقييمات رضا المستخدمين تعكس هذه الجودة الرفيعة.',
    author: 'Sarah Jenkins',
    role_en: 'VP of Digital Product',
    role_ar: 'نائب رئيس المنتجات الرقمية',
    company: 'Apex Wealth Partners',
    industry_en: 'Financial Services',
    industry_ar: 'الخدمات المالية والاستثمارية',
  },
  {
    id: 't3',
    quote_en: 'The communication was transparent from sprint zero. We received working builds every week and always understood where every hour of engineering effort was focused.',
    quote_ar: 'التواصل معهم كان يتسم بالشفافية المطلقة منذ اليوم الأول. كنا نتلقى نسخاً برمجية جاهزة للعمل كل أسبوع، ونفهم دائماً أين يتركز كل جهد هندسي مستثمر.',
    author: 'Khalid Al-Ghamdi',
    role_en: 'Operations Director',
    role_ar: 'مدير العمليات التشغيلية',
    company: 'Lumina Health Clinics',
    industry_en: 'Health Systems',
    industry_ar: 'الأنظمة والخدمات الطبية والرعاية الصحية',
  },
];

export const blogPostsData: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'architecting-scalable-web-applications',
    title_en: 'Architecting Scalable Web Applications: Avoiding Common Early-Stage Bottlenecks',
    title_ar: 'معمارية تطبيقات الويب القابلة للتوسع: تجنب اختناقات الأداء الشائعة في المراحل المبكرة',
    category: 'Technology',
    date: 'Sep 12, 2026',
    readTime_en: '6 min read',
    readTime_ar: 'قراءة 6 دقائق',
    excerpt_en: 'How modern software engineering teams balance rapid feature delivery with durable component architectures, caching strategies, and database indexing.',
    excerpt_ar: 'كيف توازن فرق هندسة البرمجيات الحديثة بين سرعة تسليم الميزات وبناء معماريات متينة للمكونات، واستراتيجيات التخزين المؤقت، وفهرسة قواعد البيانات.',
    author: {
      name: 'DevRopix Architecture Group',
      role_en: 'Engineering Lead',
      role_ar: 'القيادة الهندسية لمعمارية النظم',
    },
    tags: ['Architecture', 'Web Development', 'Scalability', 'Databases'],
    content_en: [
      'In early-stage software development, the temptation to move fast often leads teams to bypass foundational architectural safeguards. While building rapidly is critical to establishing product viability, technical shortcuts taken in database schema design and state management quickly compound into expensive bottlenecks as active user concurrency climbs.',
      'A common pitfall is the failure to separate read-heavy operations from transactional state mutations. By establishing clean repository patterns and introducing strategic caching layers (such as Redis) early in the project lifecycle, teams can preserve database query response times even under sudden 10x traffic spikes.',
      'At DevRopix, our development doctrine enforces strict TypeScript typing across the entire stack, automated linting pipelines, and component modularity. This guarantees that as new features are added in later sprints, existing workflows remain stable, predictable, and maintainable.',
      'When planning your next digital product, invest in decoupling your frontend UI from backend business rules through well-documented API contracts. Your future engineering team—and your users—will thank you.',
    ],
    content_ar: [
      'في المراحل المبكرة من تطوير البرمجيات، غالباً ما يدفع إغراء التحرك السريع الفرق إلى تخطي الضوابط الهيكلية الأساسية. وبينما يعد البناء السريع أمراً حيوياً للتحقق من جدوى المنتج، فإن الاختصارات التقنية في تصميم قواعد البيانات وإدارة الحالة تتحول سريعاً إلى اختناقات تشغيلية مكلفة بمجرد ارتفاع أعداد المستخدمين المتزامنين.',
      'من الأخطاء الشائعة عدم الفصل بين عمليات القراءة المكثفة وعمليات تعديل البيانات الأساسية. ومن خلال تأسيس أنماط برمجية واضحة وإدخال طبقات تخزين مؤقت استراتيجية (مثل Redis) مبكراً، يمكن للفرق الحفاظ على سرعة الاستجابة حتى في ظل القفزات المفاجئة في زيارات الموقع بمقدار 10 أضعاف.',
      'في ديف روبيكس، تفرض عقيدتنا التطويرية استخدام نظام كتابة TypeScript الصارم عبر كامل مستويات النظام البرمجي، خطوط فحص الأكواد المؤتمتة، والاعتماد المطلق على الوحدات البرمجية المجزأة لضمان الحفاظ على استقرار الخدمات وتوقع سلوك الأكواد.',
      'عند تخطيط منتجك الرقمي القادم، استثمر في فصل واجهتك الأمامية عن قواعد العمل الخاصة بالخلفية عبر عقود واجهات برمجة تطبيقات موثقة بدقة. سيوفر هذا الكثير من الوقت لفريقك الهندسي ومستخدميك في المستقبل.',
    ],
  },
  {
    id: 'post-2',
    slug: 'design-systems-that-scale',
    title_en: 'Design Systems That Actually Ship: Bridging the Designer-to-Developer Gap',
    title_ar: 'أنظمة التصميم القابلة للنشر الفعلي: ردم الفجوة الكبيرة بين المصمم والمطور',
    category: 'UI/UX',
    date: 'Aug 28, 2026',
    readTime_en: '5 min read',
    readTime_ar: 'قراءة 5 دقائق',
    excerpt_en: 'Why generic UI kits fail in production and how to establish a living design token system that engineers love working with.',
    excerpt_ar: 'لماذا تفشل مكتبات الواجهات الجاهزة والمجردة في الإنتاج، وكيف يمكنك بناء نظام موحد ومترابط من المعطيات الرمزية يعشق المهندسون والمطورون العمل به.',
    author: {
      name: 'DevRopix Product Studio',
      role_en: 'Head of Product Design',
      role_ar: 'رئيس قسم تصميم المنتجات الرقمية',
    },
    tags: ['UI/UX', 'Design Systems', 'Figma', 'Frontend'],
    content_en: [
      'Too many design systems end up as pristine Figma libraries that developers find impossible to implement faithfully in production code. The gap between what is designed in visual canvases and what is rendered in DOM components often causes visual drift, redundant CSS, and frustration across teams.',
      'The solution lies in Design Tokens: named entities that store visual attributes (colors, spacing steps, typography scales, elevation shadows) in a platform-agnostic format such as JSON. When both Figma and code consume the identical token source, brand consistency becomes automated.',
      'Furthermore, building component cards with strict border-radius math (where inner corner radius equals outer corner radius minus padding) and enforcing high-contrast typographic ratios eliminates the ambiguity that often leads to AI-generated or template-like aesthetics.',
      'DevRopix treats design systems not as static artwork, but as reusable engineering infrastructure that accelerates every subsequent product release.',
    ],
    content_ar: [
      'تنتهي الكثير من أنظمة التصميم كمجرد مكتبات Figma منسقة يجد المطورون صعوبة بالغة في تطبيقها بدقة وأمان داخل الكود الفعلي للإنتاج. وتتسبب الفجوة بين الأشكال المرسومة والمكونات البرمجية الحية في انحراف مظهر العلامة التجارية وتكرار تنسيقات CSS وإحباط فرق العمل.',
      'يكمن الحل السحري في استخدام المعطيات الرمزية (Design Tokens): وهي معرفات برمجية تخزن الخصائص المرئية مثل الألوان، خطوات التباعد الممنهجة، تدرج الخطوط، وتأثيرات الظلال بتنسيق JSON مرن ومستقل عن لغة الكود. وحينما يستهلك كل من ملف تصميم فيجما ومطور الكود نفس ملف الرموز، تكتمل أتمتة هوية العلامة التجارية بامتياز.',
      'علاوة على ذلك، فإن بناء بطاقات العناصر بالاعتماد على الحسابات الهندسية لزوايا الانحناء يزيل التشوه البصري والارتجالية التي تصيب التصاميم التقليدية.',
      'تتعامل ديف روبيكس مع أنظمة التصميم ليس كلوحات فنية صامتة، وإنما كبنية تحتية هندسية قابلة لإعادة الاستخدام تسهم في تسريع وتيرة إطلاق أي منتج رقمي لاحق بشكل ملحوظ.',
    ],
  },
  {
    id: 'post-3',
    slug: 'choosing-the-right-technology-partner',
    title_en: 'Vendor vs. Partner: What Growing Businesses Should Look for in a Technology Firm',
    title_ar: 'مزود الخدمة ضد الشريك التقني: ما الذي يجب على الشركات والشركات الناشئة البحث عنه؟',
    category: 'Business',
    date: 'Aug 14, 2026',
    readTime_en: '7 min read',
    readTime_ar: 'قراءة 7 دقائق',
    excerpt_en: 'Writing code is only 30% of building successful software. Here is how to evaluate software companies based on business empathy, transparency, and architecture.',
    excerpt_ar: 'كتابة الشيفرة البرمجية تمثل 30% فقط من عملية بناء برمجيات ناجحة ومدرة للعوائد. إليك كيفية تقييم شركات البرمجة استناداً إلى الشفافية، المعمارية المتقنة، والتعاطف مع أهداف العمل التجارية.',
    author: {
      name: 'Sultan Al-Rashid',
      role_en: 'Managing Partner',
      role_ar: 'الشريك الإداري',
    },
    tags: ['Strategy', 'Startups', 'Partnership', 'Management'],
    content_en: [
      'When companies look to outsource software development, they often compare bids based solely on hourly rates or estimated completion dates. However, the true cost of software is rarely the initial build; it is the cost of rewrites, missed opportunities, and operational friction caused by poorly thought-out software.',
      'A software vendor simply takes a list of requirements and writes code to match them—even if those requirements are flawed or economically counterproductive. A true technology partner, by contrast, begins by interrogating the business model: What problem are we solving? How does this workflow impact customer retention? What happens when order volume doubles?',
      'Reliable software teams operate with full visibility: weekly synchronous demos, shared code repositories, and clear documentation. They don’t hide behind complex technical buzzwords; they explain trade-offs clearly so stakeholders can make confident commercial decisions.',
      'Choosing DevRopix means partnering with engineers who care as deeply about your business metrics as they do about clean code.',
    ],
    content_ar: [
      'عندما تبحث الشركات عن إسناد تطوير برمجياتها لجهات خارجية، فإنها غالباً ما تقارن العروض استناداً فقط إلى الأسعار التشغيلية أو تاريخ التسليم المتوقع. ومع ذلك، فإن التكلفة الحقيقية للبرمجيات نادراً ما تكمن في البناء الأولي؛ بل في تكلفة إعادة كتابة الأكواد، الفرص الضائعة، والتعقيد التشغيلي الناتج عن البرمجيات الهشة ذات التصاميم الضعيفة.',
      'إن مجرد بائع ومزود البرمجة التقليدي يكتفي بأخذ قائمة متطلبات وكتابة كود يطابقها حتى وإن كانت تلك المتطلبات معيبة أو مضرة بمسيرة العمل اقتصادياً. في المقابل، يبدأ الشريك التقني الحقيقي بالاستفسار العميق عن نموذج العمل: ما هي المشكلة الحقيقية التي نحلها؟ وكيف سيؤثر هذا التدفق البرمجي على الاحتفاظ بالعملاء؟ وما الذي سيحدث عند مضاعفة المبيعات والطلبات؟',
      'تعمل فرق هندسة البرمجيات الموثوقة برؤية كاملة وشفافية مطلقة: عروض أسبوعية حية، مستودعات أكواد مشتركة، وتوثيق دقيق ومبسط. فهم لا يختبئون وراء الكلمات الطنانة، بل يشرحون الموازنات والبدائل بوضوح شديد ليتخذ الشركاء قرارات تجارية واثقة.',
      'إن اختيارك لشركة ديف روبيكس يعني شراكة متكاملة مع مهندسين يركزون على مؤشرات أداء أعمالك التجارية وصحة ونظافة الشفرة البرمجية بنفس القدر من الاهتمام والشغف.',
    ],
  },
];

export const partnerLogos = [
  { name: 'Kroma Retail', industry: 'E-Commerce', industry_ar: 'التجارة الإلكترونية' },
  { name: 'Apex Wealth', industry: 'Fintech', industry_ar: 'التقنية المالية والاستثمار' },
  { name: 'Orbit Logistics', industry: 'Supply Chain', industry_ar: 'سلاسل الإمداد والشحن' },
  { name: 'Lumina Care', industry: 'Health Systems', industry_ar: 'الأنظمة الصحية والعيادات' },
  { name: 'Zenith Labs', industry: 'B2B SaaS', industry_ar: 'البرمجيات السحابية B2B' },
  { name: 'Vortex Energy', industry: 'CleanTech', industry_ar: 'الطاقة النظيفة والصناعة' },
];
