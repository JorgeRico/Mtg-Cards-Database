# Node + Express + Vue + MySQL + Docker Compose
A project that runs a Express server and Vue-CLI with two separate containers, server and client, using Docker Compose.

# config
# first time need node_modules on /client
```
nom install
```

# run docker build
```
docker-compose build
```

# launch docker
```
docker-compose up -d
```

## Client ports
```
ports: 
     - "8080:8080"
```
The client server is spun up at localhost:8080.

## Server ports
```
ports: 
     - "3000:3000"
```
The server is spun up at localhost:3000.


## Front
http://localhost:8080/

## PhpMyAdmin
http://localhost:18080/