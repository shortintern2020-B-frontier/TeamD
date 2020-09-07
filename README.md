# TeamD

# Setup
```
git clone https://github.com/shortintern2020-B-frontier/TeamD.git
```

### Docker
Dockerのインストール
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

api, migration, databaseのそれぞれのコンテナが立つ
```
database | ready for connections.
migration | migration exited with code 0
api | sever.go:38: Listening on port 1996
```
のように表示されれば正常に起動が成功している

### mysql
```
make mysql/init
```

```
make mysql/client
show databases
```

### migration
```
make flyway/baseline
make flyway/migrate
make flyway/info
```
現在のバージョン(databaseディレクトリ下の.sqlファイル)
までsuccessとなれば成功

### api
```
curl -v http://localhost:1996/ping
>pong
```

### close
```
make docker-compose/down
```

# Other
サービスに入る
```
docker-compose exec "サービス名" "シェル"
e.g. docker-compose exec api sh
```
これでGoやmysqlの実行環境に入れる