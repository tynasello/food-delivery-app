# dev

FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build