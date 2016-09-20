var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');



var signup_routes = require('./app/signup/routes');
var questionnaires_routes = require('./app/questionnaires/routes');

var config = require('./config'); // get our config file

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens

var db_config = {
        mongo: {
            host: 'localhost',
            port: 27017,
            database: "auth"
        }
    },

    /**
     * generate MongoDB connection string
     * @returns {string}
     */

    get_mongo_connection_string = function () { // function to get config params
        if (!db_config.mongo) {
            throw new Error("Database configuration param is missing: mongo config");
        }
        var mongo_config = db_config.mongo;

        if (!mongo_config.host) {
            throw new Error("Database configuration param is missing: host");
        }
        if (!mongo_config.port) {
            throw new Error("Database configuration param is missing: port");
        }
        if (!mongo_config.database) {
            throw new Error("Database configuration param is missing: database");
        }
        return 'mongodb://' + mongo_config.host + ':' + mongo_config.port + '/' + mongo_config.database;
    };

mongoose.connect(get_mongo_connection_string()); // connect to our database

/**
 * Adding Parser limits
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Bearer');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================

signup_routes(app);

questionnaires_routes(app);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);