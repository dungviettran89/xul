#!/usr/bin/env bash
set -e
docker rm -f cucumber-openshift-grid || true
docker build -f docker/Dockerfile -t cucumber-openshift-grid .
docker run --rm --sig-proxy=true -p 6080:6080 --name cucumber-openshift-grid cucumber-openshift-grid