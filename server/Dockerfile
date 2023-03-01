FROM node:16-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g http-errors
COPY . .
EXPOSE 3000