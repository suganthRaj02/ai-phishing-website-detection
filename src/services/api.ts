import { DetectionResult } from '../types';
import { extractUrlFeatures, classifyUrlFeatures } from './featureExtractor';

export async function analyzeWebsiteUrl(url: string): Promise<DetectionResult> {
  const trimmed = url.trim();
  if (!trimmed) {
    throw new Error('Please enter a website URL');
  }

  // Attempt server-side API call
  try {
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: trimmed }),
    });

    if (response.ok) {
      const data = await response.json();
      return data as DetectionResult;
    }
  } catch (err) {
    console.warn('Backend API endpoint unreachable, running local ML engine:', err);
  }

  // Fallback to embedded Module 1 + 2 classifier
  const { features, featureVector } = extractUrlFeatures(trimmed);
  return classifyUrlFeatures(trimmed, features, featureVector);
}
