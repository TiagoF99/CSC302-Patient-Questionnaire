FROM node:14
ARG PORT
ARG FHIR_API

WORKDIR /main

COPY . .

RUN npm run install-all

RUN npm run build

ENV NODE_ENV production

EXPOSE $PORT

CMD ["npm", "run", "server"]