FROM node:alpine

RUN mkdir -p /opt/api

WORKDIR /opt/api

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]