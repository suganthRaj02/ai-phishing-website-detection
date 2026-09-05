import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { extractUrlFeatures, classifyUrlFeatures } from './src/services/featureExtractor.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'AI Phishing Detection Engine',
      course: 'ITA1402 – Ethical Hacking',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/project-info', (req, res) => {
    res.json({
      title: 'Development of an Artificial Intelligence-Based Phishing Website Detection Framework',
      course: 'ITA1402 – Ethical Hacking',
      guide: 'Dr. Smitha',
      team: [
        { name: 'Manu Neethi S', registerNo: '192521063' },
        { name: 'Sugantharaj A', registerNo: '192421416' },
        { name: 'Dinesh Karthik R.', registerNo: '192524121' }
      ],
      modules: [
        'Module 1: Website Feature Extraction',
        'Module 2: AI-Based Phishing Detection',
        'Module 3: Phishing Detection & Alert System'
      ]
    });
  });

  // POST /api/predict
  app.post('/api/predict', (req, res) => {
    try {
      const { url } = req.body;
      if (!url || typeof url !== 'string' || !url.trim()) {
        return res.status(400).json({ error: 'Please provide a valid website URL' });
      }

      const trimmedUrl = url.trim();
      const { features, featureVector } = extractUrlFeatures(trimmedUrl);
      const result = classifyUrlFeatures(trimmedUrl, features, featureVector);

      return res.json(result);
    } catch (error: any) {
      console.error('Prediction API Error:', error);
      return res.status(500).json({
        error: 'Failed to process website features',
        details: error?.message || 'Internal server error'
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CyberShield ML Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
