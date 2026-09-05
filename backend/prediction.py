"""
Module 2 & 3: AI-Based Phishing Detection & Alert System
Course: ITA1402 – Ethical Hacking
Capstone Project: Development of an Artificial Intelligence-Based Phishing Website Detection Framework
"""

import os
import pickle
import numpy as np
from typing import Dict, Any, List
from feature_extraction import extract_features

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "phishing_model.pkl")

class PhishingDetector:
    def __init__(self, model_path: str = MODEL_PATH):
        self.model_path = model_path
        self.model = None
        self.load_model()

    def load_model(self):
        """Loads trained scikit-learn model once on startup."""
        if os.path.exists(self.model_path):
            try:
                with open(self.model_path, 'rb') as f:
                    self.model = pickle.load(f)
                print(f"[+] Loaded ML model from {self.model_path}")
            except Exception as e:
                print(f"[!] Warning: Could not deserialize model: {e}")
                self.model = None
        else:
            print(f"[*] Note: Trained model at {self.model_path} not found. Running integrated decision classifier.")

    def predict(self, url: str) -> Dict[str, Any]:
        features_dict, vector = extract_features(url)
        vector_np = np.array([vector])

        risk_score = 0
        classification = "LEGITIMATE"
        confidence = 0.0

        if self.model is not None:
            try:
                pred = self.model.predict(vector_np)[0]
                if hasattr(self.model, "predict_proba"):
                    proba = self.model.predict_proba(vector_np)[0]
                    # Index 1 is probability of phishing (if binary 0/1)
                    phish_proba = proba[1] if len(proba) > 1 else proba[0]
                    risk_score = int(round(phish_proba * 100))
                    confidence = float(round(phish_proba, 2))
                else:
                    risk_score = 90 if pred == 1 else 10
                    confidence = 0.90 if pred == 1 else 0.10
                
                classification = "PHISHING" if (pred == 1 or risk_score >= 45) else "LEGITIMATE"
            except Exception as e:
                print(f"[!] Model execution error: {e}")
                risk_score, classification, confidence = self._rule_based_fallback(features_dict)
        else:
            risk_score, classification, confidence = self._rule_based_fallback(features_dict)

        # Risk level determination (0-30 Low, 31-70 Medium, 71-100 High)
        if risk_score <= 30:
            risk_level = "LOW RISK"
        elif risk_score <= 70:
            risk_level = "MEDIUM RISK"
        else:
            risk_level = "HIGH RISK"

        # Security recommendation
        if classification == "LEGITIMATE" and risk_score <= 30:
            recommendation = "Website appears legitimate based on the analyzed characteristics. Continue browsing with standard precautions."
        elif classification == "LEGITIMATE":
            recommendation = "Website shows minor anomalies. Exercise caution before entering credentials."
        elif risk_score >= 75:
            recommendation = "CRITICAL ALERT: High probability of phishing. Do not enter passwords, OTPs, banking details, or other sensitive information."
        else:
            recommendation = "WARNING: Suspicious characteristics associated with phishing were detected. Do not submit sensitive personal information."

        return {
            "url": url,
            "classification": classification,
            "riskScore": risk_score,
            "riskLevel": risk_level,
            "confidence": confidence,
            "features": features_dict,
            "featureVector": vector,
            "recommendation": recommendation
        }

    def _rule_based_fallback(self, f: Dict[str, Any]) -> tuple:
        score = 0
        if f["ipAddress"] == 1: score += 30
        if f["atSymbol"] == 1: score += 25
        if f["https"] == 0: score += 18
        if f["urlLength"] > 75: score += 18
        elif f["urlLength"] > 54: score += 8
        if f["hyphen"] > 0: score += min(22, f["hyphen"] * 8)
        if f["subdomains"] >= 3: score += 20
        elif f["subdomains"] >= 2: score += 10
        if f["dotCount"] > 4: score += 15
        elif f["dotCount"] > 2: score += 6
        if f["suspiciousWords"] > 0: score += min(28, f["suspiciousWords"] * 12)
        if f["isShortened"] == 1: score += 15
        if f["hasDoubleSlash"] == 1: score += 20
        if f["hasSuspiciousTld"] == 1: score += 16

        final_score = min(100, max(0, score))
        cls = "PHISHING" if final_score >= 45 else "LEGITIMATE"
        conf = round(final_score / 100.0, 2)
        return final_score, cls, conf

detector = PhishingDetector()
