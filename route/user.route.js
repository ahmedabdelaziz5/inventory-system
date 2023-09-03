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

const decodeToken = require('../Auth/tokenDecoding');

app.get('/verifyAccount', verifyAccount);
app.post('/signUp', validateRequest(signUpValid), signUp);
app.post('/login', validateRequest(loginValid), login);
app.post('/forgetPassword', validateRequest(forgetPasswordValid), forgetPassword);
app.patch('/editProfile', decodeToken(), validateRequest(editProfileValid), editProfile);
app.patch('/changePassword', decodeToken(), validateRequest(changePasswordValid), changePassword);


module.exports = app; 