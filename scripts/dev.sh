#!/usr/bin/env bash
set -e
cd ..
if docker start grid-server-database; then
    echo "MariaDB is running";
else
    docker network create --driver bridge grid-server || true
    docker run --name grid-server-database \
    -d --network=grid-server \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=automation \
    -e MYSQL_USER=automation \
    -e MYSQL_PASSWORD=automation \
    -e MYSQL_DATABASE=automation \
    mariadb:10.4 || true
    timeout 5m docker logs -f grid-server-database
fi
docker rm -f k8s-cucumber-grid-1 k8s-cucumber-grid-2  || true
docker build -f docker/Dockerfile -t k8s-cucumber-grid:dev .

_term() {
  echo "Stopping all child!"
  docker rm -f k8s-cucumber-grid-1 k8s-cucumber-grid-2  || true
  exit 1
}

trap _term SIGTERM
export SHARED_PARAMS=" -e db_host=grid-server-database --network=grid-server "
docker run ${SHARED_PARAMS} --name k8s-cucumber-grid-2 k8s-cucumber-grid:dev &
docker run ${SHARED_PARAMS} --name k8s-cucumber-grid-1 -p 6080:6080 -p 8080:8080 k8s-cucumber-grid:dev &
wait
