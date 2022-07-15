#!/bin/bash
# source /etc/profile >/dev/null 2>&1;
yarn config set ignore-engines true;
yarn install ;
#npx browserslist --update-db;
node docker/node-build/nodeAddToVersions.js
yarn run pro-build ;
mv dist single-disease-quality;
# zip -r $(date +"single-disease-quality.dist.%Y%m%d%.zip") single-disease-quality;
zip -r $(date +'single-disease-quality.'$(git rev-parse --abbrev-ref HEAD)'.%Y%m%d%.zip') single-disease-quality;
rm -rf single-disease-quality;