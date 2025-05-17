# Dockerfile (backend)
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

# รอ DB และ migrate ก่อน start server
CMD ["sh", "-c", "python wait_for_db.py && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
