# node-js-express-api
An example node.js api using express

https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/

## Adding testing



```
npm install --save-dev jest
npm install --save-dev supertest
```

## Adding cors support

You can use the `cors` library to include in the express app middleware as described [here](https://www.twilio.com/blog/add-cors-support-express-typescript-api)

```
npm install cors
npm install --save-dev @types/cors
```

You can either use `cors()` with no arguments to allow all websites:

```
app.use(cors());
```

Or you can only allow one website, using `corsOptions`:

```
function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    }else{
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
```

Extract it to a class and pass it to the `cors` function:

```
app.use(cors(corsOptions));
```

Use a command like the one below to simulate a frontend hitting your API. 

```
 curl -H "Origin: http://localhost:3001" http://localhost:3000/status -v
```

This will return `OK` and will always contain data (see reasoning below). If the origin is allowed from the server and its `cors` definition, you will get the header `Access-Control-Allow-Origin` set:

```
*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET /status HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.88.1
> Accept: */*
> Origin: http://localhost:3001
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
**< Access-Control-Allow-Origin: http://localhost:3001**
< Vary: Origin
< Content-Type: application/json; charset=utf-8
< Content-Length: 13
< ETag: W/"d-bpuhhLnWXV0D57QULz+aZTQ3tKs"
< Date: Mon, 18 Sep 2023 22:42:53 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host lo
```

If you call from a disallowed origin, the server will still return data but will not include the header `Access-Control-Allow-Origin` at all. This is an indication that the browser would not accept the response due to `cors`.

```
curl -H "Origin: http://disallowed.com" http://localhost:3000/status -v
```

The response you will get is:

```
*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET /status HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.88.1
> Accept: */*
> Origin: http://disallowed.com
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 13
< ETag: W/"d-bpuhhLnWXV0D57QULz+aZTQ3tKs"
< Date: Mon, 18 Sep 2023 22:46:33 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
{"Amount":10}%                            
```

### Why does curl always return a response irrespective of origin?

The behavior you're observing is expected for curl. The CORS (Cross-Origin Resource Sharing) mechanism is enforced by web browsers, not by the server or by curl. When you make a request using curl, it will not enforce CORS rules; it simply sends the request and receives the response.

When a browser makes a request that would violate CORS, it's the browser that blocks the request (or more precisely, blocks the frontend JavaScript code from seeing the response) based on the CORS headers returned by the server. The server still processes the request and sends a response; it's just that the browser won't allow the frontend code to see it.

In the curl command, the -H "Origin: http://localhost:3002" part is simply setting the HTTP Origin header in the request. If your server is configured to respond differently based on this header (for example, to set the Access-Control-Allow-Origin response header), then it might do so, but curl itself doesn't care about CORS.

The curl command-line tool is not a web browser and does not have the same security restrictions. It will show you the raw HTTP response regardless of the CORS headers. If you want to test CORS behavior, it's best to do so in a browser environment, or by simulating browser-like behavior in a testing framework that understands CORS.


