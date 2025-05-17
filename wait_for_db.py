import os
import time
import psycopg2

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'animeproject.settings')

import django
from django.db import connections
from django.db.utils import OperationalError

django.setup()

print("Waiting for PostgreSQL to be available...")

while True:
    try:
        conn = connections['default']
        conn.cursor()
        break
    except OperationalError:
        print("PostgreSQL unavailable, waiting 1 second...")
        time.sleep(1)

print("PostgreSQL is ready!")
