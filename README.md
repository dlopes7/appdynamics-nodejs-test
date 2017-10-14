#AppDynamics instrumentation lab#

Small sample app with a dummy python frontend and a node backend connected to Cassandra

Backend:

1. `git clone https://github.com/dlopes7/appdynamics-nodejs-test`
2. `docker run --name cassandra -p 9042:9042 -d cassandra:latest`
3. `npm install`
4. `node dist/server.js`

Frontend:

1. `pip install requests appdynamics`
2. `pyagent -c appd.conf python products.py`



