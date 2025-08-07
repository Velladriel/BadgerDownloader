# ─── Build-Stage ───────────────────────────────────────

FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}
RUN npm run build

# ─── Runtime-Stage ─────────────────────────────────────

FROM nginx:alpine
# Hier anpassen, wenn dein Build nach "build/" geht statt "dist/"
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
