# Use lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Build TypeScript backend
RUN npm run build

# Cloud Run expects PORT
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start backend
CMD ["node", "dist/server/index.js"]
