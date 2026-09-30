# ArogyaVoice

A voice-first, multilingual healthcare guidance MVP for English, Telugu, and Hindi. It pairs a responsive React chat experience with a small Express API. Speech recognition and playback use browser APIs; health guidance works locally without an AI account or API key.

## Requirements

- Node.js 20 or newer and npm
- A modern browser; voice input needs browser support and microphone permission (Chrome and Edge support it best)

## Run locally

Open two PowerShell terminals from the project root.

Terminal 1, in `ArogyaVoice/backend`:

```powershell
npm.cmd install
npm.cmd run dev
```

Terminal 2, in `ArogyaVoice/frontend`:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the frontend URL printed by Vite (normally http://localhost:5173). Vite forwards `/api` requests to `http://localhost:3001`.

## Optional AI responses

Built-in English, Telugu, and Hindi guidance works without secrets or external services. To enable optional OpenAI responses, copy `backend/.env.example` to `backend/.env`, set `OPENAI_API_KEY` there, and optionally change `OPENAI_MODEL`. In PowerShell, run `Copy-Item .env.example .env` from `ArogyaVoice/backend`. The key is read only by the backend and must never be placed in frontend code. Urgent symptom checks always take priority; if the provider is unavailable, the API falls back to local guidance.

The backend reads `PORT` (default `3001`) and comma-separated `FRONTEND_ORIGIN` values (default `http://localhost:5173`) from its environment.

## API

- `GET /api/health` returns service status.
- `POST /api/health` accepts `{ "question": "...", "language": "en" }`. Supported language codes are `en`, `te`, and `hi`; the response includes `answer`, `emergency`, `source`, and `language`.

## Checks

From `ArogyaVoice/backend`, run `npm.cmd test` for emergency and multilingual response checks. From `ArogyaVoice/frontend`, run `npm.cmd run build` to create a production build.

## Safety

ArogyaVoice shares general information, not diagnoses, and cannot replace a clinician. It flags selected serious symptom phrases with urgent professional-care guidance, but it cannot reliably detect every emergency. If symptoms are severe or you are worried, contact a clinician or local emergency services. The emergency call shortcut uses India's 112 number.
