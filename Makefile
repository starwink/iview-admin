NAME='win32k'
HAS_DOCKER_COMPOSE_WITH_DASH := $(shell which docker-compose)
ifdef HAS_DOCKER_COMPOSE_WITH_DASH
	HAS_T=true
else
	HAS_T='false'
endif
all:
	echo `!!!${NAME}!!`
hi:
	echo 3;
testif:
	echo 2;
	echo HAS_T
echo:
	@echo '命令不被显示出来'
exec:
	@cd /Users/wink;pwd;#同步命令