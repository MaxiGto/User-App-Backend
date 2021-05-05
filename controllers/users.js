const { response } = require('express');
const ServerUser = require('../models/User');

const getUserInfo = async( req, res = response ) => {

    const id = req.id;
    const serverUser = await ServerUser.findOne({ _id: id });


    return res.json({
            ok: true,
            id: serverUser.id,
            avatar: serverUser.avatar,
            age: serverUser.age,
            email: serverUser.email,
            name: serverUser.name,
            role: serverUser.role,
            surname: serverUser.surname
    });

};

module.exports = {
    getUserInfo
}


        