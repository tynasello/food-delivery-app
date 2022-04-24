# dev

FROM node:17-alpine as development

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .

RUN npm install
RUN npm install react-scripts@3.4.1 -g 

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]