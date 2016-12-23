const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// 사용자 스키마
const Users = new Schema({
    username : String,
    password : String,
    admin    : {
        type    : Boolean,
        default : false
    }
});


// statics 은 스키마를 확장한다.
Users.statics.create = function(username, password) {
    const user = new this({
        username, password
    });

    return user.save(); // DB 저장
};

Users.statics.findOneByUsername = function(username) {
    return this.findOne({
        username
    }).exec();
};

Users.statics.verify = function(password) {
    this.admin = true;
    return this.save();
};

module.exports = mongoose.model('Users', Users);
