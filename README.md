# TeamD

# Setup
```
git clone 
```

### Docker
Docker Desktop
 - https://docs.docker.com/desktop/
docker-compose 3.8

```
docker -v
Docker version 19.03.12, build 48a66213fe

docker-compose -version
docker-compose version 1.26.2, build eefe0d31
```

### docker-compose
```
make docker-compose/build
make docker-compose/up
```

### mysql
```
make mysql/init
make mysql/client
```

### migration
```
make flyway/baseline
make flyway/migrate
make flyway/info
```

### api
```
curl -v http://localhost:1996/ping
>pong
```

### close
```
make docker-compose/down
```
