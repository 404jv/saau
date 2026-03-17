# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SAAU is a monorepo for an animal shelter ONG (Sociedade Amiga dos Animais Uberlandenses). It has a NestJS backend and a React+Vite frontend.

## Commands

### Root (monorepo)
- `npm run dev:backend` — start backend in watch mode (also starts Docker DB)
- `npm run dev:frontend` — start frontend dev server
- `npm run build:backend` / `npm run build:frontend`

### Backend (`cd backend`)
- `npm run start:dev` — runs `docker compose up -d` then `nest start --watch`
- `npm run services:up` / `services:down` / `services:stop` — Docker Compose for PostgreSQL
- `npm run lint` — ESLint with auto-fix
- `npm run format` — Prettier
- `npm test` — Vitest (E2E tests hit real DB)
- `npx prisma migrate dev` — run migrations
- `npx prisma generate` — regenerate Prisma client

### Frontend (`cd frontend`)
- `npm run dev` — Vite dev server
- `npm run build` — TypeScript check + Vite build
- `npm run lint` — ESLint

## Architecture

### Backend (NestJS)
- **Global prefix:** `/api/v1`
- **Swagger docs:** `/api/docs`
- **Modules:** `AuthModule`, `UsersModule`, `PrismaModule`
- **Validation:** Zod schemas with a custom `ZodValidationPipe`
- **Auth:** JWT (1-day expiry) + Google OAuth2 flow
- **Error handling:** Custom `ApiError` class with global exception filter
- **Database:** PostgreSQL via Prisma ORM, Docker Compose on port 5433
- **Presenters:** Used to strip sensitive fields (e.g., password) from responses
- **Testing:** Vitest E2E tests in `test/` directory, test app factory in `test/factory/make-app.ts`

### Frontend (React + Vite + TypeScript)
- **Vite proxy:** `/api/*` → `http://localhost:3000` (backend)
- **Font:** Yusei Magic (Google Fonts)
- **Pages** live in `src/pages/`
- No routing library yet — single page rendered in `App.tsx`

## Key Conventions
- Backend uses ESM (`"type": "module"`) — imports use `.js` extensions
- Backend path alias: `@/*` → `./src/*`
- Prisma model field names use `@map` for snake_case DB columns
- Commit messages follow `feat:`, `fix:`, etc. prefix style
