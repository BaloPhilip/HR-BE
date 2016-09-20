var Questionnaire = require('./questionnaireSchema');
var Answer = require('./answerSchema');
var config = require('./../../config');

module.exports = {

    findOne: function (req, res) {

        Questionnaire.findOne({
            _id: req.params.questionnaire_id

        }, function (error, result) {

            if (req.params.question_id <= result.questions.length - 1) {
                
                res.json({
                    next_question: true,
                    question: result.questions[req.params.question_id - 1]
                })
            } else {
                res.json({
                    next_question: false,
                    question: result.questions[req.params.question_id - 1]
                })
            }

        });

    },

    answer: function (req, res) {
        
        new Answer({
            questionnaire: req.params.questionnaire_id,
            user: req.authenticated_user._id,
            question: req.params.question_id,
            answer: req.body.answer
        }).save().then(function (saved_answer) {

            res.json(saved_answer);

        }, function () {
            res.status(400).json(error);
        });

    }

};

