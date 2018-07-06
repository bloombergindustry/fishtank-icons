#!/usr/bin/env bash
cd ./packages/vue
npm run clean
script/sync-version
npm run build
npm run build:bamboo