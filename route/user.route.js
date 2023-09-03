const app = require('express').Router();

const {
    signUp,
    login,
    forgetPassword,
    editProfile,
    changePassword,
    verifyAccount
} = require('../controller/user.controller');

const { validateRequest } = require('../validator/req.validation');

const {
    signUpValid,
    loginValid,
    forgetPasswordValid,
    editProfileValid,
    changePasswordValid
} = require('../modules/user/user.validation');


app.post('/signUp', validateRequest(signUpValid), signUp);
app.post('/login', validateRequest(loginValid), login);
app.post('/forgetPassword', validateRequest(forgetPasswordValid), forgetPassword);
app.put('/editProfile', validateRequest(editProfileValid), editProfile);
app.patch('/changePassword', validateRequest(changePasswordValid), changePassword);
app.get('/verifyAccount', verifyAccount);


module.exports = app; 