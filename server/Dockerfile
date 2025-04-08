FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN apt-get update
RUN apt-get install ffmpeg -y


RUN pip install -r requirements.txt

COPY . .

ENV PYTHONPATH=/app/src

EXPOSE 5000

CMD ["gunicorn", "src.wsgi:app", "-b", "0.0.0.0:5000"]