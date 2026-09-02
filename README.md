# moni-site — Landing page for moni

Marketing site for [moni](https://github.com/vatsa31/moni) — offline expense tracking for iPhone.

**Stack:** Vite + TanStack Start + Tailwind + Motion · **Deploy:** Cloudflare Workers (`moni.workers.dev`)

## Dev

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm preview
```

## Deploy

```bash
pnpm deploy   # build + wrangler deploy
```

Requires `wrangler login`.

## Structure

```
app/
  routes/__root.tsx  # document shell
  routes/index.tsx   # page
  components/landing/*
  styles/app.css
public/favicon.svg
wrangler.jsonc
```
