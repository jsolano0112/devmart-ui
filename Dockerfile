FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

ENV REACT_APP_DEVMART_API=/api/v1/
ENV REACT_APP_USERS_API=/api/v1/
ENV REACT_APP_NOTIFICATIONS_API=/api/v1/
ENV REACT_APP_SOCKET_SERVER_URL=http://localhost:4000

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]