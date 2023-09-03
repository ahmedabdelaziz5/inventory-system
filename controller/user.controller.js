const { userModel } = require('../modules/user/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendVerificationMail } = require('../mailServices/verificationMail');


exports.signUp = async (req, res) => {
    try {
        const
            {
                userName, email, password, confirmPassword,
                bussinesName, inventoryName, bussinesIndustry
            } = req.body;

        var user = await userModel.findOne({ email: email }).lean();

        if (user) {
            return res.status(400).json({
                message: "this email already registerd"
            })
        }

        if (password != confirmPassword) {
            return res.status(400).json({
                message: "password and confirm passwrod must be the same"
            })
        }

        let result ;
        await userModel.create({ email, bussinesName, inventoryName, userName, password, bussinesIndustry })
        .then(async () => {
            result = await sendVerificationMail(email);
        })
        res.status(result.statusCode).json({
            message: result.message
        })

    }

    catch (err) {
        res.status(500).json({
            message: "error",
            err
        })
    };
}

exports.login = async (req, res) => {

}

exports.forgetPassword = async (req, res) => {

}

exports.editProfile = async (req, res) => {

}

exports.changePassword = async (req, res) => {

}

exports.verifyAccount = async (req, res) => {
    let { token } = req.query;
    let decodedMail = jwt.verify(token, process.env.SECRET_TOKEN);
    let user = await userModel.findOneAndUpdate({ email: decodedMail.userMail }, { isVerified: true });
    if (!user) {
        return res.send('there is no such email , please register first');
    }
    return res.send("your account was verified successfully !")
}

