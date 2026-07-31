# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev python3
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:22-alpine AS production
RUN apk add --no-cache vips-dev tini su-exec \
  && addgroup -g 1001 strapi \
  && adduser -u 1001 -G strapi -s /bin/sh -D strapi
WORKDIR /opt/app

COPY --from=build /opt/app ./
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
  && chown -R strapi:strapi /opt/app \
  && mkdir -p /opt/app/public/uploads

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

EXPOSE 1337
ENTRYPOINT ["/sbin/tini", "--", "docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
