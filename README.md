# Development of an Artificial Intelligence-Based Phishing Website Detection Framework

**Course:** ITA1402 – Ethical Hacking  
**Project Guide:** Dr. Smitha  
**Department:** Information Technology & Cybersecurity  

---

### Project Team

1. **Manu Neethi S** — Register No: `192521063`
2. **Sugantharaj A** — Register No: `192421416`
3. **Dinesh Karthik R.** — Register No: `192524121`

---

## 1. Project Overview

Phishing attacks represent one of the most prevalent and damaging cybersecurity threats, where attackers build deceptive counterfeit websites to trick users into divulging passwords, banking credentials, and One-Time Passwords (OTPs). 

Traditional blacklist-based detection systems fail to protect against zero-day phishing campaigns and disposable attack infrastructure. This capstone project introduces an end-to-end Machine Learning detection framework that evaluates the intrinsic lexical, structural, and behavioral features of website URLs in real time.

---

## 2. Core Project Modules

### Module 1: Website Feature Extraction
Decomposes a submitted target URL into 12 quantitative structural features:
1. **URL Length** (detects hidden tokens and oversized payload paths)
2. **HTTPS Protocol Verification** (identifies insecure HTTP endpoints)
3. **Dot Count** (identifies deceptive delimiter stacking)
4. **Special Character Density** (`-`, `@`, `?`, `=`, `%`, `_`, `&`, `#`)
5. **IP Address Host Detection** (flags raw IPv4/IPv6 hosts used to bypass domain reputation)
6. **@ Symbol Redirection** (flags obfuscation attacks where browsers ignore preceding tokens)
7. **Hyphen Count in Domain** (detects brand spoofing & typosquatting, e.g. `paypal-update`)
8. **Subdomain Count** (detects nested subdomain structures)
9. **Suspicious Keyword Matching** (`login`, `verify`, `account`, `banking`, `security`, `wallet`)
10. **URL Shortener Identification** (`bit.ly`, `tinyurl`, `t.co`, `is.gd`)
11. **Double Slash in Path** (detects open redirection patterns)
12. **Suspicious Top-Level Domain (TLD)** (`.xyz`, `.top`, `.click`, `.loan`, `.work`)

### Module 2: AI/ML Phishing Detection
* Integrates a trained **Random Forest Classifier** (`backend/model/phishing_model.pkl`).
* Exposes `POST /api/predict` via Python FastAPI server.
* Converts feature dictionaries into standard NumPy arrays and runs probabilistic classification into `LEGITIMATE` or `PHISHING`.

### Module 3: Detection & Alert System
* Calculates calibrated **Risk Score (0–100%)**:
  * `0 – 30%` &rarr; **LOW RISK**
  * `31 – 70%` &rarr; **MEDIUM RISK**
  * `71 – 100%` &rarr; **HIGH RISK**
* Generates contextual threat flags and clear user defense advisories (e.g., forbidding OTP/password entry).
* Persists audit logs to **Firebase Firestore** under `users/{userId}/detections`.

---

## 3. Technology Stack

* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Motion.
* **Backend:** Python 3.10+, FastAPI, Uvicorn, Express.js full-stack gateway.
* **Machine Learning:** scikit-learn (RandomForestClassifier, DecisionTreeClassifier), NumPy.
* **Authentication:** Firebase Authentication (Google Sign-In).
* **Database:** Firebase Firestore (NoSQL cloud database with document security rules).

---

## 4. Directory Structure

```text
phishing-detection/
├── .env.example                      # Frontend & Cloud environment declarations
├── firestore.rules                   # Firestore security & authorization rules
├── index.html                        # Application entry HTML
├── metadata.json                     # AI Studio metadata
├── package.json                      # Node dependencies & full-stack scripts
├── server.ts                         # Express server & API proxy
├── src/
│   ├── App.tsx                       # Main application state & routing
│   ├── main.tsx                      # React root entry
│   ├── types.ts                      # Global TypeScript interfaces
│   ├── components/
│   │   ├── AnalysisAnimation.tsx     # Step-by-step scanner animation
│   │   ├── DemoSelector.tsx          # Preset synthetic test cases
│   │   ├── FeatureTable.tsx          # Extracted features & vector inspector
│   │   ├── Footer.tsx                # Capstone credits & guide info
│   │   ├── Navbar.tsx                # Cybersecurity header & user menu
│   │   ├── ResultCard.tsx            # Risk score card & recommendations
│   │   ├── RiskGauge.tsx             # Animated circular risk gauge
│   │   └── StatsOverview.tsx         # Live Firestore summary counters
│   ├── firebase/
│   │   ├── auth.ts                   # Google OAuth & session manager
│   │   ├── config.ts                 # Firebase app initialization
│   │   └── firestore.ts              # CRUD operations for detection logs
│   ├── pages/
│   │   ├── AboutPage.tsx             # Academic problem & solution docs
│   │   ├── ArchitecturePage.tsx      # System architecture & flowchart
│   │   ├── DashboardPage.tsx         # Real-time URL scanner & dashboard
│   │   ├── HistoryPage.tsx           # Firestore detection history & export
│   │   ├── LoginPage.tsx             # Google Sign-In portal
│   │   └── TeamPage.tsx              # Student credentials & Guide info
│   └── services/
│       ├── api.ts                    # REST API client
│       └── featureExtractor.ts       # Lexical parser & ML feature extractor
│
├── backend/
│   ├── feature_extraction.py         # Python Module 1 feature extractor
│   ├── prediction.py                 # Python ML classifier & model loader
│   ├── main.py                       # FastAPI application
│   ├── train_model.py                # Scikit-learn training & export script
│   ├── requirements.txt              # Python PIP dependencies
│   ├── .env.example                  # Python backend configuration
│   └── model/
│       └── phishing_model.pkl        # Serialized trained scikit-learn model
└── README.md
```

