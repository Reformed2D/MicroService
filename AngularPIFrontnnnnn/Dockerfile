# Stage 1: Build the Angular application
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the Angular app's source code
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Stage 2: Serve the application
FROM nginx:alpine

# Copy built files from the previous stage to the Nginx HTML directory
COPY --from=build /app/dist/AngularPIFrontnnnnn /usr/share/nginx/html

# Expose port 80 for serving the app
EXPOSE 80
