#!/bin/bash
# source /etc/profile >/dev/null 2>&1;

docker stop iviewadminnginx;
docker rm iviewadminnginx;
docker rmi iviewadminnginx:0.0.1;
# unzip -o -d docker/ promote.zip

docker build -t iviewadminnginx:0.0.3 .

docker run -itd -p 18882:80 --name iviewadminnginx -v ~/work/server/docker/:/docker iviewadminnginx:0.0.3; 
docker ps | grep "iviewadminnginx"
date