---

## 5. Firebase Setup Guide

### A. Create Firebase Project
1. Visit [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and name it `phishing-detector-capstone`.
3. Disable or enable Google Analytics (optional).

### B. Enable Google Authentication
1. In Firebase Console, go to **Build &rarr; Authentication**.
2. Click **Get Started** &rarr; **Sign-in method** tab.
3. Select **Google**, toggle **Enable**, specify your project support email, and click **Save**.
4. In **Authorized Domains**, ensure your local or cloud domain (e.g. `localhost`) is listed.

### C. Create Cloud Firestore Database
1. Go to **Build &rarr; Firestore Database**.
2. Click **Create database**, choose your preferred region, and select **Start in production mode**.
3. In the **Rules** tab, paste the rules from `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /detections/{detectionId} {
        allow read, write, delete: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### D. Environment Variables Configuration
In your `.env` file at the project root, populate your Firebase project credentials:
```env
VITE_FIREBASE_API_KEY="AIzaSyAs030_5i_unLLP56fiPVPhMeJ18I89nVs"
VITE_FIREBASE_AUTH_DOMAIN="aesthetic-alcove-n9v0l.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="aesthetic-alcove-n9v0l"
VITE_FIREBASE_STORAGE_BUCKET="aesthetic-alcove-n9v0l.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="995277119488"
VITE_FIREBASE_APP_ID="1:995277119488:web:6b86522671450f67c538e5"
```

---

## 6. How to Run the Application

### Option 1: Full-Stack Web Application (Node + React + Built-in ML Engine)

#### On Windows (Command Prompt / PowerShell):
```cmd
# 1. Install Node dependencies
npm install

# 2. Start full-stack development server
npm run dev
```
Open your browser at `http://localhost:3000`.

---

### Option 2: Running Standalone Python FastAPI Backend

#### On Windows:
```cmd
# 1. Open a new terminal and navigate to backend
cd backend

# 2. Create Python virtual environment
python -m venv venv

# 3. Activate virtual environment
venv\Scripts\activate

# 4. Install Python dependencies
pip install -r requirements.txt

# 5. (Optional) Train or re-train ML model
python train_model.py

# 6. Start FastAPI server
python main.py
```
FastAPI server runs at `http://localhost:8000`.  
Interactive Swagger API documentation is available at `http://localhost:8000/docs`.

---

## 7. Machine Learning Model (`phishing_model.pkl`)

The project uses a scikit-learn `RandomForestClassifier` trained on 3,000 multi-feature vectors.
To generate or re-train the model file:
```cmd
cd backend
python train_model.py
```
This script computes accuracy metrics, outputs the classification report, and serializes the model to `backend/model/phishing_model.pkl`.

---

## 8. REST API Documentation

### `POST /api/predict`
Analyzes a URL and returns classification, risk score, feature breakdown, and recommendations.

**Request Body:**
```json
{
  "url": "http://paypal-security-update-verify.com/login.php"
}
```

**Response Body:**
```json
{
  "url": "http://paypal-security-update-verify.com/login.php",
  "classification": "PHISHING",
  "riskScore": 92,
  "riskLevel": "HIGH RISK",
  "confidence": 0.92,
  "features": {
    "urlLength": 51,
    "hasHttps": false,
    "dotCount": 2,
    "specialCharCount": 4,
    "hasIpAddress": false,
    "hasAtSymbol": false,
    "hyphenCountInDomain": 3,
    "subdomainCount": 0,
    "suspiciousKeywordsCount": 3,
    "suspiciousKeywordsList": ["security", "update", "login"],
    "isShortenedUrl": false,
    "hasDoubleSlashInPath": false,
    "hasSuspiciousTld": false,
    "domain": "paypal-security-update-verify.com"
  },
  "featureVector": [51, 0, 2, 4, 0, 0, 3, 0, 3, 0, 0, 0],
  "recommendation": "CRITICAL ALERT: High probability of phishing or credential harvesting. DO NOT enter passwords, OTPs, banking credentials, or download attachments from this URL."
}
```

---

## 9. Security & Ethical Considerations

* **Safe Evaluation:** Submitted URLs are analyzed purely through string decomposition, heuristic parsing, and statistical machine learning. The server does not execute target scripts or download malicious binaries.
* **No Credential Harvesting:** The application never requests or stores user passwords or banking information.
* **Data Isolation:** Firestore security rules ensure each student or auditor can only read, write, or delete their own detection records.
* **CORS Protection:** Backend endpoints are protected against unauthorized cross-origin requests.

---

## 10. Capstone Presentation Verification Checklist

1. [x] **Google Authentication** via Firebase Auth active.
2. [x] **URL Feature Extraction** (Module 1) generating 12-dimensional vector.
3. [x] **Machine Learning Inference** (Module 2) via Random Forest classifier.
4. [x] **Risk Scoring** (0–30 Low, 31–70 Medium, 71–100 High).
5. [x] **Security Recommendations** (Module 3) tailored to threat indicators.
6. [x] **Cloud Firestore Synchronization** persisting user scan history.
7. [x] **Detection History** with search, filters, delete, and CSV export.
8. [x] **Capstone Details** displaying Manu Neethi S, Sugantharaj A, Dinesh Karthik R., and Dr. Smitha for ITA1402 – Ethical Hacking.
