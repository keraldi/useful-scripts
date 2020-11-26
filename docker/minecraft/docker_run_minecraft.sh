#!/bin/sh

java_opts=$(cat "$PWD"/launch-options)

docker run -d -it --restart unless-stopped --name mc-vanilla \
-v "$PWD"/data/:/data -e TZ='Europe/Berlin' \
-e TYPE=PAPER -e VERSION=latest -e JVM_OPTS="$java_opts" -e MAX_MEMORY=3G -e EULA=TRUE \
-p 25565:25565 --dns 1.1.1.1 itzg/minecraft-server


