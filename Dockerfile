FROM node:alpine

RUN mkdir /porte-feuille-backend

COPY . porte-feuille-backend
WORKDIR /porte-feuille-backend

RUN npm install -D nodemon
RUN npm install

CMD ["npm", "start"]
