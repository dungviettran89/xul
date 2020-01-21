#!/bin/bash
cd ../docker/demo-shop
docker build -f *.dockerfile -t xulautomation/demoshop:latest .
docker push xulautomation/demoshop:latest
