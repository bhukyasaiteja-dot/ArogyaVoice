import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { generateAnswer } from './health.js';

const app = express();
const port = Number(process.env.PORT) || 3001;
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'ArogyaVoice API' });
});

app.post('/api/health', async (request, response) => {
  const { question, language = 'en' } = request.body ?? {};
  if (typeof question !== 'string' || !question.trim()) {
    return response.status(400).json({ error: 'Please enter a health question.' });
  }
  if (question.length > 1000) {
    return response.status(413).json({ error: 'Please keep your question under 1,000 characters.' });
  }
  const safeLanguage = ['en', 'te', 'hi'].includes(language) ? language : 'en';
  try {
    const result = await generateAnswer(question.trim(), safeLanguage);
    return response.json({ ...result, language: safeLanguage });
  } catch {
    return response.status(500).json({ error: 'The health guide is temporarily unavailable.' });
  }
});

app.listen(port, () => {
  console.log(`ArogyaVoice API listening on http://localhost:${port}`);
});