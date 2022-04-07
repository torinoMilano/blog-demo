export DOCKER_IMAGE_NAME=kanmaz.ch/node-blog-server:1.0.0
export DOCKER_NAME=node-app
export DOCKER_PORT=5000

docker stop "${DOCKER_NAME}" || true && docker rm "${DOCKER_NAME}" || true \
&& docker build -t "${DOCKER_IMAGE_NAME}" . \
&& docker run -d -p ${DOCKER_PORT}:${DOCKER_PORT}  --name "${DOCKER_NAME}" "${DOCKER_IMAGE_NAME}" \
&& docker logs "${DOCKER_NAME}"