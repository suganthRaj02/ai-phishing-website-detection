"""
FastAPI Server for AI-Based Phishing Website Detection Framework
Course: ITA1402 – Ethical Hacking
Team:
  - Manu Neethi S (192521063)
  - Sugantharaj A (192421416)
  - Dinesh Karthik R. (192524121)
Project Guide: Dr. Smitha
"""

import uvicorn
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl, validator
from typing import Dict, Any, Optional
from prediction import detector
from feature_extraction import extract_features

app = FastAPI(
    title="AI Phishing Website Detection Framework API",
    description="Backend ML Engine for ITA1402 Ethical Hacking Capstone Project",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

    @validator('url')
    def validate_url_not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('URL cannot be empty')
        return v.strip()

@app.get("/")
def root():
    return {
        "project": "Development of an Artificial Intelligence-Based Phishing Website Detection Framework",
        "course": "ITA1402 – Ethical Hacking",
        "guide": "Dr. Smitha",
        "team": [
            {"name": "Manu Neethi S", "registerNo": "192521063"},
            {"name": "Sugantharaj A", "registerNo": "192421416"},
            {"name": "Dinesh Karthik R.", "registerNo": "192524121"}
        ],
        "status": "online",
        "model_loaded": detector.model is not None
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Phishing Detection ML Service",
        "modelLoaded": detector.model is not None
    }

@app.post("/api/predict")
def predict_url(request: URLRequest):
    try:
        url = request.url
        result = detector.predict(url)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error analyzing URL characteristics: {str(e)}"
        )

@app.post("/api/extract-features")
def extract_only(request: URLRequest):
    try:
        features_dict, vector = extract_features(request.url)
        return {
            "url": request.url,
            "features": features_dict,
            "featureVector": vector
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Feature extraction failed: {str(e)}"
        )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
