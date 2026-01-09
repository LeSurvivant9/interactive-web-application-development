FROM oven/bun:1 AS base
WORKDIR /app

# 1. Install Dependencies
COPY package.json bun.lock ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

RUN bun install --frozen-lockfile

# 2. Build Next.js
COPY frontend ./frontend
COPY tsconfig.json ./
WORKDIR /app/frontend
# Désactive la télémétrie Next pendant le build
ENV NEXT_TELEMETRY_DISABLED 1
RUN bun run build

# 3. Runner
FROM oven/bun:1-alpine
WORKDIR /app
ENV NODE_ENV production

COPY --from=base /app/frontend/.next ./.next
COPY --from=base /app/frontend/public ./public
COPY --from=base /app/frontend/package.json ./
COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000
CMD ["bun", "run", "start"]