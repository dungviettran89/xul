#!/usr/bin/env bash
set -e
cd ..
docker rm -f k8s-cucumber-grid-1 k8s-cucumber-grid-2  || true
docker build -f docker/Dockerfile -t k8s-cucumber-grid:dev .
docker run -d -p 6080:6080 -p 8080:8080 --name k8s-cucumber-grid-1 k8s-cucumber-grid:dev
docker run -d --name k8s-cucumber-grid-2 k8s-cucumber-grid:dev
docker logs -f k8s-cucumber-grid-1