FROM node:alpine

RUN mkdir -p /usr/src/app

ENV PORT 3000

WORKDIR /usr/src/app

COPY supabase_task/package.json /usr/src/app
COPY supabase_task/package-lock.json /usr/src/app

RUN npm install

COPY supabase_task/. /usr/src/app

ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SUPABASE_URL

RUN npm run build

ENTRYPOINT ["npm", "start"]
EXPOSE 3000
