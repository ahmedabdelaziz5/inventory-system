const mongoose = require('mongoose') ; 
const saltRounds = 7 ;

const userSchema = new mongoose.Schema({
    email  : { type : String, required : true } , 
    bussinesName  : { type : String, required : true } , 
    inventoryName  : { type : String, required : true  } , 
    userName  : { type : String, required : true  } , 
    password  : { type : String, required : true  } , 
    bussinesIndustry : {type : String , required : true },
    isVerified : {type : Boolean , default : false },
})

// hooks to catch and hash the password before storing it in db 
userSchema.pre("create",async function(next){ 
    this.password = await bcrypt.hash(this.password,saltRounds);
    next();
});

exports.userModel = mongoose.model('user', userSchema) ;
