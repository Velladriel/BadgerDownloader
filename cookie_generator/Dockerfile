FROM python:3.12-slim
ENV DEBIAN_FRONTEND=noninteractive



RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      cron \
      ca-certificates \
      wget \
      libglib2.0-0 \
      libnspr4 \
      libnss3 \
      libdbus-1-3 \
      libatk1.0-0 \
      libatk-bridge2.0-0 \
      libcups2 \
      libdrm2 \
      libexpat1 \
      libx11-6 \
      libxcomposite1 \
      libxdamage1 \
      libxext6 \
      libxfixes3 \
      libxrandr2 \
      libgbm1 \
      libxcb1 \
      libxkbcommon0 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY .env .
COPY cookie_generator.py .
COPY run.sh .

COPY cookie-cron /etc/cron.d/cookie-cron
RUN chmod 0644 /etc/cron.d/cookie-cron \
 && chmod +x        run.sh \
 && touch /var/log/cron.log

RUN playwright install --with-deps chromium

ENTRYPOINT ["./run.sh"]