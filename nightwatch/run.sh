set -e

IP=`ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1`
sed -e s/__HOST__/$IP/g nightwatch.json.dist > nightwatch.json

docker-compose -f docker-compose-nightwatch.yml down
docker network rm nightwatch-network
docker network create nightwatch-network

docker-compose -f docker-compose-nightwatch.yml down
docker-compose -f docker-compose-nightwatch.yml up -d

sleep 5

nightwatch
