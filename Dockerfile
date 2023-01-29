FROM node:16.17.0
RUN yarn global add serve
RUN mkdir ./build
COPY ./build ./build
EXPOSE 3000

ENTRYPOINT ["serve", "-s", "build"]
