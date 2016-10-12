# nodejs-simple-contact-webapp

Created with Love for this : <a href="https://www.codepolitan.com/problemset-nodejs-dasar">https://www.codepolitan.com/problemset-nodejs-dasar</a> 

<h3>Preview</h3>
<img src="http://i1176.photobucket.com/albums/x322/mazipanneh/swagger-contact-webapp_zpsoqfeqtcn.png" />
<img src="http://i1176.photobucket.com/albums/x322/mazipanneh/contact-webapp_zpshqrvtbgc.png" />

<h3>Using technology</h3>
- Expressjs, Mongoose and JWT for API development
- Swagger and Swagger UI for documentation
- AngularJS for UI

<h3>Installation</h3>
- Install depedency <a href="https://github.com/swagger-api/swagger-node">https://github.com/swagger-api/swagger-node</a>
<pre>
npm install -g swagger
</pre>
- Install all depedency
<pre>
npm install
</pre>
- Run mongodb
<pre>
mongod
</pre>
- Run the server
<pre>
swagger project start
OR
npm start
</pre>
- Open in browser
<pre>
<a href="http://localhost:10010">http://localhost:10010</a>
</pre>
- Open API documentation in browser
<pre>
<a href="http://localhost:10010/docs/#/default">http://localhost:10010/docs/#/default</a>
</pre>

<h3>API Usage Notes</h3>
- all API that related with ADD, UPDATE, DELETE must have token
- to get token you must have user
- to create user --> use API POST <a href="http://localhost:10010/docs/#!/default/post_api_authenticate_addnew">/api/authenticate/addnew</a>
- to get token --> use API POST <a href="http://localhost:10010/docs/#!/default/post_api_authenticate">/api/authenticate</a>
- then you can copy and paste token in parameter API like ADD, UPDATE, DELETE


<h3>Folder Structure</h3>
- all code in <code>api</code> folder
- <code>api/connection/connection.js</code> is mongodb connection
- <code>app.js</code> is main server js
- folder <code>api/controllers</code> is all api routing
- folder <code>api/models</code> is schema model for mongodb ORM
- folder <code>api/swagger</code> is configuration for swagger UI

</br>
Hope will usefull for you all.</br>

Question ? please email : mazipanneh@gmail.com
