# Imani Gad

Personal site for **Imani Gad** — software engineering, AI/ML, and cybersecurity.

The résumé PDF in `public/resume/Imani-Gad.pdf` is the factual source of truth. Mockup-only employers, metrics, and invented projects are not used.

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion (available), Lucide, next-themes, Zod, React Hook Form, Vitest, Playwright.

## Develop

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm test
pnpm test:e2e
pnpm build
```

Playwright needs browsers once: `pnpm exec playwright install chromium`.

## Optional integrations

Copy `.env.example` to `.env.local`.

| Variable | Effect |
| --- | --- |
| `GEMINI_API_KEY` | Required, server-only Google Gemini API key used by Ask Imani. Never use a `NEXT_PUBLIC_` prefix. |
| `DATABASE_URL` | Optional PostgreSQL connection for durable conversations, analytics, and embeddings. Without it, conversations use process memory and best-effort local JSON storage. |
| `ANALYTICS_KEY` | Optional secret protecting `/assistant/analytics`. |
| `GEMINI_MODEL`, `GEMINI_EMBEDDING_MODEL`, `GEMINI_EMBEDDING_DIMENSIONS` | Optional Gemini model configuration; defaults are `gemini-flash-lite-latest`, `gemini-embedding-001`, and `768`. |
| `FRONTEND_URL` | Optional allowed frontend origin for the co-hosted API; defaults to `http://localhost:5173`. |
| `GEMINI_TIMEOUT_MS`, `CHAT_RATE_LIMIT_MAX`, `CHAT_RATE_LIMIT_WINDOW_MS`, `SESSION_TTL_MS`, `DATA_RETENTION_DAYS`, `LOG_LEVEL` | Optional assistant backend limits, retention, timeout, and logging settings. |
| `RESEND_API_KEY` | Contact form sends email. Without it, messages are logged server-side. |
| `SPOTIFY_*` | Live now-playing, recently played, and top artists. Without them, a labeled coding playlist is shown. |

### Connect a Spotify account

1. In the Spotify Developer Dashboard, register `http://127.0.0.1:3000/api/spotify/callback` as an exact redirect URI.
2. Add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REDIRECT_URI` to `.env.local`. Never commit the client secret.
3. Run `pnpm dev`, then open `http://127.0.0.1:3000/api/spotify/connect`.
4. Approve the three read-only scopes. The local callback prints a refresh token once.
5. Add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` to Railway, then redeploy.

The setup endpoints return `404` in production. Spotify refresh tokens currently expire after 180 days, so repeat the local authorization when the token expires.

### Ask Imani assistant

The `/assistant` page integrates the existing `Igadsme/ai-recruiter-assistant` frontend in the Gad OS design system. Its original Express API, candidate data, retrieval, prompts, Gemini integration, and recruiter endpoints run in the same Gad OS Node server under `/api/recruiter/*`; no separate assistant service URL is required. Set `GEMINI_API_KEY` on the server/deployment platform. Gemini credentials and database configuration are never sent to the browser. Set `DATABASE_URL` to PostgreSQL for durable production sessions, analytics, and embeddings; without it, built-in in-memory and best-effort JSON stores are used.

The integration retains the assistant's chat, recruiter mode, suggested prompts, evidence and source disclosures, job-fit analysis, interview simulator, career timeline, recruiter session panel, resume preview/download, contact details, voice input/output where browser-supported, and private analytics at `/assistant/analytics`. That analytics route remains protected by the backend's `ANALYTICS_KEY`.

## Content

Edit files in `data/` — `profile.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `lab.ts`, `gallery.ts`. Do not scatter résumé facts through JSX.
