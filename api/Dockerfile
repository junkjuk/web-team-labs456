FROM node:17

WORKDIR /usr/src/api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3100

CMD ["npm", "start"]
