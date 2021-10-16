FROM node:14

ARG PORT

WORKDIR /main

COPY . .

RUN npm run install-all

RUN npm run build

ENV NODE_ENV production

EXPOSE $PORT

CMD ["npm", "run", "server"]