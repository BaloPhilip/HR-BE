/**
 * Created by philipbalo on 03.08.16.
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./../../config'); // get our config file


module.exports = function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['bearer'] || req.headers['Bearer'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.authenticated_user = decoded;

                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
};