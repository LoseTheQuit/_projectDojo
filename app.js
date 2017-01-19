'use strict';

// A FEW MODULES


let fs = require('fs'),
    _ = require('lodash'),
    mongojs = require('mongojs'),
    colors = require('colors'),
    express = require('express'),
    curry = require('lodash/curry'),
    app = express(),
    bodyParser = require('body-parser'),
    https = require('https'),
    http = require('http'),
    Twitter = require('twitter'),
    request = require('request'),
    querystring = require('querystring'),
    cookieParser = require('cookie-parser'),
    jsonfile = require('jsonfile'),
    Client = require('node-rest-client').Client,
    client = new Client(),
    uuid = require('node-uuid'),
    AWS = require('aws-sdk');

let params, s3 = new AWS.S3(),
    tableName = '_projectDojo',
    dynamodb = new AWS.DynamoDB(),
    documentClient = new AWS.DynamoDB.DocumentClient();

AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAJVVWVSFIWUKKAGAA";
AWS.config.secretAccessKey = "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";
AWS.config.region = "us-west-2";
AWS.config.update({
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

const _L = (x) => console.log(x);

app.set('port', (process.env.PORT || 8000));

app.use(express.static('static'))
    .use('/bower_components', express.static(__dirname + '/bower_components'))
    .use('/node_modules', express.static(__dirname + '/node_modules')).use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))

app.listen(app.get('port'), function() {

    _L('\n');
    _L('********************************************'.black.bgWhite);
    _L("The frontend server is running on port 8000!".black.bgWhite);
    _L('********************************************'.black.bgWhite);
    _L('\n');

});


app.get('/', function(req, res) {

    _L('\n');
    _L('******* INCOMING GET: Load INITIAL Template *******'.black.bgWhite);
    _L('\n');

    var html = fs.readFileSync('static/views/werkspayce.html');
    res.end(html);

});
