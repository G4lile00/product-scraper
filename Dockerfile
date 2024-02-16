FROM node:18

WORKDIR /usr/src/app

COPY ./build .

RUN npm install
RUN npm run build
EXPOSE 8000
CMD [ "node", "./src/app.js" ]
