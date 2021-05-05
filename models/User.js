const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user',
        required: true
    }
    
});

const ServerUserSchema = Schema({

    ...UserSchema.obj,
    password: {
        type: String,
        required: true
    },

});

module.exports =  model('ServerUser', ServerUserSchema);