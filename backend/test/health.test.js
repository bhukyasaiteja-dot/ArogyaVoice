import test from 'node:test';
import assert from 'node:assert/strict';
import { assessQuestion } from '../src/health.js';

test('uses localized emergency guidance for serious English symptoms', () => {
  const result = assessQuestion('I have chest pain and trouble breathing', 'en');
  assert.equal(result.emergency, true);
  assert.match(result.answer, /emergency services now/i);
  assert.equal(result.source, 'safety');
  assert.equal(assessQuestion('I am having trouble breathing', 'en').emergency, true);
});

test('recognizes urgent Telugu and Hindi symptoms', () => {
  assert.equal(assessQuestion('నాకు ఛాతి నొప్పి ఉంది', 'te').emergency, true);
  assert.equal(assessQuestion('ఊపిరి తీసుకోలేకపోతున్నాను', 'te').emergency, true);
  assert.equal(assessQuestion('सीने में दर्द हो रहा है', 'hi').emergency, true);
  assert.equal(assessQuestion('साँस फूल रही है', 'hi').emergency, true);
});

test('returns local topic guidance in Telugu and Hindi', () => {
  assert.match(assessQuestion('నిద్ర ఎలా మెరుగుపరుచుకోవాలి?', 'te').answer, /నిద్రపోవడం/);
  assert.match(assessQuestion('नींद कैसे बेहतर करूँ?', 'hi').answer, /सोना-जागना/);
});

test('returns general guidance when no optional AI key is configured', () => {
  const previousKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  try {
    assert.match(assessQuestion('What can I do?', 'en').answer, /diagnose a condition/i);
  } finally {
    if (previousKey !== undefined) process.env.OPENAI_API_KEY = previousKey;
  }
});