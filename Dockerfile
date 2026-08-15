FROM node:20-bullseye

WORKDIR /app

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ .

COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

EXPOSE 5173

ENTRYPOINT ["/docker-entrypoint.sh"]