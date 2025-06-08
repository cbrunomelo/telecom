# Stage 1: Build
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2: Serve with Node.js
FROM node:20-alpine

WORKDIR /app

# Instalar serve globalmente para servir arquivos estáticos
RUN npm install -g serve

# Copiar arquivos buildados
COPY --from=build /app/dist/telecom-frontend ./dist

# Expor porta 4200
EXPOSE 4200

# Comando para servir a aplicação
CMD ["serve", "-s", "dist", "-l", "4200"] 