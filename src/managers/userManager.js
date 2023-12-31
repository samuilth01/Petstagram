const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jwt');
const { SECRET }= require('../config/config');


exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if  (!user) {
        throw new Error('Invalid user or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid user or password!');
    }


    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    return token;
};

exports.register = async (userData) => {
    const user = await User.findOne({username: userData.username});
    if (user) {
        throw new Error('Username already exists');
    }

    User.create(userData)
};