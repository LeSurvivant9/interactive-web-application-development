FROM oven/bun:1 AS base
WORKDIR /app

COPY package.json bun.lock ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
COPY backend/prisma ./backend/prisma

RUN bun install --frozen-lockfile

COPY frontend ./frontend
COPY tsconfig.json ./
WORKDIR /app/frontend

ENV NEXT_TELEMETRY_DISABLED 1
RUN bun run build

FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=base /app/frontend/public ./frontend/public
COPY --from=base /app/frontend/.next/standalone ./
COPY --from=base /app/frontend/.next/static ./frontend/.next/static

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["bun", "run", "frontend/server.js"]