# node-js-express-api
An example node.js api using express

https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/

## Adding testing



```
npm install --save-dev jest
npm install --save-dev supertest
```

## Adding cors support

https://www.twilio.com/blog/add-cors-support-express-typescript-api

Use a command like the one below to simulate a frontend hitting your API. 

```
curl http://localhost:3000/status -v --head http://localhost:3001
```

This will return `OK` but won't contain any data. The reasone for this is that the `Access-Control-Allow-Origin` is missing.


```
npm install cors
npm install --save-dev @types/cors
```

