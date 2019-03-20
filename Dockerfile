FROM node:lts-alpine

# Set environment variables
ENV NODE_WORKDIR /usr/src/app
ENV NODE_ENV production

# Create app directory
RUN mkdir -p $NODE_WORKDIR
WORKDIR $NODE_WORKDIR
ADD . $NODE_WORKDIR

# Bundle app source
RUN npm install
RUN npm run build

CMD ["npm", "start"]
