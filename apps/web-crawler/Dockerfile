FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV NODE_ENV=production
RUN npm run build
CMD ["node", "dist/crawler.js"]
