var charset = "@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz";
var length = 12;

// function to generate random passwords with length X and send it to the user who forgot this password 
exports.generatePasswod = () => {

    let newPassword = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        newPassword += charset.charAt(Math.floor(Math.random() * n));
    }
    return newPassword;
};
