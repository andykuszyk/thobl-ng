FROM node:8.11.2-jessie
COPY ./dist/thoughtspace/* app/dist/thoughtspace/
COPY ./api/* app/api/
COPY ./package.json app/
WORKDIR app
RUN npm install
EXPOSE 8080
CMD node ./api/api.js

