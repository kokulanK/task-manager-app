# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build Angular app
COPY . .
RUN rm -rf node_modules/.cache
RUN npm run build --prod

# Run stage with nginx
FROM nginx:alpine
COPY --from=build /app/dist/taskmanager-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]