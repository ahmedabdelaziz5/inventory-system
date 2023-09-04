const Joi = require('joi') ; 

module.exports = {

    addProductValid : {
        
        
        body:Joi.object().required().keys({

            productName : Joi.string().required().messages({
                "string.empty" : "product name can not be empty",
                "any.required" : "product name is required"
            }),

            productSerialNumber : Joi.string().required().messages({
                "string.empty" : "product serial number can not be empty",
                "any.required" : "product serial number is required"
            }),

            productQuantity : Joi.number().required().messages({
                "string.empty" : "product quantity can not be empty",
                "any.required" : "product quantity is required"
            }),

            limit : Joi.number().required().messages({
                "string.empty" : "limit can not be empty",
                "any.required" : "limit is required"
            }),

            productCategory : Joi.string().required().messages({
                "string.empty" : "product category can not be empty",
                "any.required" : "product category is required"
            }),

            countryOfProductOrigin : Joi.string().required().messages({
                "string.empty" : "country of product origin can not be empty",
                "any.required" : "country of product origin is required"
            }),

            productPrice : Joi.number().required().messages({
                "string.empty" : "product price can not be empty",
                "any.required" : "product price is required"
            }),

        })
    }, 

    updateProductValid : {
        body:Joi.object().required().keys({

            productName : Joi.string(),

            productSerialNumber : Joi.string(),

            productQuantity : Joi.number(),

            limit : Joi.number(),

            productCategory : Joi.string(),

            countryOfProductOrigin : Joi.string(),

            productPrice : Joi.number()
            
        })
    },

}
