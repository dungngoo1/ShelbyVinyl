# Shelby Vinyl App Starter

Initial code scaffold for the Shelby music-sharing project.

## Included in this step

- Next.js app router skeleton
- Petra wallet connect button via Aptos Wallet Adapter
- Prisma schema copied into the app folder
- Landing page, Explore, My Tracks, Upload, Faucet, and Track detail routes
- Basic vinyl-style player card UI
- `.env.example` and starter config

## First run

```bash
pnpm install
cp .env.example .env
pnpm db:generate
pnpm dev
```

## Next implementation steps

1. Wire real auth/session persistence.
2. Add wallet signature verification endpoint.
3. Connect Upload page to Shelby service.
4. Replace mock data with Prisma queries.
5. Add admin routes and moderation actions.
