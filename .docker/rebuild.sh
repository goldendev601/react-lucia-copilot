#!/bin/bash

docker-compose --project-name lucia_copilot_app up --build -d

docker rmi $(docker images | grep "^<none>" | awk "{print $3}")