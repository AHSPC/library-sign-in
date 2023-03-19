FROM golang:alpine

RUN apk add --no-cache nodejs npm

WORKDIR /app
COPY . /app

WORKDIR /app/frontend
RUN npm i && npm run build

WORKDIR /app
RUN go mod tidy

EXPOSE 5010

CMD ["go", "run", "."]
