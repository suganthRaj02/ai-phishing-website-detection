"""
Module 1: Website Feature Extraction
Course: ITA1402 – Ethical Hacking
Capstone Project: Development of an Artificial Intelligence-Based Phishing Website Detection Framework
Team:
  - Manu Neethi S (192521063)
  - Sugantharaj A (192421416)
  - Dinesh Karthik R. (192524121)
Guide: Dr. Smitha
"""

import re
from urllib.parse import urlparse
from typing import Dict, Any, List, Tuple

SUSPICIOUS_KEYWORDS = [
    'login', 'signin', 'log-in', 'sign-in', 'verify', 'verification', 
    'account', 'banking', 'secure', 'security', 'update', 'confirm', 
    'password', 'credential', 'auth', 'wallet', 'ebayisapi', 'webscr', 
    'support', 'recover', 'token', 'billing', 'invoice', 'free-gift', 
    'prize', 'bonus', 'crypto', 'session', 'validation', 'authenticate'
]

SHORTENER_DOMAINS = [
    'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'ow.ly', 'is.gd', 
    'buff.ly', 'adf.ly', 'bit.do', 'cutt.ly', 'rb.gy', 'v.gd'
]

SUSPICIOUS_TLDS = [
    'xyz', 'top', 'work', 'loan', 'click', 'fit', 'gq', 'cf', 'tk', 
    'ml', 'ga', 'buzz', 'cc', 'rest', 'monster', 'icu', 'cam'
]

def extract_features(raw_url: str) -> Tuple[Dict[str, Any], List[float]]:
    """
    Extracts 12 structured features from the given URL and converts them into
    a normalized feature vector for the trained ML classifier.
    
    Feature Order MUST Match Model Training Pipeline:
      [0] url_length
      [1] has_https (1 or 0)
      [2] dot_count
      [3] special_char_count
      [4] has_ip_address (1 or 0)
      [5] has_at_symbol (1 or 0)
      [6] hyphen_count
      [7] subdomain_count
      [8] suspicious_words_count
      [9] is_shortened (1 or 0)
      [10] has_double_slash (1 or 0)
      [11] has_suspicious_tld (1 or 0)
    """
    url = raw_url.strip()
    if not url.startswith(('http://', 'https://')):
        url = 'http://' + url

    try:
        parsed = urlparse(url)
    except Exception:
        parsed = urlparse('http://unknown')

    hostname = (parsed.netloc or '').lower()
    if ':' in hostname:
        hostname = hostname.split(':')[0]
    path = parsed.path or ''
    query = parsed.query or ''
    full_path = path + ('?' + query if query else '')

    # 1. URL Length
    url_length = len(url)

    # 2. HTTPS Status
    has_https = 1 if url.lower().startswith('https://') else 0

    # 3. Dot Count in URL
    dot_count = url.count('.')

    # 4. Special Characters Count (- @ ? = % _ & #)
    special_chars = re.findall(r'[-@?=%\_&#]', url)
    special_char_count = len(special_chars)

    # 5. IP Address in Hostname
    ip_pattern = r'^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
    has_ip_address = 1 if re.match(ip_pattern, hostname) else 0

    # 6. @ Symbol
    has_at_symbol = 1 if '@' in url else 0

    # 7. Hyphen in Domain
    hyphen_count = hostname.count('-')

    # 8. Number of Subdomains
    host_parts = hostname.split('.')
    subdomain_count = max(0, len(host_parts) - 2)

    # 9. Suspicious Keywords
    lower_url = url.lower()
    matched_keywords = [kw for kw in SUSPICIOUS_KEYWORDS if kw in lower_url]
    suspicious_words_count = len(matched_keywords)

    # 10. Shortened URL Detection
    is_shortened = 1 if any(hostname == s or hostname.endswith('.' + s) for s in SHORTENER_DOMAINS) else 0

    # 11. Double Slash in Path
    has_double_slash = 1 if '//' in full_path else 0

    # 12. Suspicious TLD
    tld = host_parts[-1] if len(host_parts) > 1 else ''
    has_suspicious_tld = 1 if tld in SUSPICIOUS_TLDS else 0

    features_dict = {
        "urlLength": url_length,
        "https": has_https,
        "dotCount": dot_count,
        "specialChars": special_char_count,
        "ipAddress": has_ip_address,
        "atSymbol": has_at_symbol,
        "hyphen": hyphen_count,
        "subdomains": subdomain_count,
        "suspiciousWords": suspicious_words_count,
        "suspiciousWordsList": matched_keywords,
        "isShortened": is_shortened,
        "hasDoubleSlash": has_double_slash,
        "tld": tld,
        "hasSuspiciousTld": has_suspicious_tld,
        "domain": hostname
    }

    feature_vector = [
        float(url_length),
        float(has_https),
        float(dot_count),
        float(special_char_count),
        float(has_ip_address),
        float(has_at_symbol),
        float(hyphen_count),
        float(subdomain_count),
        float(suspicious_words_count),
        float(is_shortened),
        float(has_double_slash),
        float(has_suspicious_tld)
    ]

    return features_dict, feature_vector
