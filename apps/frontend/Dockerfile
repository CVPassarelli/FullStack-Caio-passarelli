FROM node:20

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
