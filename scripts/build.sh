#!/bin/bash
set -e
cd ..
export MAIN=$(pwd)
npm i
for PACKAGE_JSON in ${MAIN}/packages/**/package.json
do
    echo "Building ${PACKAGE_JSON}"
    cd $(dirname ${PACKAGE_JSON})
    npm i
done

