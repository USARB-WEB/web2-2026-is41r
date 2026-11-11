# Use a more specific and secure base image
FROM node:22-alpine AS base

# Set working directory
WORKDIR /app

# Install dumb-init for proper signal handling, openssl for crypto support, and su-exec for user switching
RUN apk add --no-cache dumb-init openssl netcat-openbsd su-exec

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copy package files first for better layer caching
COPY --chown=nestjs:nodejs package*.json ./

###################
# DEVELOPMENT
###################
FROM base AS development

# Install all dependencies (including dev dependencies)
RUN npm ci --only=development

# Copy source code
COPY --chown=nestjs:nodejs . .

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "start:dev"]

###################
# BUILD
###################
FROM base AS build

# Install all dependencies
RUN npm ci

# Copy source code
COPY --chown=nestjs:nodejs . .

# Build the application
RUN npm run build

# Remove dev dependencies and clean cache
RUN npm prune --production && \
    npm cache clean --force

###################
# PRODUCTION
###################
FROM base AS production

# Set NODE_ENV
ENV NODE_ENV=production

# Copy only production dependencies and built application
COPY --chown=nestjs:nodejs --from=build /app/node_modules ./node_modules
COPY --chown=nestjs:nodejs --from=build /app/dist ./dist
COPY --chown=nestjs:nodejs --from=build /app/package*.json ./

# Create collector directories and input directory
RUN mkdir -p /app/data/input \
    && mkdir -p /app/data/uploads \
    && chown -R nestjs:nodejs /app/data

# Don't switch to non-root user yet - docker-entrypoint.sh will handle it
# This allows fixing permissions on mounted volumes

# Expose port
EXPOSE 3000

# Health check (will run as nestjs user after entrypoint)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the production application and forward container signals correctly
CMD ["dumb-init", "node", "dist/main.js"]

  