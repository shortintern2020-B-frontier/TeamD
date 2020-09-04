DBNAME:=teamd
DOCKER_DNS:=db
FLYWAY_CONF?=-url=jdbc:mysql://$(DOCKER_DNS):3306/$(DBNAME) -user=root -password=password

export DATABASE_DATASOURCE:=root:password@tcp($(DOCKER_DNS):3306)/$(DBNAME)

docker-compose/build:
	docker-compose build

docker-compose/up:
	docker-compose up

docker-compose/up/service:
	docker-compose up $(service)

docker-compose/down:
	docker-compose down

docker-compose/logs:
	docker-compose logs -f

DB_SERVICE:=db
mysql/client:
	docker-compose exec $(DB_SERVICE) mysql -uroot -hlocalhost -ppassword $(DBNAME)

mysql/init:
	docker-compose exec $(DB_SERVICE) \
		mysql -u root -h localhost -ppassword \
		-e "create database \`$(DBNAME)\`"

__mysql/drop:
	docker-compose exec $(DB_SERVICE) \
		mysql -u root -h localhost -ppassword \
		-e "drop database \`$(DBNAME)\`"

MIGRATION_SERVICE:=migration
flyway/info:
	docker-compose run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) info

flyway/validate:
	docker-compose run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) validate

flyway/migrate:
	docker-compose run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) migrate

flyway/repair:
	docker-compose run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) repair

flyway/baseline:
	docker-compose run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) baseline

