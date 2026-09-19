export type Language = 'en' | 'ar';

export type PageId =
  | 'home'
  | 'services'
  | 'projects'
  | 'about'
  | 'blog'
  | 'contact'
  | 'careers'
  | 'privacy'
  | 'terms'
  | 'admin';

export type AdminSection =
  | 'dashboard'
  | 'services'
  | 'projects'
  | 'project-categories'
  | 'blog'
  | 'blog-categories'
  | 'testimonials'
  | 'clients'
  | 'messages'
  | 'media'
  | 'homepage'
  | 'settings'
  | 'profile';

export interface ServiceItem {
  id: string;
  titleKey?: string;
  shortDescKey?: string;
  fullDescKey?: string;
  title_en?: string;
  title_ar?: string;
  shortDesc_en?: string;
  shortDesc_ar?: string;
  fullDesc_en?: string;
  fullDesc_ar?: string;
  iconName?: string;
  deliverables?: string[];
  deliverables_en?: string[];
  deliverables_ar?: string[];
  techStack?: string[];
  metrics?: string;
  metrics_en?: string;
  metrics_ar?: string;
  order?: number;
  status?: 'published' | 'draft';
  featured?: boolean;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectCategory {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  description_en?: string;
  description_ar?: string;
  status?: 'active' | 'inactive';
  order?: number;
}

export interface ProjectItem {
  id: string;
  slug?: string;
  name?: string;
  name_en?: string;
  name_ar?: string;
  category?: string;
  category_en?: string;
  category_ar?: string;
  categoryKey?: string;
  categoryId?: string;
  clientType?: string;
  clientType_en?: string;
  clientType_ar?: string;
  clientName?: string;
  industry?: string;
  industry_en?: string;
  industry_ar?: string;
  projectUrl?: string;
  projectDate?: string;
  summary?: string;
  summary_en?: string;
  summary_ar?: string;
  challenge?: string;
  challenge_en?: string;
  challenge_ar?: string;
  solution?: string;
  solution_en?: string;
  solution_ar?: string;
  results?: string[];
  results_en?: string[];
  results_ar?: string[];
  techStack?: string[];
  deliverables?: string[];
  deliverables_en?: string[];
  deliverables_ar?: string[];
  features_en?: string[];
  features_ar?: string[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string | string[];
  canonicalUrl?: string;
  featured?: boolean;
  status?: 'published' | 'draft';
  accentColor?: string;
  coverImage?: string;
  galleryImages?: string[];
  image?: string;
  client?: string;
  duration?: string;
  liveUrl?: string;
  description_en?: string;
  description_ar?: string;
  gallery?: string[];
  tags?: string[];
  seoTitle_en?: string;
  seoTitle_ar?: string;
  seoDesc_en?: string;
  seoDesc_ar?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogCategory {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  description?: string;
  description_en?: string;
  description_ar?: string;
  status?: 'active' | 'inactive';
  order?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title?: string;
  title_en?: string;
  title_ar?: string;
  category?: string;
  category_en?: string;
  category_ar?: string;
  categoryId?: string;
  date?: string;
  readTime?: string;
  readTime_en?: string;
  readTime_ar?: string;
  excerpt?: string;
  excerpt_en?: string;
  excerpt_ar?: string;
  content?: string[] | string;
  content_en?: string[] | string;
  content_ar?: string[] | string;
  author?: {
    name: string;
    role?: string;
    role_en?: string;
    role_ar?: string;
    avatar?: string;
  };
  tags?: string[];
  featuredImage?: string;
  coverImage?: string;
  status?: 'published' | 'draft';
  featured?: boolean;
  publishedDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  seoTitle_en?: string;
  seoTitle_ar?: string;
  seoDesc_en?: string;
  seoDesc_ar?: string;
  seoKeywords?: string[];
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type BlogPostItem = BlogPost;

export interface TestimonialItem {
  id: string;
  author: string;
  role?: string;
  role_en?: string;
  role_ar?: string;
  company: string;
  industry?: string;
  industry_en?: string;
  industry_ar?: string;
  quote?: string;
  quote_en?: string;
  quote_ar?: string;
  clientPhoto?: string;
  companyLogo?: string;
  avatar?: string;
  rating?: number;
  featured?: boolean;
  status?: 'published' | 'draft';
  order?: number;
  createdAt?: string;
}

export interface ClientPartner {
  id: string;
  name: string;
  industry_en?: string;
  industry_ar?: string;
  logoUrl?: string;
  logo?: string;
  websiteUrl?: string;
  url?: string;
  description?: string;
  order?: number;
  status?: 'active' | 'inactive';
}

export type ClientPartnerItem = ClientPartner;

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export type ContactMessageItem = ContactMessage;

export interface MediaItem {
  id: string;
  name: string;
  title?: string;
  alt?: string;
  url: string;
  type: string;
  size: string;
  dimensions?: string;
  uploadDate: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'editor';
  avatarUrl?: string;
  lastLogin?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: string;
  entityTitle: string;
  userEmail: string;
  timestamp: string;
}

export interface GlobalSettings {
  general: {
    companyName: string;
    logoUrl: string;
    faviconUrl: string;
    email: string;
    phone: string;
    whatsapp: string;
    address_en: string;
    address_ar: string;
  };
  companyName_en?: string;
  companyName_ar?: string;
  slogan_en?: string;
  slogan_ar?: string;
  email?: string;
  phone?: string;
  address_en?: string;
  address_ar?: string;
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    x: string;
    tiktok?: string;
    youtube: string;
    github: string;
  };
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    x?: string;
    twitter?: string;
    tiktok?: string;
    discord?: string;
    dribbble?: string;
    youtube?: string;
    github?: string;
  };
  defaultMetaTitle_en?: string;
  defaultMetaTitle_ar?: string;
  defaultMetaDescription_en?: string;
  defaultMetaDescription_ar?: string;
  seo: {
    defaultMetaTitle_en: string;
    defaultMetaTitle_ar: string;
    defaultMetaDesc_en: string;
    defaultMetaDesc_ar: string;
    defaultMetaDescription_en?: string;
    defaultMetaDescription_ar?: string;
    ogImageUrl: string;
    googleAnalyticsId: string;
    searchEngineVisibility: boolean;
  };
  contact: {
    contactEmail: string;
    whatsapp: string;
    phone: string;
    workingHours_en: string;
    workingHours_ar: string;
  };
  footer: {
    footerDesc_en: string;
    footerDesc_ar: string;
    copyright_en: string;
    copyright_ar: string;
  };
}

export interface HomepageContent {
  hero: {
    tag_en: string;
    tag_ar: string;
    badge_en: string;
    badge_ar: string;
    title_en: string;
    title_ar: string;
    subtitle_en: string;
    subtitle_ar: string;
    primaryCtaText_en: string;
    primaryCtaText_ar: string;
    primaryCtaLink: string;
    secondaryCtaText_en: string;
    secondaryCtaText_ar: string;
    secondaryCtaLink: string;
  };
  stats: Array<{
    value: string;
    label_en: string;
    label_ar: string;
  }>;
  trustedByEnabled: boolean;
  processSteps: Array<{
    stepNumber: number;
    title_en: string;
    title_ar: string;
    desc_en: string;
    desc_ar: string;
  }>;
  ctaBanner: {
    title_en: string;
    title_ar: string;
    subtitle_en: string;
    subtitle_ar: string;
    buttonText_en: string;
    buttonText_ar: string;
    buttonLink: string;
  };
}

export type SiteSettings = GlobalSettings;

export interface JobPosting {
  id: string;
  title_en: string;
  title_ar: string;
  department_en: string;
  department_ar: string;
  location_en: string;
  location_ar: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience_en: string;
  experience_ar: string;
  description_en: string;
  description_ar: string;
  requirements_en: string[];
  requirements_ar: string[];
  responsibilities_en: string[];
  responsibilities_ar: string[];
  status: 'published' | 'draft' | 'closed';
  postedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  coverLetter?: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
}
