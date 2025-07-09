FROM node:22.17.0
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build
RUN npm add -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]