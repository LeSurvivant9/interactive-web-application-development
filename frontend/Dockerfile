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

# Désactive la télémétrie Next pendant le build
ENV NEXT_TELEMETRY_DISABLED 1
RUN bun run build

# Utilisation d'une image plus légère pour l'exécution
FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copie des fichiers nécessaires pour le mode standalone
# https://nextjs.org/docs/pages/api-reference/next-config-js/output#standalone
COPY --from=base /app/frontend/public ./frontend/public
COPY --from=base /app/frontend/.next/standalone ./
COPY --from=base /app/frontend/.next/static ./frontend/.next/static

EXPOSE 3000
# Le port par défaut de Next.js standalone est 3000, mais il peut être configuré via PORT
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["bun", "run", "frontend/server.js"]