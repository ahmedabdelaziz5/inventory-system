const bcrypt = require('bcrypt') ; 
const saltRounds = 7 ; 

exports.hashPassword = async(password) =>{
    let newPassword = await bcrypt.hash(password, saltRounds); 
    return newPassword ; 
}