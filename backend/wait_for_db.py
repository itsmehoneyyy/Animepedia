import os
import time
import psycopg2

# อ่านตัวแปรที่ตั้งจาก Render (DB_HOST …) หรือ local/docker-compose
host     = os.getenv("DB_HOST",     "db")
port     = int(os.getenv("DB_PORT", 5432))
user     = os.getenv("DB_USER",     "myuser")
password = os.getenv("DB_PASSWORD", "mypassword")
dbname   = os.getenv("DB_NAME",     "mydb")

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
        print(f"PostgreSQL unavailable, waiting 1s… ({e})")
        time.sleep(1)
