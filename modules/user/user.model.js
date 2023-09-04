const mongoose = require('mongoose') ; 

const userSchema = new mongoose.Schema({
    email  : { type : String, required : true } , 
    bussinesName  : { type : String, required : true } , 
    inventoryName  : { type : String, required : true  } , 
    userName  : { type : String, required : true  } , 
    password  : { type : String, required : true  } , 
    bussinesIndustry : {type : String , required : true },
    isVerified : {type : Boolean , default : false },
});

exports.userModel = mongoose.model('user', userSchema) ;
