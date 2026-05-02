#!/usr/bin/env bash
# Start SAAU full stack in dev mode (Postgres + NestJS backend + Vite frontend)
# Hot reload is on for both apps. Ctrl+C stops everything.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

color() { printf '\033[%sm%s\033[0m' "$1" "$2"; }
info()  { echo "$(color '1;36' '[dev]') $*"; }
warn()  { echo "$(color '1;33' '[dev]') $*" >&2; }
fail()  { echo "$(color '1;31' '[dev]') $*" >&2; exit 1; }

print_banner() {
  printf '\033[1;36m'
  cat <<'EOF'

   ███████╗ █████╗  █████╗ ██╗   ██╗
   ██╔════╝██╔══██╗██╔══██╗██║   ██║
   ███████╗███████║███████║██║   ██║
   ╚════██║██╔══██║██╔══██║██║   ██║
   ███████║██║  ██║██║  ██║╚██████╔╝
   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝

   Sociedade de Amparo aos Animais de Umuarama

         /\_/\                          __
        ( o.o )                     (___()'`;
         > ^ <                      /,    /`
                                    \\"--\\

   ♥  caring for street cats and dogs in Umuarama, PR  ♥

   ─────────────────────────────────────────────────
      In loving memory of Luna (c. 2021 - 2025)  ♥
   ─────────────────────────────────────────────────

EOF
  printf '\033[0m'
}

command -v docker >/dev/null || fail "docker not found in PATH"
command -v node   >/dev/null || fail "node not found in PATH"
command -v npm    >/dev/null || fail "npm not found in PATH"

# Make sure backend .env exists (Prisma + docker compose read it)
if [ ! -f "$BACKEND_DIR/.env" ]; then
  info "Creating backend/.env from .env.example"
  cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
fi

# Install deps if missing
if [ ! -d "$BACKEND_DIR/node_modules" ]; then
  info "Installing backend deps"
  (cd "$BACKEND_DIR" && npm install)
fi
if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
  info "Installing frontend deps"
  (cd "$FRONTEND_DIR" && npm install)
fi

# Bring up Postgres
info "Starting Postgres (docker compose up -d)"
(cd "$BACKEND_DIR" && docker compose up -d)

# Wait until Postgres accepts connections
info "Waiting for Postgres to be ready"
for i in {1..30}; do
  if docker exec postgres-dev-saau pg_isready -U local_user -d saau_dev >/dev/null 2>&1; then
    info "Postgres is ready"
    break
  fi
  sleep 1
  [ "$i" = 30 ] && fail "Postgres did not become ready in 30s"
done

# Prisma client + migrations
info "Generating Prisma client"
(cd "$BACKEND_DIR" && npx prisma generate >/dev/null)
info "Applying Prisma migrations"
(cd "$BACKEND_DIR" && npx prisma migrate deploy)

print_banner
sleep 3

BACK_PID=""
FRONT_PID=""
cleanup() {
  info "Shutting down dev processes"
  [ -n "$BACK_PID"  ] && kill "$BACK_PID"  2>/dev/null || true
  [ -n "$FRONT_PID" ] && kill "$FRONT_PID" 2>/dev/null || true
  wait 2>/dev/null || true
  info "Done. Postgres container left running. Stop with: (cd backend && npm run services:stop)"
}
trap cleanup EXIT INT TERM

info "Starting backend (NestJS, watch mode) on http://localhost:3000"
(cd "$BACKEND_DIR" && npx nest start --watch) &
BACK_PID=$!

info "Starting frontend (Vite) on http://localhost:5173"
(cd "$FRONTEND_DIR" && npm run dev -- --clearScreen false) &
FRONT_PID=$!

info "Backend pid=$BACK_PID  Frontend pid=$FRONT_PID  (Ctrl+C to stop)"
wait -n "$BACK_PID" "$FRONT_PID"
