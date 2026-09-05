import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './config';
import { DetectionResult, DashboardStats } from '../types';

export const saveDetectionRecord = async (
  userId: string, 
  detection: DetectionResult
): Promise<string> => {
  try {
    const detectionsRef = collection(db, 'users', userId, 'detections');
    const docData = {
      url: detection.url,
      classification: detection.classification,
      riskScore: detection.riskScore,
      riskLevel: detection.riskLevel,
      confidence: detection.confidence,
      timestamp: detection.timestamp || new Date().toISOString(),
      createdAt: serverTimestamp(),
      features: {
        urlLength: detection.features.urlLength,
        hasHttps: detection.features.hasHttps ? 1 : 0,
        dotCount: detection.features.dotCount,
        specialCharCount: detection.features.specialCharCount,
        hasIpAddress: detection.features.hasIpAddress ? 1 : 0,
        hasAtSymbol: detection.features.hasAtSymbol ? 1 : 0,
        hyphenCountInDomain: typeof detection.features.hyphenCountInDomain === 'number' 
          ? detection.features.hyphenCountInDomain 
          : (detection.features.hyphenCountInDomain ? 1 : 0),
        subdomainCount: detection.features.subdomainCount,
        suspiciousKeywordsCount: detection.features.suspiciousKeywordsCount,
        suspiciousKeywordsList: detection.features.suspiciousKeywordsList || [],
        isShortenedUrl: detection.features.isShortenedUrl ? 1 : 0,
        hasDoubleSlashInPath: detection.features.hasDoubleSlashInPath ? 1 : 0,
        hasSuspiciousTld: detection.features.hasSuspiciousTld ? 1 : 0,
        domain: detection.features.domain || '',
      },
      featureVector: detection.featureVector || [],
      recommendation: detection.recommendation,
      securityFlags: detection.securityFlags || []
    };

    const docRef = await addDoc(detectionsRef, docData);
    return docRef.id;
  } catch (error) {
    console.error('Error saving detection to Firestore:', error);
    // Local backup for reliability
    saveToLocalHistory(userId, detection);
    return 'local-' + Date.now();
  }
};

export const getUserDetections = async (userId: string): Promise<DetectionResult[]> => {
  try {
    const detectionsRef = collection(db, 'users', userId, 'detections');
    const q = query(detectionsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const results: DetectionResult[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      results.push({
        id: docSnap.id,
        url: data.url,
        classification: data.classification,
        riskScore: Number(data.riskScore) || 0,
        riskLevel: data.riskLevel || (data.riskScore > 70 ? 'HIGH RISK' : data.riskScore > 30 ? 'MEDIUM RISK' : 'LOW RISK'),
        confidence: Number(data.confidence) || (data.riskScore / 100),
        timestamp: data.timestamp || new Date().toISOString(),
        features: {
          urlLength: data.features?.urlLength ?? 0,
          hasHttps: Boolean(data.features?.hasHttps),
          dotCount: data.features?.dotCount ?? 0,
          specialCharCount: data.features?.specialCharCount ?? 0,
          hasIpAddress: Boolean(data.features?.hasIpAddress),
          hasAtSymbol: Boolean(data.features?.hasAtSymbol),
          hyphenCountInDomain: data.features?.hyphenCountInDomain ?? 0,
          subdomainCount: data.features?.subdomainCount ?? 0,
          domainAge: data.features?.domainAge || '> 1 Year',
          domainAgeMonths: data.features?.domainAgeMonths ?? 12,
          sslCertificate: data.features?.sslCertificate || 'Valid',
          sslValid: Boolean(data.features?.sslValid ?? true),
          redirectCount: data.features?.redirectCount ?? 0,
          suspiciousKeywordsCount: data.features?.suspiciousKeywordsCount ?? 0,
          suspiciousKeywordsList: data.features?.suspiciousKeywordsList ?? [],
          isShortenedUrl: Boolean(data.features?.isShortenedUrl),
          hasDoubleSlashInPath: Boolean(data.features?.hasDoubleSlashInPath),
          tld: data.features?.tld || '',
          hasSuspiciousTld: Boolean(data.features?.hasSuspiciousTld),
          domain: data.features?.domain || '',
          pathLength: data.features?.pathLength || 0,
        },
        featureVector: data.featureVector || [],
        recommendation: data.recommendation || '',
        securityFlags: data.securityFlags || [],
        analyzedAt: new Date(data.timestamp || Date.now()).getTime(),
      });
    });

    if (results.length === 0) {
      // Check local history backup
      const local = getLocalHistory(userId);
      if (local.length > 0) return local;
    }

    return results;
  } catch (error) {
    console.warn('Firestore query failed, fetching local history:', error);
    return getLocalHistory(userId);
  }
};

export const deleteDetectionRecord = async (userId: string, detectionId: string): Promise<void> => {
  try {
    if (!detectionId.startsWith('local-')) {
      const docRef = doc(db, 'users', userId, 'detections', detectionId);
      await deleteDoc(docRef);
    }
    deleteFromLocalHistory(userId, detectionId);
  } catch (error) {
    console.error('Error deleting detection:', error);
    deleteFromLocalHistory(userId, detectionId);
    throw error;
  }
};

export const clearUserHistory = async (userId: string): Promise<void> => {
  try {
    const detectionsRef = collection(db, 'users', userId, 'detections');
    const snapshot = await getDocs(detectionsRef);
    const batch = writeBatch(db);
    
    snapshot.docs.forEach((d) => {
      batch.delete(d.ref);
    });

    await batch.commit();
    localStorage.removeItem(`phish_history_${userId}`);
  } catch (error) {
    console.error('Error clearing history:', error);
    localStorage.removeItem(`phish_history_${userId}`);
    throw error;
  }
};

export const calculateDashboardStats = (detections: DetectionResult[]): DashboardStats => {
  if (!detections || detections.length === 0) {
    return {
      totalScans: 0,
      legitimateCount: 0,
      phishingCount: 0,
      highRiskCount: 0,
      averageRiskScore: 0,
    };
  }

  const totalScans = detections.length;
  const legitimateCount = detections.filter(d => d.classification === 'LEGITIMATE').length;
  const phishingCount = detections.filter(d => d.classification === 'PHISHING').length;
  const highRiskCount = detections.filter(d => d.riskScore > 70 || d.riskLevel === 'HIGH RISK').length;
  const totalScore = detections.reduce((sum, d) => sum + (d.riskScore || 0), 0);
  const averageRiskScore = Math.round(totalScore / totalScans);

  return {
    totalScans,
    legitimateCount,
    phishingCount,
    highRiskCount,
    averageRiskScore,
  };
};

// Local storage backup functions
const getLocalHistory = (userId: string): DetectionResult[] => {
  try {
    const saved = localStorage.getItem(`phish_history_${userId}`);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveToLocalHistory = (userId: string, item: DetectionResult) => {
  try {
    const history = getLocalHistory(userId);
    const updated = [item, ...history.filter(h => h.id !== item.id)].slice(0, 100);
    localStorage.setItem(`phish_history_${userId}`, JSON.stringify(updated));
  } catch (e) {
    console.error('Local history save error:', e);
  }
};

const deleteFromLocalHistory = (userId: string, id: string) => {
  try {
    const history = getLocalHistory(userId);
    const updated = history.filter(h => h.id !== id);
    localStorage.setItem(`phish_history_${userId}`, JSON.stringify(updated));
  } catch (e) {
    console.error('Local history delete error:', e);
  }
};
