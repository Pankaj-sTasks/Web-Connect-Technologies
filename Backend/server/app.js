const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
const fs = require("fs");
const db = require("../models/db");

const config = require("../nodedetails/config");
const route = require('../routes/route');

const app = express();
let port = config.port;

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.set("port", port);
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('trust proxy', true)   //for real ip address

app.use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'POST,PATCH,GET,PUT,DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
});


app.get('/logs', (req, res) => {
     console.log("logcomming")
     let file = path.join(__dirname, '../logs/combined.outerr.log');
     fs.readFile(file, 'utf-8', (err, data) => {
          console.log(err, "err")
          res.json(data);
     })
})

app.get('/emptyLogs', (req, res) => {
     let file = path.join(__dirname, '../logs/combined.outerr.log');
     fs.writeFile(file, "", (err, data) => {
          res.json("Logs truncated");
     })
})



app.use("/", route);

//both m/w not working accdt Jade

app.use(function (err, req, res, next) {
     res.locals.message = err.message;
     res.locals.error = req.app.get("env") === "development" ? err : {};
     res.locals.title = 'Error'
     res.status(err.status || 500);
     res.render("error", {
          message: err.message,
          error: err,
          title: 'Error'
     })
});

let server;
if (config.serverType == "http") {
     const http = require("http");
     server = http.createServer(app);

     server.listen(port, () => console.log(`Local Back End server is running on http://localhost:${port}`));

} else {
     const https = require("https");
     server = https.createServer(config.serverOptions, app);
     server.listen(port, () => console.log(` Back End server is running on `));
}


module.exports = app;


