## Animepedia
Animepedia (อนิเมะพีเดีย) เว็บไซต์รวมรวบข้อมูลอนิเมะและแพลตฟอร์มดูอนิเมะในไทย

# Animepedia Backend & Frontend

## Setup (ครั้งแรกของแต่ละเครื่อง)
1. git clone https://github.com/itsmehoneyyy/Animepedia ,cd Animepedia
2. cd backend && python -m venv venv && venv\Scripts\activate
3. pip install -r requirements.txt
4. cd ../frontend && npm install
5. cd .. (root)
6. docker compose up -d

## พัฒนา & ทดสอบ
- เข้าหน้า Dev:
  - Backend: http://localhost:8000
  - Backend-admin: http://localhost:8000/admin/
  - Frontend: http://localhost:3000


git init
git remote add origin https://github.com/itsmehoneyyy/Animepedia.git
git pull origin main --allow-unrelated-histories
git remote -v

git add .
git commit -m "Initial commit for Animepedia fullstack project"
git branch -M main
git push -u origin main

docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate

