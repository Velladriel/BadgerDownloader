
# Build client
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Debug step: list the current directory structure
RUN ls -la /app
RUN ls -la /app/build

ENV VITE_API_BASE=http://192.168.178.70:5000

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]