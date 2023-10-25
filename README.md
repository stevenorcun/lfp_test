- Nodejs
- Express
- Couchbase
- swagger

To use couchbase locally for the project pull the official image on the docker hub and create an container

``` docker pull couchbase ```

and then

``` docker run -d --name couchbase-container -p 8091-8096:8091-8096 -p 11210:11210 -e COUCHBASE_ROOT_PASSWORD=password couchbase ```

to launch the code

 - npm install
 - npm run dev

To acces the API doc

 - http://localhost:3001/api-docs