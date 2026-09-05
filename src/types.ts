export interface URLFeatures {
  // 12 Exact Features from Project Architecture (Module 1)
  urlLength: number;
  hasHttps: boolean;
  dotCount: number;
  specialCharCount: number;
  hasIpAddress: boolean;
  hasAtSymbol: boolean;
  hyphenCountInDomain: number;
  subdomainCount: number;
  domainAge: string;
  domainAgeMonths?: number;
  sslCertificate: string;
  sslValid?: boolean;
  redirectCount: number;
  suspiciousKeywordsCount: number;
  suspiciousKeywordsList: string[];
  // Additional structural metadata
  isShortenedUrl: boolean;
  hasDoubleSlashInPath: boolean;
  tld: string;
  hasSuspiciousTld: boolean;
  domain: string;
  pathLength: number;
}

export type ClassificationType = 'LEGITIMATE' | 'PHISHING';
export type RiskLevelType = 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK';

export interface DetectionResult {
  id?: string;
  url: string;
  classification: ClassificationType;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevelType;
  confidence: number; // 0.0 - 1.0
  timestamp: string;
  features: URLFeatures;
  featureVector: number[];
  recommendation: string;
  securityFlags: string[];
  analyzedAt: number;
  isDemo?: boolean;
  // Module 2 execution trace
  aiProcessingTrace?: {
    dataCleaning: string;
    featureScaling: string;
    trainTestSplit: string;
    modelArchitecture: string;
    predictionEngine: string;
    evaluationAccuracy: string;
  };
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  createdAt: string;
  lastLogin: string;
}

export interface DashboardStats {
  totalScans: number;
  legitimateCount: number;
  phishingCount: number;
  highRiskCount: number;
  averageRiskScore: number;
}

export interface TeamMember {
  name: string;
  registerNo: string;
  role: string;
  contribution: string;
  initials: string;
}
