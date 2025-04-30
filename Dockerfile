# Node Base Image
FROM node:16-alpine

#Working Directry
WORKDIR /node

#Copy the Code
COPY . .

#Install the dependecies
RUN npm install
RUN npm run test
EXPOSE 3000

#Run the code
CMD ["node","index.js"]
