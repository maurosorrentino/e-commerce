FROM node:12.18.3

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]