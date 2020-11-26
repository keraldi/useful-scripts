docker run -d --name=consul-client \
consul agent -node=client-1 -join=172.17.0.3 # replace ip with docker network ip

