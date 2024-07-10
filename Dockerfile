FROM --platform=linux/amd64 node:22-alpine as node
RUN set -x \
    && apk update \
    && apk upgrade
RUN apk add -f
RUN apk add --no-cache \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

FROM node as development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run build:database
RUN npm run build:templates

FROM node as base
WORKDIR /app
COPY package*.json ./
COPY --from=development /app/dist ./
RUN npm install --only=production
USER root
CMD [ "node", "main" ]

FROM base as production
COPY ./.env.prod ./.env
