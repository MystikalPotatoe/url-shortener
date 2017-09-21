// js file to access MongoDB
'use strict';

var mongoLocation = process.env.MONGO_URI;
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(mongoLocation, function (err, db) {
    console.log('Successful connection');
    // function find {
    //     console.log('Found!');
    //     db.close(() => console.log('DB closed after find'));
    // };
    // exports.post = () => {
    //     console.log('Posted!');
    //     db.close(() => console.log('DB closed after post'));
    // };
});