# Dockerfile (root level)
FROM python:3.11-slim AS backend

WORKDIR /backend

COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt
COPY backend/ .

# build frontend separately
FROM node:18-alpine AS frontend

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# combine everything in final stage
FROM python:3.11-slim AS final

WORKDIR /app

# copy backend
COPY --from=backend /backend /app

# copy frontend static build (optional)
COPY --from=frontend /frontend/.next /app/frontend/.next
COPY --from=frontend /frontend/public /app/frontend/public

EXPOSE 8000

CMD ["sh", "-c", "python wait_for_db.py && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
