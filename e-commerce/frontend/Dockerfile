FROM nikolaik/python-nodejs AS build

WORKDIR /build
COPY . .

RUN npm install sharp
RUN npm install
RUN npm install next
RUN npm run build

FROM node:current-alpine AS production
ENV NODE_ENV=development
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public

EXPOSE 3000
CMD ["npm", "run", "dev"]

