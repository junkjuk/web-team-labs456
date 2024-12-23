FROM node:17

WORKDIR /usr/src/logger

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3200

CMD ["npm", "start"]
