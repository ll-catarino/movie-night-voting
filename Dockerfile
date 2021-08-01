FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

run npm ci --only=production

COPY . .

RUN echo "PORT=3000" >> .env

EXPOSE 3000

CMD ["node", "index.js"]