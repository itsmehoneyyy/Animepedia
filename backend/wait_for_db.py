import os
import time
import psycopg2
from urllib.parse import urlparse

# อ่าน URL จาก ENV
DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    # fallback local (docker-compose) ถ้าอยากก็ define ไว้ใน .env หรือตรงนี้ก็ได้
    # ตัวอย่าง: postgres://myuser:mypassword@db:5432/mydb
    DATABASE_URL = os.getenv("LOCAL_DATABASE_URL")
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL or LOCAL_DATABASE_URL not set")

# parse URL
result   = urlparse(DATABASE_URL)
dbname   = result.path.lstrip("/")
user     = result.username
password = result.password
host     = result.hostname
port     = result.port or 5432

print(f"Waiting for PostgreSQL at {host}:{port}…")

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
        print("PostgreSQL unavailable, waiting 1s…", e)
        time.sleep(1)
