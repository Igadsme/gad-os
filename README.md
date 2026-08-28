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
| `OPENAI_API_KEY` | April uses an LLM grounded on résumé context. Without it, April answers from deterministic retrieval. |
| `RESEND_API_KEY` | Contact form sends email. Without it, messages are logged server-side. |
| `OUTLOOK_CALENDAR_ICS_URL` | Read-only Outlook calendar feed used to show live busy dates without exposing event details. |
| `SPOTIFY_*` | Live now-playing, recently played, and top artists. Without them, a labeled coding playlist is shown. |

### Connect a Spotify account

1. In the Spotify Developer Dashboard, register `http://127.0.0.1:3000/api/spotify/callback` as an exact redirect URI.
2. Add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REDIRECT_URI` to `.env.local`. Never commit the client secret.
3. Run `pnpm dev`, then open `http://127.0.0.1:3000/api/spotify/connect`.
4. Approve the three read-only scopes. The local callback prints a refresh token once.
5. Add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` to Railway, then redeploy.

The setup endpoints return `404` in production. Spotify refresh tokens currently expire after 180 days, so repeat the local authorization when the token expires.

## Content

Edit files in `data/` — `profile.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `lab.ts`, `gallery.ts`. Do not scatter résumé facts through JSX.
