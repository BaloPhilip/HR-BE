var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    firstName: String,
    lastName: String,
    middleName: String,
    email: String,
    phone: String,
    position: String,
    experience: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
    
}));