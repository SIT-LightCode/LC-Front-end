FROM node:18-alpine3.14 as build
RUN ls
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.25.3-alpine3.18 as production-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
