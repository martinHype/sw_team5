FROM node:18.14.2-alpine3.17 as builder-stage

WORKDIR /usr/src/frontend
RUN mkdir /usr/src/frontend/node_modules
RUN mkdir /usr/src/frontend/node_modules/.cache

RUN chmod -R 777 /usr/src/frontend/node_modules

COPY ./frontend/package*.json ./
RUN npm install

RUN npm install axios
RUN npm install react-router-dom
RUN npm install date-fns

RUN npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
RUN npm install styled-components
RUN npm install react-select


FROM node:18.14.2-alpine3.17
USER node

WORKDIR /usr/src/frontend
COPY --chown=node:node --from=builder-stage /usr/src/frontend/node_modules ./node_modules
RUN chmod -R 777 /usr/src/frontend/node_modules
COPY ./frontend .

CMD ["npm", "run", "dev"]