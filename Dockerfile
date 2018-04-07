FROM node:latest
WORKDIR /usr/src/app
COPY backend/package.json .
COPY backend/package-lock.json .
RUN npm install
COPY backend/bin bin
COPY backend/server.js server.js
CMD [ "npm", "start" ]