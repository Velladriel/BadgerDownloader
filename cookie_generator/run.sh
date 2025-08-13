#!/bin/sh
cd /app || exit

set -a
[ -f /app/.env ] && . /app/.env
set +a

python3 cookie_generator.py

cron -f
