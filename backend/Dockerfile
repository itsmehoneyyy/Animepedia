# 📦 ใช้ Python slim image ที่เบาและเร็ว
FROM python:3.11-slim

# ⚙️ ตั้ง working directory ใน container
WORKDIR /app

# 🧾 Copy requirements.txt จาก backend มาติดตั้งก่อน
COPY requirements.txt .

# 🚀 ติดตั้ง dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# 📁 Copy โค้ด backend ทั้งหมด (รวม animeproject, animeapp, users, etc.)
COPY . .

# 🌍 เปิดพอร์ต 8000 สำหรับ Render ตรวจเจอ
EXPOSE 8000

# 🕒 รอ database, migrate, แล้วรัน server
CMD ["sh", "-c", "python wait_for_db.py && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
