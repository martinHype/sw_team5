FROM node:18.14.2-alpine3.17 as builder-stage

WORKDIR /usr/src/frontend
RUN mkdir /usr/src/frontend/node_modules
RUN chmod -R 777 /usr/src/frontend/node_modules

COPY ./frontend/package*.json ./
RUN npm install


FROM node:16.3.0-alpine
USER node

WORKDIR /usr/src/frontend
COPY --chown=node:node --from=builder-stage /usr/src/frontend/node_modules ./node_modules
RUN chmod -R 777 /usr/src/frontend/node_modules
COPY ./frontend .

CMD ["npm", "run", "dev"]