export DOCKER_IMAGE_NAME=mkanmaz.ch/nginx-port-forward:1.0.0
export DOCKER_NAME=nginx-proxy

docker stop "${DOCKER_NAME}" || true && docker rm "${DOCKER_NAME}" || true \
&& docker build -t "${DOCKER_IMAGE_NAME}" . \
&& docker run -d -p 80:80 --link node-app:nodeserver --name  "${DOCKER_NAME}" "${DOCKER_IMAGE_NAME}" \
&& docker logs "${DOCKER_NAME}"