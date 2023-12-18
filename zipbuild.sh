#!/bin/bash
# source /etc/profile >/dev/null 2>&1;
yarn config set ignore-engines true;
yarn install ;
#npx browserslist --update-db;
node docker/node-build/nodeAddToVersions.js
yarn build ;
mv dist promod;
# zip -r $(date +"promod.dist.%Y%m%d%.zip") promod;
zip -r $(date +'promod.'$(git rev-parse --abbrev-ref HEAD)'.%Y%m%d%.zip') promod;
rm -rf promod;