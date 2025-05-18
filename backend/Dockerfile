FROM python:3.13.3-slim-bookworm

WORKDIR /app

# 1) ดึงไฟล์ requirements จากโฟลเดอร์ backend มาที่ workdir
COPY requirements.txt .

# 2) ติดตั้ง dependency
RUN pip install --no-cache-dir -r requirements.txt

# 3) คัดลอกโค้ดทั้งหมดของ backend มาที่ container
COPY . .

# 4) คำสั่งรัน (ถ้าใช้ wait_for_db.py + migrate + runserver)
CMD ["sh", "-c", "python wait_for_db.py && python manage.py migrate && gunicorn animeproject.wsgi:application --bind 0.0.0.0:8000"]
