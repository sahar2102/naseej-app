# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Only copy production dependencies and the built dist folder
COPY --from=build /app/package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3000

# Non-root user for security
USER node

CMD ["node", "dist/main"]
