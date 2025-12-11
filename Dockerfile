#This Dockerfile uses multi-stage builds to create a production-ready React application using Nginx to serve the static files.
#This Dockerfile defines 3 stages: the first stage compiles the React application, while the second stage serves the compiled files using Nginx.
#stage 1 is NOT included in the final image. It's only used as a temporary helper assuring the final image stays lean and secure. How?:
    # 1) Docker creates a temporary build container and runs npm install and npm run build inside it
    # 2) Copies just the dist folder to the production stage
    # 3) Throws away the build container (Node.js, node_modules, source code—all gone)

# DOCKER stage 1 (Build stage)
FROM node:20.18-alpine AS build 

WORKDIR /app

# Copy node package files
COPY package*.json ./

# node Install dependencies by searching dependencies listed in package.json. 
# If a package-lock.json exists (like in this project), npm uses it to install the exact same versions every time, ensuring consistency across machines.
# npm downloads the packages from the npm registry (https://registry.npmjs.org) — a huge online database of JavaScript packages.
# The downloaded packages are stored in the node_modules folder.
RUN npm install

# Copy source files
COPY . .

# Build argument for the API key
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# Build the application
RUN npm run build

# DOCKER stage 2 (production stage)
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy !!!!not from local machine!!! but the React application compiled from previous build stage to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# DOCKER stage 3 (Development stage)
FROM node:20.18-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Expose port 5173 for Vite dev server
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev"]
