FROM node:12-alpine

ADD package.json /app/
ADD package-lock.json /app/

WORKDIR /app

RUN npm install

ADD . /app

EXPOSE 3000

CMD npm run dev