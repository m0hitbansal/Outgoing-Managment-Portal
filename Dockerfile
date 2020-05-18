FROM node:latest

WORKDIR /Outgoing

ADD . /Outgoing

RUN npm install express
RUN npm install express-session
RUN npm install node-cron
RUN npm install nodemailer
RUN npm install body-parser
RUN npm install mocha
RUN npm install chai
RUN npm install cors
RUN npm install mysql
RUN npm install multer
RUN npm install formidable
RUN npm install nodemon

EXPOSE 5555
ENTRYPOINT ["node","server2.js"]
