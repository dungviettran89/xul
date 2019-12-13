#!/bin/bash
set -e
cd ..
export MAIN=$(pwd)
cd "$MAIN"/packages/xul-core
npm run release:rc

cd "$MAIN"/packages/xul-express
npm run updateDevDependencies
npm run release:rc

cd "$MAIN"/packages/xul-test
npm run updateDevDependencies
npm run release:rc

cd "$MAIN"/packages/xul-server
npm run updateDevDependencies

cd "$MAIN"/packages/xul-ui
npm run updateDevDependencies
