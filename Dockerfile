#Parent Image - bullseye-slim is a slim and lightweight and well supported node image
FROM node:18.16.0-bullseye-slim as build

#Prepare Environment
RUN apt-get -y update && apt-get install -y --no-install-recommends dumb-init

#Working Directory in container
WORKDIR /usr/src/app

#Copy source code in current directory to /app directory
COPY --chown=node:node . .

#Building Application
RUN npm install -g @angular/cli@latest
RUN npm install
RUN npm run build:web

#Switch from root to node user
USER node

#Run application when container launches
#dumb-init is used to prevent nodejs from running on PID 1
#exposing 8080 to aid in inter-container communication
EXPOSE 8080 
CMD  ["dumb-init", "node", "app.js"]

#IF using NGINX - Copy production build to NGINX directory
#FROM nginx:alpine
#COPY --from=node /app/www /usr/share/nginx/html

