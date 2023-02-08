FROM --platform=linux/amd64 node:lts-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# RUN npm install --save ...
# RUN npm install --save @nestjs/common@^9.2.1 @nestjs/core@^9.2.1 @nestjs/jwt@^10.0.1 @nestjs/mapped-types@^1.2.0 @nestjs/passport@^9.0.0 @nestjs/platform-express@^9.2.1 bcrypt@^5.1.0 cast.ts@^1.5.4 class-transformer@^0.5.1 class-validator@^0.14.0 dotenv@^16.0.3 knex@^2.3.0 nest-knexjs@^0.0.13 passport@^0.6.0 passport-jwt@^4.0.1 passport-local@^1.0.0 pg@^8.8.0 populate-env@^2.0.0 react-hook-form@^7.41.5 reflect-metadata@^0.1.13 rxjs@^7.2.0 --legacy-peer-deps
# COPY package.json .
# RUN npm install --legacy-peer-deps --prod && rm -rf ~/.npm/_cacache
COPY . .
RUN npm run build

EXPOSE 3000
CMD cd dist && \
    npx knex migrate:latest &&\
    npx knex seed:run &&\
    cd .. && \
    node dist/main.js