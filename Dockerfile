FROM node:8.1

RUN mkdir -p /docker/picalendr
COPY . /docker/picalendr
WORKDIR /docker/picalendr

RUN npm install

ENV TZ=CET
ENV CI=true
RUN npm test

RUN date > public/version.txt
RUN npm run build

RUN npm install -g pushstate-server
CMD [ "pushstate-server", "build", "3001" ]

