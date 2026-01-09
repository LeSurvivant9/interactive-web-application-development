FROM oven/bun:1 AS base
WORKDIR /app

# 1. Install Dependencies
# On copie les configs racine pour les workspaces
COPY package.json bun.lock ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

RUN bun install --frozen-lockfile

# 2. Build
COPY backend ./backend
COPY tsconfig.json ./
WORKDIR /app/backend
RUN bun run build

# 3. Production Image
FROM oven/bun:1-alpine
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/backend/dist ./dist
COPY --from=base /app/backend/package.json ./

CMD ["bun", "run", "dist/main.js"]