#!/usr/bin/env bash
preparedb(){
    MYSQL="mysql -uroot -h127.0.0.1 test -e"
    until ${MYSQL} "FLUSH PRIVILEGES;"; do sleep 5; done
    ${MYSQL} "CREATE DATABASE presta_demo;"
    ${MYSQL} "CREATE USER 'presta_demo'@'localhost' IDENTIFIED BY 'presta_demo';"
    ${MYSQL} "GRANT ALL PRIVILEGES ON *.* TO 'presta_demo'@'localhost';"
}
preparedb && /tmp/docker_run.sh &
timeout 24h ./mysql.sh
