import os
import time
import psycopg2
import dj_database_url

print("⏳ Waiting for PostgreSQL to become available...")

# Parse DATABASE_URL from environment variable
db_config = dj_database_url.parse(os.environ.get("DATABASE_URL"))

while True:
    try:
        conn = psycopg2.connect(
            dbname=db_config['NAME'],
            user=db_config['USER'],
            password=db_config['PASSWORD'],
            host=db_config['HOST'],
            port=db_config['PORT']
        )
        conn.close()
        print("✅ PostgreSQL is available! Proceeding...")
        break
    except psycopg2.OperationalError:
        print("❌ PostgreSQL unavailable, waiting 1 second...")
        time.sleep(1)
