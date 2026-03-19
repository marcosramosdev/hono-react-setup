FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS build
WORKDIR /app

# Install root deps (server build uses these)
COPY package.json bun.lock ./
RUN bun install

# Install web deps (provides `tsc`/`vite` for `web` build)
COPY web/package.json web/bun.lock ./web/
WORKDIR /app/web
RUN bun install

# Build after deps are cached
WORKDIR /app
COPY . .
RUN bun run build


FROM oven/bun:1 AS release
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/web/dist ./web/dist
COPY package.json bun.lock ./
RUN bun install --production

EXPOSE 3000
CMD [ "bun", "run", "start" ]