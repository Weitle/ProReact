const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');
const fileName = process.argv[2] || "./data.js";
const port = process.argv[3] || 4021;

let router = undefined;

const app = express();

const createServer = ()=>{
  delete require.cache[require.resolve(fileName)];
  setTimeout(()=>{
    router = jsonServer.router(fileName.endsWith('.js') ? require(fileName)() : fileName);
  }, 100);
}
createServer();

app.use(cors());
app.use(jsonServer.bodyParser);
app.use('/api', (req, res, next)=>router(req, res, next));

app.listen(port, ()=>{
  console.log(`Web service running on port ${port}`);
});
