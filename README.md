# Gad OS

Personal product-style portfolio for **Imani Gad** — software engineering, AI/ML, and cybersecurity.

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
| `SPOTIFY_*` | Live now-playing, recently played, and top artists. Without them, a labeled coding playlist is shown. |

## Content

Edit files in `data/` — `profile.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `lab.ts`, `gallery.ts`. Do not scatter résumé facts through JSX.
