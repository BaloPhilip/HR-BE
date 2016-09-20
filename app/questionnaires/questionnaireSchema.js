var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('questionnaires', new Schema({
    title: String,
    type: Number,
    questions: Array
}));

