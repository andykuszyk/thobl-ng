#!/bin/bash
commit=`git log -n 1 --oneline | sed 's/\(.......\).*/\1/'`
npm install -g @angular/core
npm install
ng build
docker build -t andykuszyk/thobl:$commit .
docker push andykuszyk/thobl:$commit
sed -i "s/\[version\]/$commit/g" docker-compose.yml
