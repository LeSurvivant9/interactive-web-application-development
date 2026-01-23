FROM oven/bun:1-alpine AS base
WORKDIR /app

COPY package.json bun.lock ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
COPY backend/prisma ./backend/prisma

FROM base AS build_deps
RUN bun install --frozen-lockfile

FROM oven/bun:1-alpine AS prod_deps
WORKDIR /app
COPY backend/package.json ./backend/
COPY backend/prisma ./backend/prisma
RUN cd backend && bun install --production --ignore-scripts --backend=copy

FROM build_deps AS builder
COPY backend ./backend
COPY tsconfig.json ./

RUN bunx prisma generate --schema=backend/prisma/schema.prisma

WORKDIR /app/backend
RUN bun build ./src/main.ts --outfile server.js --target=bun \
    --external "@nestjs/websockets/*" \
    --external "@nestjs/microservices/*" \
    --external "@nestjs/microservices" \
    --external "ts-morph" \
    --external "argon2" \
    --external "@apollo/subgraph" \
    --external "@apollo/gateway" \
    --external "@as-integrations/fastify" \
    --external "class-transformer/storage" \
    --external "@prisma/client" \
    --external "pino-pretty" \
    --external "pino" \
    --external "nestjs-pino" \
    --external "pino-http" \
    --external "thread-stream"

FROM oven/bun:1-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=prod_deps /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/server.js ./server.js
COPY --from=builder /app/backend/prisma ./prisma

COPY backend/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

CMD ["bun", "run", "server.js"]