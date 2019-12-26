#!/usr/bin/env bash
set -e
cd ..
if docker start xul-database; then
    echo "MariaDB is running";
else
    docker network create --driver bridge xul-network || true
    docker run --name xul-database \
    -d --network=xul-network \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=automation \
    -e MYSQL_USER=automation \
    -e MYSQL_PASSWORD=automation \
    -e MYSQL_DATABASE=automation \
    mariadb:10.4 || true
    timeout 5m docker logs -f xul-database || true
fi
docker rm -f xul-server-1 xul-server-2  || true
docker build -f docker/xul-server/xul-server.dockerfile -t xul-server:dev .

export SHARED_PARAMS=" -e db_host=xul-database --network=xul-network "
docker run ${SHARED_PARAMS} --name xul-server-2 xul-server:dev &
docker run ${SHARED_PARAMS} --name xul-server-1 -p 8080:8080 xul-server:dev &
sleep 30m
docker rm -f xul-server-1 xul-server-2  || true
