FROM node:18-slim

RUN apt-get update && apt-get install -y build-essential python3

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
