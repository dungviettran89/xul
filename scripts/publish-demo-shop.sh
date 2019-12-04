#!/bin/bash
cd ../docker/demo-shop
docker build -f *.dockerfile -t xulautomation/demoshop:latest .
docker push xulautomation/demoshop:latest
docker commit --change "ENV PS_INSTALL_AUTO=0" b63e5b902606 xulautomation/demoshop:stable
docker push xulautomation/demoshop:stable