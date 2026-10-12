# Build Stage
FROM node:21-alpine3.18 AS build_image
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build


# Production Stage
FROM node:21-alpine3.18 AS PRODUCTION_STAGE
WORKDIR /app
COPY --from=build_image /app/package*.json ./
COPY --from=build_image /app/.next ./.next
COPY --from=build_image /app/public ./public
COPY --from=build_image /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 5050
CMD ["npm", "start"]
