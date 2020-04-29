const express = require('express');
const app = express();
const api_routes = require('./routes');
const bodyParser = require('body-parser');
const CORS = require('cors');
const morgan = require('morgan')

app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(CORS({origin: 'http://localhost:3000'}));
app.use(morgan())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/', api_routes);
app.listen(9000, () =>{
    console.log('express listening on localhost:9000')
})