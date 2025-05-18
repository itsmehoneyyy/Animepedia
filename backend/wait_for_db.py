import os
import time
import psycopg2

# 1) พยายามอ่าน DATABASE_URL ก่อน (Render จะเซ็ตให้)
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    # parse URL แต่เราไม่ต้องใช้ parse-based host อีกแล้ว
    from urllib.parse import urlparse
    result   = urlparse(DATABASE_URL)
    host     = result.hostname
    port     = result.port or 5432
    user     = result.username
    password = result.password
    dbname   = result.path.lstrip("/")
else:
    # 2) ถ้าไม่มี DATABASE_URL (Local หรือ Render ได้ ENV แยก)
    host     = os.getenv("DB_HOST", "db")
    port     = int(os.getenv("DB_PORT", 5432))
    user     = os.getenv("DB_USER", "myuser")
    password = os.getenv("DB_PASSWORD", "mypassword")
    dbname   = os.getenv("DB_NAME", "mydb")

print(f"Waiting for PostgreSQL at {host}:{port}/{dbname}…")

while True:
    try:
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port,
        )
        conn.close()
        print("PostgreSQL is ready!")
        break
    except Exception as e:
        print(f"PostgreSQL unavailable, waiting 1s… {e}")
        time.sleep(1)
