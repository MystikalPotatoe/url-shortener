'use strict';

var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var Promise = require('bluebird');
var fixtures = require('../../test/testdata');

var state = {
    db: null,
    mode: null
};

// In the real world it will be better if the production uri comes
// from an environment variable, instead of being hard coded.
var PRODUCTION_URI = 'mongodb://127.0.0.1:27017/production',
    TEST_URI = 'mongodb://127.0.0.1:27017/test';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

exports.connect = function (url, done) {
    // change 'url' to mode if using this for multiple environments

    if (state.db) {
        return done();
    }

    //only needed for multiple environments
    //var uri = mode === exports.MODE_TEST ? TEST_URI : PRODUCTION_URI;

    MongoClient.connect(url, function (err, db) {
        console.log('DB connected');
        if (err) return done(err);
        state.db = db;
        // use mode if multiple environments
        //state.mode = mode;
        done();
    });
};

exports.close = function (done) {
    state.db.close(function () {
        console.log('Closing DB');
        done();
    });
};

// exports.close = function(done) {
//     state.db.close(function() {
//         console.log('Closing DB');
//         done();
//     });
// };

exports.getDB = function () {
    return state.db;
};

exports.drop = function (done) {
    if (!state.db) return done();

    //USE THIS IF DROPPING ALL COLLECTIONS IN A DATABSE
    // state.db.collections(function(err,collections) {
    //     console.log('dropping');
    //     async.each(collections, function(collection, cb) {
    //         if(collection.collectionName.indexOf('system')===0) {
    //             return cb();
    //         }
    //         collection.deleteOne(cb);
    //         console.log('dropped - '+collection.collectionName);
    //     },done);
    // });

    state.db.collection('urls').drop(done);
    console.log('got to end eventually');
};

exports.dropify = function () {
    return new Promise(function (resolve, reject) {
        exports.drop(function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.fixtures = function (data, done) {
    var db = state.db;
    if (!db) {
        return done(new Error('Missing database connection.'));
    }

    var names = Object.keys(data.collections);
    console.log(names);
    // db.createCollection(names[0], function(err, collection) {
    //     console.log('Collection created');
    //     if(err) return done(err);
    //     collection.insertMany(data.collections[names[0]],done);
    // });
    async.each(names, function (name, cb) {
        db.createCollection(name, function (err, collection) {
            console.log('Collection created');
            if (err) return cb(err);
            collection.insertMany(data.collections[name], cb);
        });
    }, done);
    console.log('got to fixture end');
};

exports.fixify = function () {
    return new Promise(function (resolve, reject) {
        exports.fixtures(fixtures, function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
};