FROM node:20-alpine AS base

# Install PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN pnpm install turbo --global
COPY . .
RUN turbo prune @monorepo/app1 --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo build --filter=@monorepo/app1...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/app-1/next.config.mjs .
COPY --from=installer /app/apps/web/app-1/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/app-1/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/app-1/.next/static ./.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/app-1/public ./public

EXPOSE 3000
ENV PORT=3000

CMD ["node" ,"/app/apps/web/app-1/server.js"]