FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/prod/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080 80 443
CMD ["nginx", "-g", "daemon off;"]
