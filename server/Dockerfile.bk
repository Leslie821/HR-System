FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --legacy-peer-deps --prod && rm -rf ~/.npm/_cacache
COPY . .
EXPOSE 3000
CMD cd dist && \
    ls &&  \
    npx knex migrate:latest &&\
    npx knex seed:run &&\
    cd .. && \
    node dist/main.js