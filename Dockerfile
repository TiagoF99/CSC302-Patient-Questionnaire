FROM node:14

WORKDIR /main

COPY . .

RUN npm run install-all

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000
EXPOSE 8080

CMD ["npm", "run", "server"]