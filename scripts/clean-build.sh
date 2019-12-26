#!/bin/bash
set -e
cd ..
export MAIN=$(pwd)
echo "Updating packages"
rm -rf node_modules package-lock.json
npm i
npm up
for PACKAGE_JSON in ${MAIN}/packages/**/package.json
do
    echo "Building ${PACKAGE_JSON}"
    cd $(dirname ${PACKAGE_JSON})
    rm -rf node_modules package-lock.json
    npm i
    npm up
done
echo "Building packages"
cd ${MAIN}
npm run pre-commit
for PACKAGE_JSON in ${MAIN}/packages/**/package.json
do
    echo "Building ${PACKAGE_JSON}"
    cd $(dirname ${PACKAGE_JSON})
    npm run build
done


