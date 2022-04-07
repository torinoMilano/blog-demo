FROM node:17-bullseye-slim

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# copy data store
COPY data ./

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY . .

# our app is running on port 5000 within the container, so need to expose it
EXPOSE 5000
ENV NODE_ENV=production
# the command to start our app
CMD ["npm", "start"]