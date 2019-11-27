#!/usr/bin/env bash
preparedb(){
    mysql -uroot -h127.0.0.1 test -e "FLUSH PRIVILEGES;"
    mysql -uroot -h127.0.0.1 test -e "CREATE DATABASE presta_demo;"
    mysql -uroot -h127.0.0.1 test -e "CREATE USER 'presta_demo'@'localhost' IDENTIFIED BY 'presta_demo';"
    mysql -uroot -h127.0.0.1 test -e "GRANT ALL PRIVILEGES ON *.* TO 'presta_demo'@'localhost';"
}
sleep 20s && preparedb && /tmp/docker_run.sh &
./mysql.sh
