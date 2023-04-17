# Set base image
FROM node:16.20-alpine3.16
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json package-lock.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy Next.js application files
COPY . .

# Build the application
RUN yarn build

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Expose the port
EXPOSE 3000

# Start the application on container startup
CMD ["yarn", "start"]
