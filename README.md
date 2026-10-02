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
| `RECRUITER_ASSISTANT_API_URL` | Required for the native Ask Imani feature. Server-only origin of the existing AI Recruiter Assistant API. |
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

The `/assistant` page integrates the existing `Igadsme/ai-recruiter-assistant` frontend in the Gad OS design system. Its backend remains a separate service and is accessed through the same-origin `/api/recruiter/*` proxy. Set `RECRUITER_ASSISTANT_API_URL` to the backend service origin (no `/api` suffix) in `.env.local` for development and in the portfolio deployment environment for production. The URL is server-only; Gemini credentials and database configuration remain on the assistant backend and are never sent to the browser. See the assistant repository's README for its backend environment variables and database setup.

The integration retains the assistant's chat, recruiter mode, suggested prompts, evidence and source disclosures, job-fit analysis, interview simulator, career timeline, recruiter session panel, resume preview/download, contact details, voice input/output where browser-supported, and private analytics at `/assistant/analytics`. That analytics route remains protected by the backend's `ANALYTICS_KEY`.

## Content

Edit files in `data/` — `profile.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `lab.ts`, `gallery.ts`. Do not scatter résumé facts through JSX.
