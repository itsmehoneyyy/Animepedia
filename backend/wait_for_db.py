from urllib.parse import urlparse
import os, time, psycopg2

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    u = urlparse(DATABASE_URL)
    host, port = u.hostname, u.port or 5432
    user, pw = u.username, u.password
    db = u.path.lstrip("/")
else:
    # local fallback (docker-compose)
    host   = os.getenv("DB_HOST", "db")
    port   = int(os.getenv("DB_PORT", 5432))
    user   = os.getenv("DB_USER", "myuser")
    pw     = os.getenv("DB_PASSWORD", "mypassword")
    db     = os.getenv("DB_NAME", "mydb")

print(f"Waiting for PostgreSQL at {host}:{port}/{db}…")
while True:
    try:
        conn = psycopg2.connect(dbname=db, user=user, password=pw, host=host, port=port)
        conn.close()
        print("PostgreSQL is ready!")
        break
    except Exception as e:
        print(f"PostgreSQL unavailable, waiting 1s… ({e})")
        time.sleep(1)
