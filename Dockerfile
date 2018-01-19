FROM daocloud.io/node:8.5-alpine

MAINTAINER yuliang <yu.liang@freelog.com>

RUN mkdir -p /data/freelog-node-web

WORKDIR /data/freelog-node-web

COPY . /data/freelog-node-web

RUN npm install

#ENV
#VOLUME ['/opt/logs','/opt/logs/db','/opt/logs/koa','/opt/logs/track']

ENV NODE_ENV test
ENV EGG_SERVER_ENV test
ENV PORT 7777

EXPOSE 7777

CMD [ "npm", "start" ]
