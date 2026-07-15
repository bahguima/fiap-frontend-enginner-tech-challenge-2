FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY next-env.d.ts next.config.mjs tsconfig.json ./
COPY public ./public
COPY src ./src

ARG DASHBOARD_REMOTE_URL=http://dashboard-remote:3001
ARG NEXT_PUBLIC_API_URL=/api
ARG NEXT_PUBLIC_API_MOCKING=enabled
ARG NEXT_PUBLIC_MSW_SCENARIO=success
ARG NEXT_PUBLIC_MSW_DELAY_MS=300

ENV DASHBOARD_REMOTE_URL=$DASHBOARD_REMOTE_URL \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_API_MOCKING=$NEXT_PUBLIC_API_MOCKING \
    NEXT_PUBLIC_MSW_SCENARIO=$NEXT_PUBLIC_MSW_SCENARIO \
    NEXT_PUBLIC_MSW_DELAY_MS=$NEXT_PUBLIC_MSW_DELAY_MS \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
