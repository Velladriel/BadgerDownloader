#!/bin/sh
cd /app || exit

set -a
[ -f /app/.env ] && . /app/.env
set +a

exec /usr/local/bin/python3 cookie_generator.py