FROM python:3.12-slim

WORKDIR /app


RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*


COPY --from=denoland/deno:bin /deno /usr/local/bin/deno

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Force yt-dlp with default extras to handle signatures
RUN pip install --no-cache-dir --upgrade "yt-dlp[default]"

COPY src ./src

EXPOSE 5000

ENV PYTHONPATH=/app/src

CMD ["gunicorn", "wsgi:app", "-b", "0.0.0.0:5000", "--timeout", "120"]