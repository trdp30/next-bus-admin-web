#!/bin/bash

# Variables
COMPOSE_FILE_URL="https://raw.githubusercontent.com/trdp30/next-bus-admin-web/refs/heads/main/docker-compose.prod.yml"
COMPOSE_FILE="docker-compose.yml"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install it first."
    exit 1
fi

# Download the docker-compose.yml file
echo "📥 Downloading Docker Compose file..."
curl -o "$COMPOSE_FILE" -s "$COMPOSE_FILE_URL"

# Run Docker Compose
echo "🚀 Starting Docker Compose..."
docker compose pull && docker compose -f docker-compose.prod.yml up -d
echo "✅ Docker Compose is running."

exit 0
