# FROM nikolaik/python-nodejs AS build

# WORKDIR /build
# COPY . .

# RUN npm install

# FROM node:current-alpine AS development
# ENV NODE_ENV=production

# WORKDIR /app
# COPY --from=build /build/package*.json ./
# COPY --from=build /build/node_modules ./node_modules
# COPY --from=build /build/app.js ./app.js
# COPY --from=build /build/controllers ./controllers
# COPY --from=build /build/mail ./mail
# COPY --from=build /build/models ./models
# COPY --from=build /build/routes ./routes
# COPY --from=build /build/.env ./.env

# EXPOSE 5000
# CMD ["npm", "start"]

##########
FROM node:14

WORKDIR /build
COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 5000

CMD ["npm", "start"]