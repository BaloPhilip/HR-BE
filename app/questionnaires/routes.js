var questionnaireController = require('./questionnaireController'),
    isAuthenticated = require('./../auth/index');

module.exports = function (app) {
    
    app.route('/questionnaire/:questionnaire_id/question/:question_id')
        .get(questionnaireController.findOne)
        .post(isAuthenticated, questionnaireController.answer)
}; 