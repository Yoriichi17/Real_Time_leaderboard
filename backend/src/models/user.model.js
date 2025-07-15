const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : { type : String , required : true , unique : true , trim: true},
    avatar: {type: String , required: true},
    totalPoints: {type: Number}
},{ timestamps: true })

module.exports = mongoose.model('User', userSchema);