#!/bin/sh

docker run --network host -v $(pwd):/etc/newman -t postman/newman run blogpost.postman_collection.json