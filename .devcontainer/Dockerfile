# Multi-platform support für ARM64 (Apple Silicon) und AMD64
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/vscode/devcontainers/javascript-node:18

# Install additional tools (ARM-kompatibel)
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Expose ports for development
EXPOSE 3000 5000 8000