const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        maxlengh: 50,
        required: true
    },
    lastname: {
        type: String,
        maxlengh: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0,
        required: true
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    favoriteProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
});

//for hash password
userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err)
                return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err)
                    return next(err);
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
});

//for compare password
userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
}

//for generate token
userSchema.methods.generateToken = function (cb) {
    var user = this;
    const secret = (user.role === 0) ? 'user_auth' : 'admin_auth';
    var token = jwt.sign(user._id.toHexString(), secret);
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user) {
        if (err)
            return cb(err)
        cb(null, user);
    });
}

// for auth
userSchema.statics.findByToken = function (token, secret, cb) {
    var user = this;

    jwt.verify(token, secret, function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err)
                return cb(err);
            cb(null, user);
        })
    })
}

module.exports = mongoose.model('User', userSchema);