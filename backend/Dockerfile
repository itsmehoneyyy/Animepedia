FROM python:3.13.3-slim-bookworm

WORKDIR /app

# 1) ดึงไฟล์ requirements.txt จาก folder backend/ ใน context (root)
COPY backend/requirements.txt .

# 2) ติดตั้ง dependency
RUN pip install --no-cache-dir -r requirements.txt

# 3) คัดลอกโค้ดทั้งหมดจาก backend/ มาไว้ที่ /app
COPY backend/ .

# 4) รันสคริปต์รอ DB + migrate + serve
CMD ["sh", "-c", "python wait_for_db.py && python manage.py migrate && gunicorn animeproject.wsgi:application --bind 0.0.0.0:$PORT"]

