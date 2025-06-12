# ======================
# 1. Build Stage
# ======================
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependencies file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the Next.js app
RUN npm run build

# ============================
# 2. Production Stage
# ============================
FROM node:22-alpine AS runner

WORKDIR /app

# Set environment variable
ENV NODE_ENV=production

# Copy only the necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
