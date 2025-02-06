FROM node:22-alpine AS builder

WORKDIR /app

# ENV PATH=/app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
COPY . .

ENV FIREBASE_API_DOMAIN=next-bus-67f78.firebaseapp.com
ENV FIREBASE_API_KEY=AIzaSyB9UOLud9wkXZNgQSoKr36j03W4axSq6QI
ENV FIREBASE_PROJECT_ID=next-bus-67f78
ENV FIREBASE_STORAGE_BUCKET=next-bus-67f78.firebasestorage.app
ENV FIREBASE_MESSAGING_SENDER_ID=416876094817
ENV FIREBASE_APP_ID=1:416876094817:web:dbac8ab5a44ac0656c5120
ENV FIREBASE_MEASUREMENT_ID=G-7ZNCHFG6KX

RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn --silent --inline-builds

RUN yarn run build

CMD ["yarn", "serve", "--port", "3000"]

# Use a lightweight HTTP server
FROM node:22-alpine
WORKDIR /app
RUN yarn global add serve
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

CMD ["serve", "-s", "dist", "-l", "3000"]


# FROM nginx:1.27-alpine

# ARG BUILD_ENV

# WORKDIR /var/www

# COPY --from=builder /app/dist /var/www
# COPY nginx/nginx.${BUILD_ENV:-dev}.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
