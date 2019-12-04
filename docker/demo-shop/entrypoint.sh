#!/usr/bin/env bash
until mysql -uroot -h127.0.0.1 test -e "SELECT 1;"; do sleep 5; done && /tmp/docker_run.sh &
timeout 24h ./mysql.sh
