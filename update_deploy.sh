#!/bin/bash

git pull

cd .docker

sh down.sh;
sh rebuild.sh;

cd ../

printf "We are through!\n"

