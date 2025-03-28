const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        fname: {
            type: String,
            required: true,
            trim: true
        },
        lname: {
            type: String,
            required: true,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    phno: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
