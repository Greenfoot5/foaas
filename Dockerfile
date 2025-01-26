FROM node:10-alpine

WORKDIR /usr/src/app

# USER 1004

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

EXPOSE 2053

USER 1004

CMD [ "node", "lib/server.js" ]
