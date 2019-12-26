#!/bin/bash
set -e
export VERSION=${VERSION:-0.0}
export BUILD_NUMBER=${BUILD_NUMBER:-1}
export BUILD_VERSION="$VERSION.$BUILD_NUMBER"
env

cd ..
export MAIN=$(pwd)
sed -i -e "s/\"next\"/\"^$VERSION.$BUILD_NUMBER\"/g" packages/*/package.json

cd "$MAIN"/packages/xul-core
npm version "$BUILD_VERSION"
rm -rf node_modules/ package-lock.json
npm i
npm up
npm run release:rc
sleep 1m

cd "$MAIN"/packages/xul-data
npm version "$BUILD_VERSION"
rm -rf node_modules/ package-lock.json
npm i
npm up
npm run release:rc
sleep 1m

cd "$MAIN"/packages/xul-express
npm version "$BUILD_VERSION"
rm -rf node_modules/ package-lock.json
npm i
npm up
npm run release:rc
sleep 1m

cd "$MAIN"/packages/xul-test
npm version "$BUILD_VERSION"
rm -rf node_modules/ package-lock.json
npm i
npm up
npm run release:rc
sleep 1m

cd "$MAIN"/packages/xul-redux
npm version "$BUILD_VERSION"
rm -rf node_modules/ package-lock.json
npm i
npm up
npm run release:rc
sleep 1m

