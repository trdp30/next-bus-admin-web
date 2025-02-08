# Use the base image
FROM node:22-alpine AS builder

# Install required packages
RUN apk add --no-cache \
    autoconf \
    automake \
    libtool \
    zlib-dev \
    git

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn --silent --inline-builds

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn run build

# Use nginx as the base image for the final stage
FROM nginx:1.27-alpine

# Set the working directory
WORKDIR /var/www

# Copy built files from the builder stage
COPY --from=builder /app/dist /var/www

# Define build arguments
ARG BUILD_ENV

# Copy nginx configuration file
COPY nginx/nginx.${BUILD_ENV:-dev}.conf /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
