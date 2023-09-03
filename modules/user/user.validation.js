const Joi = require('joi') ; 

module.exports = {

    signUpValid : {
        
        body:Joi.object().required().keys({

            email : Joi.string().required().email().messages({
                "string.empty" : "email can not be empty",
                "any.required" : "email is required"
            }),

            bussinesName : Joi.string().required().messages({
                "string.empty" : "bussines name can not be empty",
                "any.required" : "bussines name is required"
            }),

            inventoryName : Joi.string().required().messages({
                "string.empty" : "inventory name can not be empty",
                "any.required" : "inventory name is required"
            }),

            userName : Joi.string().required().messages({
                "string.empty" : "user name can not be empty",
                "any.required" : "user name is required"
            }),

            password : Joi.string().required().messages({
                "string.empty" : "password can not be empty",
                "any.required" : "password is required"
            }),

            confirmPassword : Joi.string().required().messages({
                "string.empty" : "confirm password can not be empty",
                "any.required" : "confirm password is required"
            }),

            bussinesIndustry : Joi.string().required().messages({
                "string.empty" : "bussines Industry can not be empty",
                "any.required" : "bussines Industry is required"
            }),

        })
    }, 

    loginValid : {
        body:Joi.object().required().keys({

            userName : Joi.string().required().messages({
                "string.empty" : "user name can not be empty",
                "any.required" : "user name is required"
            }),

            password : Joi.string().required().messages({
                "string.empty" : "password can not be empty",
                "any.required" : "password is required"
            }),

        })
    },

    forgetPasswordValid : {
        body:Joi.object().required().keys({

            email : Joi.string().required().email().messages({
                "string.empty" : "email can not be empty",
                "any.required" : "email is required"
            }),
            
        })
    },

    editProfileValid : {
        body:Joi.object().required().keys({

            email : Joi.string().email(),

            bussinesName : Joi.string(),

            inventoryName : Joi.string(),

            userName : Joi.string(),

            bussinesIndustry : Joi.string(),

        })
    },

    changePasswordValid : {
        body:Joi.object().required().keys({

            oldPassword : Joi.string().required().messages({
                "string.empty" : "old password can not be empty",
                "any.required" : "old password is required"
            }),

            password : Joi.string().required().messages({
                "string.empty" : "password can not be empty",
                "any.required" : "password is required"
            }),

            confirmPassword : Joi.string().required().messages({
                "string.empty" : "confirm password can not be empty",
                "any.required" : "confirm password is required"
            }),

        })
    },
    
}
