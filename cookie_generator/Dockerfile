FROM mcr.microsoft.com/playwright/python:v1.54.0

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /app


COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN playwright install chromium


COPY .env .
COPY cookie_generator.py .
COPY run.sh .
COPY cookie-cron /etc/cron.d/cookie-cron


RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      cron \
      ca-certificates \
      wget \
 && rm -rf /var/lib/apt/lists/*


RUN chmod 0644 /etc/cron.d/cookie-cron \
 && chmod +x /app/run.sh \
 && touch /var/log/cron.log \
 && mkdir -p /app/cookies


ENTRYPOINT ["./run.sh"]


