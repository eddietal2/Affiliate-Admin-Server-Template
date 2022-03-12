const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require('../models/user.model.ts');
const Admin = require('../models/admin.model.ts');
const config = require('../config/default.json'); 

/**
 * 
 * @param user
 * @returns JSON Web Token
 */
function createToken(user: any) {
    return jwt.sign(
      { 
        username: user.username,
      }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
  }


/**
 * Login
 * Handle Errors:
 *  - No Username
 *  - Bad Email
 *  - No Password
 *  - Bad Password
 *  - Backend Error
 */
exports.login = (req: any, res: any ) => {
    console.log('Attempting to log in Admin...');
    console.log(req.body.username);
    console.log(req.body.password);
    

    // No Email OR No Password
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ msg: 'You need to send username and password' });
    }
  
    Admin.findOne(
      { username: req.body.username }, 
      (err: any, admin: any) => {
        // Backend Error
        if (err) {
            return res.status(400).send({ 
              msg: 'There was an error on the BackEnd',
              err 
            });
        }
        
        // Bad Email Error
        if (!admin) {
            return res.status(400).json({ msg: 'The user does not exist' });
        }
  
        admin.comparePassword(req.body.password, (err: any, isMatch: any) => {
            if (isMatch && !err) {
                console.log('Logged in as: ' + admin.email);
                // Successful Login
                return res.status(200).json({
                    msg: 'User @' + admin.username + ' has logged in',
                    token: createToken(admin),
                    username: admin.username,
                });
            } else {
                // Bad Password
                return res.status(400).json({ msg: 'Bad Password' });
            }
        });
    });
}
/**
 * @param username
 * @param password
 */

/**
 * Create a New Admin
 *  - Backend Error Finding Existing Admin
 *  - Admin Already Exists
 *  - Backend Error Saving New Admin
 *  - 
 */
exports.register = (req: any, res: any) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;

    Admin.findOne({ username }, (err: any, admin: any) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        if (admin) {
            return res.status(400).json({ msg: 'The admin already exists' });
        }

        let newAdmin = Admin({
          username,
          password,
          dateRegistered: Date.now()
          // picture
       });
        newAdmin.save(
          (err: any, admin: any) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ msg: err });
            }
            if (!admin) {
                console.log('There was no admin saved!')
                return res.status(400).json({ msg: 'There was no admin saved!' });
            }
            console.log('User registered!');
            return res.status(200).json(admin);
        });
    });
    // return res.status(200).json({msg: "register"})
}

export {}
