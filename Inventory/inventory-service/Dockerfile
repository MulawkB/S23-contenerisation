FROM node:20

WORKDIR /app

COPY package*.json ./
COPY . .
RUN ls -la /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]