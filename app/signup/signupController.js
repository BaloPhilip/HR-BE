var User = require('./userSchema');
var Answer = require('./../questionnaires/answerSchema');
var jwt = require('jsonwebtoken');
var config = require('./../../config');


function toJSON(item) {
    return {
        _id: item._id,
        firstName: item.firstName,
        lastName: item.lastName,
        middleName: item.middleName,
        email: item.email,
        phone: item.phone,
        position: item.position,
        experience: item.experience,
        createdAt: item.createdAt
    }
}

module.exports = {

    newUser: function (req, res) {

        // create a new user
        var _user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            email: req.body.email,
            phone: req.body.phone,
            position: req.body.position,
            experience: req.body.experience,
            createdAt: req.body.createdAt
        });

        var __user = toJSON(_user);

        // save the User
        _user.save(function (err) {
            if (err) {
                throw err;
            }

            var token = jwt.sign(__user, config.secret, {});

            console.log('User saved successfully');

            res.json({
                success: true,
                token: token
            });

        });
    },

    allUsers: function (req, res) {

        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }

            res.json({
                users
            });
        });
    },

    findOneUser: function (req, res) {

        User.findById(
            req.params.user_id,
            function (error, userData) {

                res.json({
                    userData
                })
    
            });
    },

    findUserAnswersQ1: function (req, res) {

        Answer.find(
            {
                user: req.params.user_id,
                questionnaire: req.params.questionnaire1_id
            },
            function (error, userAnswer) {

                res.json({
                    userAnswer
                })

            });
    },

    findUserAnswersQ2: function (req, res) {

        Answer.find(
            {
                user: req.params.user_id,
                questionnaire: req.params.questionnaire1_id
            },
            function (error, userAnswer) {

                res.json({
                    userAnswer
                })

            });
    },

    findUserAnswersQ3: function (req, res) {

        Answer.find(
            {
                user: req.params.user_id,
                questionnaire: req.params.questionnaire1_id
            },
            function (error, userAnswer) {

                res.json({
                    userAnswer
                })

            });
    }
};

    

