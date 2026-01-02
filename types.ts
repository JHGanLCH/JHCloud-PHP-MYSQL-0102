
export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  date: string;
  clicks: number;
  isPinned: boolean;
  createdAt: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  fullSpecs: string;
  features: string[];
}

export interface Case {
  id: string;
  industry: string;
  name: string;
  logoUrl: string;
  summary: string;
  content: string;
  imageUrl: string;
  relatedProducts: string[]; // 涉及产品
}

export interface AdminConfig {
  username: string;
  passwordHash: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface TechFeature {
  title: string;
  items: string[];
}

export interface IndustryDetail {
  id: string;
  name: string;
  description: string;
  features: string[];
}

export interface SiteData {
  news: News[];
  products: Product[];
  cases: Case[];
  companyIntro: string;
  techContent: string;
  techFeatures: TechFeature[];
  industryContent: string; // Keep for overall intro
  industryDetails: IndustryDetail[]; // New structured field
  industryTags: string[];
  industryStatValue: string;
  industryStatLabel: string;
  industryImageUrl: string;
  admin: AdminConfig;
  contact: ContactInfo;
}
