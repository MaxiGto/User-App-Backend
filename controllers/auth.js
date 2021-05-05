const { response } = require('express');

const bcrypt = require('bcryptjs');
const ServerUser = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

/** 
 * @description Checks if email already exists. If not, saves the new user in the Database with an encrypted password.
 * @param {object} req request
 * @param {object} res response
 * @returns {object} res
*/

const createUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        let serverUser = await ServerUser.findOne({ email: email });

        if( serverUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            });
        };


        serverUser = new ServerUser( req.body );

        // Password Encryption
        const salt = bcrypt.genSaltSync();
        serverUser.password = bcrypt.hashSync( password, salt );

        console.log(serverUser);
    
        await serverUser.save();
    
        return res.status(201).json({
            ok: true,
            id: serverUser.id,
            avatar: serverUser.avatar,
            age: serverUser.age,
            email: serverUser.email,
            name: serverUser.name,
            role: serverUser.role,
            surname: serverUser.surname
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }


};

/**
 * @description authenticates an user and generates the JWT
 * @param {object} req request
 * @param {object} res response
 * @returns {object} res
 */

const userLogin = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const serverUser = await ServerUser.findOne({ email: email });

        if( !serverUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid email or password'
            });
        };

        // Confirm passwords

        const validPassword = bcrypt.compareSync( password, serverUser.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid email or password'
            });
        }

        // Generate JWT
        const token = await generateJWT( serverUser.id, serverUser.name );

        return res.json({
            ok: true,
            id: serverUser.id,
            name: serverUser.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

};

/**
 * @description renews JWT
 * @param {object} req request
 * @param {object} res response
 * @returns {object} res
 */

const renewJWT = async(req, res = response) => {

    const { id, name } = req;

    const token = await generateJWT(id, name);

    return res.json({
        ok: true,
        token,
        id,
        name
    });

};

module.exports = {
    createUser,
    userLogin,
    renewJWT
}