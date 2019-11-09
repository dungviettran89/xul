#!/usr/bin/env bash
set -e
cd ..
if docker start grid-server-database; then
    echo "MariaDB started";
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
docker run --name k8s-cucumber-grid-2 --network=grid-server --sig-proxy=true k8s-cucumber-grid:dev &
docker run --name k8s-cucumber-grid-1 --network=grid-server --sig-proxy=true -p 6080:6080 -p 8080:8080  k8s-cucumber-grid:dev &
wait
