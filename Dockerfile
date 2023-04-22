FROM node:18.16.0-alpine

RUN mkdir -p /opt/api

WORKDIR /opt/api

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]