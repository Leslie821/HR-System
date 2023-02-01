FROM node:lts
WORKDIR /usr/src/app
COPY . .
RUN yarn install
EXPOSE 3000
CMD cd dist && \
    ls &&  \
    yarn knex migrate:latest &&\
    yarn knex seed:run &&\
    cd .. && \
    node dist/main.js