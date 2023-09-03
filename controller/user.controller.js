const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require('../modules/user/user.model');
const { setUpMails } = require('../mailServices/verificationMail');
const { hashPassword } = require('../helpers/passwordHashing');
const { generatePasswod } = require('../helpers/generatePassword');

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

        let result;
        let newPassword = await hashPassword(password);
        await userModel.create({ email, bussinesName, inventoryName, userName, password: newPassword, bussinesIndustry })
            .then(async () => {
                result = await setUpMails(emailType = "verificationMail", { email });
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
    try {
        const { userName, password } = req.body;

        let user = await userModel.findOne({ userName }).lean();

        if (!user) {
            return res.status(401).json({
                message: "you should register first "
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({
                message: "you should verify your account first "
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "incorrct password "
            });
        }
        let token = jwt.sign({ email: user.email, userName: user.userName }, process.env.SECRET_TOKEN);
        delete user.password;
        delete user.isVerified;
        return res.status(200).json({
            message: "success",
            token,
            user
        });

    }
    catch (err) {
        res.status(500).json({
            message: "error",
            err
        })
    };
}

exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        let isFound = await userModel.findOne({ email }).lean().select("_id");

        if (!isFound) {
            return res.status(200).json({
                message: "you do not have an account yet , please register first "
            })
        }

        if (!isFound.isVerified) {
            return res.status(200).json({
                message: "you should verify your account first "
            })
        }

        let newPassword = generatePasswod(); // get new password 
        let result = await setUpMails(emailType = "resestPasswordMail", { email, newPassword })
            .then(async (result) => {
                if (result.statusCode == 400) {
                    return res.status(400).json({
                        message: "could not chang your password !"
                    })
                }
                let hashedPassword = await hashPassword(newPassword); // hash it 
                await userModel.updateOne({ email }, { password: hashedPassword });
                return res.status(200).json({
                    message: "success"
                })
            })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            err
        });
    }
}

exports.editProfile = async (req, res) => {
    try {
        const { userName, email, bussinesName, inventoryName, bussinesIndustry } = req.body;

        const userMail = req.user.email;
        let user = await userModel.findOne({ email: userMail }).lean().select("email userName");

        if (!user) {
            return res.status(400).json({
                message: "you should register first !"
            })
        }

        await userModel.updateOne({ email: userMail, userName: user.userName }, { userName, email, bussinesName, inventoryName, bussinesIndustry })
        .then(async () => {
            res.status(200).json({
                message: "success"
            })
        })
    }

    catch (err) {
        res.status(500).json({
            message: "error",
            err
        })
    };
}

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, password, confirmPassword } = req.body;

        const userMail = req.user.email;
        const user = await userModel.findOne({ email: userMail }).lean().select("email password userName");

        if (!user) {
            return res.status(400).json({
                message: "there is no such user !"
            })
        }

        if (password != confirmPassword) {
            return res.status(400).json({
                message: "password and confirm passowrd must be the same "
            })
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "wrong password, please type your correct password !"
            })
        }

        let newPassword = await hashPassword(password);
        await userModel.updateOne({ email: userMail, userName: user.userName }, { password: newPassword });
        res.status(200).json({
            message: "success"
        })

    }
    catch (err) {
        res.status(500).json({
            message: " error",
            err
        })
    }
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

