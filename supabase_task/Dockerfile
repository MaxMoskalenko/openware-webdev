FROM node:alpine

RUN mkdir -p /usr/src/app

ENV PORT 3000

WORKDIR /usr/src/app

COPY supabase_task/package.json /usr/src/app
COPY supabase_task/package-lock.json /usr/src/app

RUN npm install

COPY supabase_task/. /usr/src/app

RUN npm run build

ENTRYPOINT ["npm", "start"]
EXPOSE 3000
