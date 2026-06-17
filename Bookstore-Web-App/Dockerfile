FROM node:20

WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install

EXPOSE 8082
CMD ["node", "app.js"]