import os
import time
import psycopg2
from urllib.parse import urlparse

# 1) พยายามอ่าน DATABASE_URL (Render จะเซ็ตให้)
DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    # parse URL
    result   = urlparse(DATABASE_URL)
    host     = result.hostname
    port     = result.port or 5432
    user     = result.username
    password = result.password
    dbname   = result.path.lstrip("/")
else:
    # 2) ถ้ารัน local/docker-compose ให้ใช้ DB_* แทน
    host     = os.getenv("DB_HOST", "db")
    port     = int(os.getenv("DB_PORT", 5432))
    user     = os.getenv("DB_USER", "myuser")
    password = os.getenv("DB_PASSWORD", "mypassword")
    dbname   = os.getenv("DB_NAME", "mydb")

print(f"Waiting for PostgreSQL at {host}:{port}/{dbname} …")

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
        print(f"PostgreSQL unavailable, waiting 1s… ({e})")
        time.sleep(1)
