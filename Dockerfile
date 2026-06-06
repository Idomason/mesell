FROM node:lts-alphine

WORKDIR /app

COPY package*.json ./

COPY frontend/package.json frontend/
RUN pnpm run setup-client --only=production

COPY backend/package.json backend/
RUN pnpm run setup-server --only=production

COPY frontend/ frontend/

RUN pnpm --prefix frontend build

COPY backend/ backend/

USER node

CMD [ "pnpm", "start", "--prefix", "backend" ]

EXPOSE 8000