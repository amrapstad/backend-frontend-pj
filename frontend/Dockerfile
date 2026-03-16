# Stage 1: Build
# Transforming source code into optimised static files ready for production
FROM node:22-alpine AS builder
 
WORKDIR /app
 
# Installing dependencies first
COPY package.json package-lock.json ./
RUN npm ci
 
# Copy source and build
COPY . .
RUN npm run build
 
# Stage 2: Serve
# Making static files available over HTTP so a browser can request them.
FROM nginx:1.27-alpine AS runner
 
# Remove default nginx config and replace with a production-ready one
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
 
# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
 
EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]


# Node, npm, Vite, React plugins is unnecessary once the files are produced. The final image only needs Nginx
# Throw away all the build tooling, only need the output.