FROM node:17-bullseye-slim

# create the directory inside the container
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./
COPY tsconfig*.json ./

RUN yarn install --silent


# copy the generated modules and all other files to the container
COPY . .

RUN yarn build

# our app is running on port 4173 within the container, so need to expose it
EXPOSE 4173
ENV NODE_ENV=production
# the command to start our app
CMD ["yarn", "serve", "--host"]