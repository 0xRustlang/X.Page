FROM node:lts-alpine AS build-env

# Set environment variables
ENV NODE_WORKDIR /usr/src/app

# Create app directory
RUN mkdir -p $NODE_WORKDIR
WORKDIR $NODE_WORKDIR
ADD . $NODE_WORKDIR

# Bundle app source
RUN npm install
RUN npm run build

FROM node:lts-alpine

# Set environment variables
ENV NODE_ENV production
ENV NODE_WORKDIR /usr/src/app

# Create app directory
RUN mkdir -p $NODE_WORKDIR
WORKDIR $NODE_WORKDIR
COPY --from=build-env /usr/src/app/.nuxt $NODE_WORKDIR
COPY --from=build-env /usr/src/app/nuxt.config.js $NODE_WORKDIR
COPY --from=build-env /usr/src/app/package-lock.json $NODE_WORKDIR
COPY --from=build-env /usr/src/app/package.json $NODE_WORKDIR

# Bundle app source
RUN npm install

CMD ["npm", "start"]
