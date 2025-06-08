# Stage 1: Build
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app


RUN npm install -g serve

COPY --from=build /app/dist/telecom-frontend ./dist

EXPOSE 4200

CMD ["serve", "-s", "dist", "-l", "4200"] 