#!/bin/bash
set -e
cd ..
export MAIN=$(pwd)
npm i
for PACKAGE_JSON in ${MAIN}/packages/**/package.json
do
    echo "Building ${PACKAGE_JSON}"
    cd $(dirname ${PACKAGE_JSON})
    rm -rf node_modules package-lock.json
    npm i
    npm up
    npm run build
done
cd ${MAIN}
npm run pre-commit

