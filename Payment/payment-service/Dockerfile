FROM node:20

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

RUN npm run build
RUN ls -R dist

EXPOSE 3002

CMD ["npm", "start"]