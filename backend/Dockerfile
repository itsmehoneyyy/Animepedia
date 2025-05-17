FROM python:3.11-slim

WORKDIR /app

# ✅ Copy requirements.txt จาก backend
COPY requirements.txt .

# ✅ ติดตั้ง dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# ✅ Copy โค้ดทั้งหมดใน backend เข้า /app
COPY . .

# ✅ Run Django commands
CMD ["sh", "-c", "python wait_for_db.py && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
