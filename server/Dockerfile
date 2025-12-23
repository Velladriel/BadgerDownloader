FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    ffmpeg \
    nodejs \
    npm \
    && npm install -g youtube-dl-exec \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src ./src

EXPOSE 5000

ENV PYTHONPATH=/app/src

CMD ["gunicorn", "wsgi:app", "-b", "0.0.0.0:5000"]