'use strict';

var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    url = process.env.MONGO_URI,
    app = express(),
    routes = require('./routes');

app.use(express.static('public'));

app.set('view engine', 'ejs');

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Failed to make a connection');
        console.log(err);
        process.exit(1);
    }

    routes(app, db);

    app.listen(8080, function () {
        console.log('running on 8080');
    });
});