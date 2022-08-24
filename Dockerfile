FROM node:alpine

RUN mkdir /porte-feuille-backend

COPY . SPF-Backend
WORKDIR /SPF-Backend

RUN npm install -D nodemon
RUN npm install

CMD ["npm", "start"]
