# from base image node 15.6.1
FROM node:16-slim

RUN mkdir -p ./app

WORKDIR ./app

COPY ./back-end/package.json ./
COPY ./back-end/package-lock.json ./

# install all dependencies
CMD ["npm", "install"]

# fix npm install not working


# copy oter files as well
COPY ./back-end/ ./

#expose the port
EXPOSE 3000


# command to run when intantiate an image
RUN npm run build

RUN ls dist