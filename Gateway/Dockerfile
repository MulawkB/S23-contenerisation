FROM node:20

WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install

EXPOSE 9001
CMD ["node", "server.js"]