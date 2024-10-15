#!/bin/bash
# source /etc/profile >/dev/null 2>&1;

docker stop iaf;
docker rm iaf;
docker rmi iaf:2.0.0;
# unzip -o -d docker/ promote.zip

docker build -t iaf:2.0.0 .

docker run -itd -p 18080:80 --name iaf -v ~/work/server/docker/:/docker iaf:2.0.0; 
docker ps | grep "iaf"
date
