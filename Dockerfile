FROM node:7.4.0

RUN mkdir -p /docker/picalendr
COPY . /docker/picalendr
WORKDIR /docker/picalendr

RUN npm install

ENV TZ=CET
ENV CI=true
RUN npm test

RUN npm run build

RUN npm install -g pushstate-server
CMD [ "pushstate-server", "build", "3001" ]

