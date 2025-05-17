FROM python:3.13.3-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

# ย้าย startCommand มาที่นี่แทน
CMD ["sh", "-c", "python wait_for_db.py && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
