#!/bin/sh
set -e

mkdir -p /opt/app/public/uploads
chown -R strapi:strapi /opt/app/public/uploads 2>/dev/null || true

if [ "$(id -u)" = "0" ]; then
  exec su-exec strapi "$@"
fi

exec "$@"
