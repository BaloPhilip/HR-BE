var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Answer = Schema({

    questionnaire: {
        type: Schema.Types.ObjectId,
        ref: 'Questionnaire',
        unique: false,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: false,
        required: true
    },
    question: {
        type: "Number",
        unique: false,
        required: true
    },
    answer: {
        type: "Object",
        unique: false,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

Answer.pre('save', function(next){
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Answer', Answer);