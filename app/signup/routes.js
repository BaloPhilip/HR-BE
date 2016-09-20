var signupController = require('./signupController');

module.exports = function (app) {
    
    app.route('/signup')
        .post(signupController.newUser)
        .get(signupController.allUsers);


    app.route('/user/:user_id')
        .get(signupController.findOneUser);

    app.route('/user/:user_id/answers/:questionnaire1_id')
        .get(signupController.findUserAnswersQ1);

    app.route('/user/:user_id/answers/:questionnaire2_id')
        .get(signupController.findUserAnswersQ2);

    app.route('/user/:user_id/answers/:questionnaire3_id')
        .get(signupController.findUserAnswersQ3);
};