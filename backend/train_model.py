"""
Model Training Script for Phishing Website Detection
Uses scikit-learn Random Forest Classifier to train and export phishing_model.pkl
Course: ITA1402 – Ethical Hacking
"""

import os
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

def generate_training_data(n_samples=2000):
    np.random.seed(42)
    X = []
    y = []

    # Features:
    # 0: url_length (15 - 150)
    # 1: has_https (0 or 1)
    # 2: dot_count (1 - 8)
    # 3: special_char_count (0 - 15)
    # 4: has_ip_address (0 or 1)
    # 5: has_at_symbol (0 or 1)
    # 6: hyphen_count (0 - 6)
    # 7: subdomain_count (0 - 5)
    # 8: suspicious_words_count (0 - 5)
    # 9: is_shortened (0 or 1)
    # 10: has_double_slash (0 or 1)
    # 11: has_suspicious_tld (0 or 1)

    for _ in range(n_samples // 2):
        # Legitimate samples (label 0)
        url_len = np.random.randint(15, 60)
        https = 1 if np.random.random() > 0.1 else 0
        dots = np.random.randint(1, 3)
        specials = np.random.randint(0, 3)
        ip = 0
        at = 0
        hyphen = np.random.choice([0, 1], p=[0.85, 0.15])
        subdomains = np.random.choice([0, 1], p=[0.75, 0.25])
        suspicious_words = 0 if np.random.random() > 0.05 else 1
        shortened = 0 if np.random.random() > 0.05 else 1
        double_slash = 0
        suspicious_tld = 0 if np.random.random() > 0.03 else 1

        X.append([url_len, https, dots, specials, ip, at, hyphen, subdomains, suspicious_words, shortened, double_slash, suspicious_tld])
        y.append(0)

    for _ in range(n_samples // 2):
        # Phishing samples (label 1)
        url_len = np.random.randint(45, 140)
        https = 0 if np.random.random() > 0.35 else 1
        dots = np.random.randint(2, 7)
        specials = np.random.randint(2, 10)
        ip = 1 if np.random.random() > 0.7 else 0
        at = 1 if np.random.random() > 0.75 else 0
        hyphen = np.random.randint(1, 5)
        subdomains = np.random.randint(1, 4)
        suspicious_words = np.random.randint(1, 4)
        shortened = 1 if np.random.random() > 0.6 else 0
        double_slash = 1 if np.random.random() > 0.8 else 0
        suspicious_tld = 1 if np.random.random() > 0.4 else 0

        X.append([url_len, https, dots, specials, ip, at, hyphen, subdomains, suspicious_words, shortened, double_slash, suspicious_tld])
        y.append(1)

    return np.array(X), np.array(y)

def train_and_save():
    print("[*] Generating dataset of legitimate & phishing features...")
    X, y = generate_training_data(3000)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("[*] Training Random Forest Classifier...")
    model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"[✓] Model Accuracy: {acc * 100:.2f}%")
    print("\nClassification Report:\n", classification_report(y_test, y_pred, target_names=["Legitimate", "Phishing"]))

    os.makedirs(os.path.join(os.path.dirname(__file__), "model"), exist_ok=True)
    out_path = os.path.join(os.path.dirname(__file__), "model", "phishing_model.pkl")
    with open(out_path, "wb") as f:
        pickle.dump(model, f)
    print(f"[✓] Trained model saved successfully to: {out_path}")

if __name__ == "__main__":
    train_and_save()
