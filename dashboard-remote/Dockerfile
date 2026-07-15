FROM node:20-alpine AS dependencies

WORKDIR /app

COPY dashboard-remote/package.json dashboard-remote/package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY dashboard-remote/package.json dashboard-remote/package-lock.json ./
COPY dashboard-remote/next-env.d.ts dashboard-remote/next.config.mjs dashboard-remote/tsconfig.json ./
COPY dashboard-remote/public ./public
COPY dashboard-remote/src ./src

ARG NEXT_PUBLIC_API_MOCKING=enabled

ENV NEXT_PUBLIC_API_MOCKING=$NEXT_PUBLIC_API_MOCKING \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3001

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

CMD ["node", "server.js"]
