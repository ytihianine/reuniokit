# Build Stage
FROM node:26-alpine3.23 AS BUILD_IMAGE
WORKDIR /app
ARG NPM_PROXY_URL=""
COPY package*.json ./
RUN if [ -n "$NPM_PROXY_URL" ]; then npm config set proxy "$NPM_PROXY_URL"; fi
RUN npm i
COPY . .
RUN npm run build


# Production Stage
FROM node:26-alpine3.23 AS PRODUCTION_STAGE
WORKDIR /app
COPY --from=BUILD_IMAGE /app/package*.json ./
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 5050
CMD ["npm", "start"]
