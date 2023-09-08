const app = require('express').Router();

const {
    addProduct, 
    deleteProduct, 
    updateProduct,
    getSpecificProduct,
    getSpecificCategory,
    getLimitedItems,
    getAllProducts,
} = require('../controller/product.controller');// controllers 

const {
    addProductValid, 
    updateProductValid,
} = require('../modules/product/product.validation'); // validation schemas 

const {validateRequest} = require('../validator/req.validation'); // validation schemas 
const decodeToken = require('../Auth/tokenDecoding'); // middleware to decode token 

app.get('/getSpecificProduct/:productName',decodeToken(), getSpecificProduct) ; 
app.get('/getSpecificCategory/:categoryName',decodeToken(), getSpecificCategory) ; 
app.get('/getLimitedItems', decodeToken(), getLimitedItems) ; 
app.get('/getAllProducts', decodeToken(), getAllProducts) ; 
app.post('/addProduct', decodeToken(), validateRequest(addProductValid), addProduct) ; 
app.delete('/deleteProduct/:productId', decodeToken(), deleteProduct) ; 
app.put('/updateProduct/:productId', decodeToken(), validateRequest(updateProductValid), updateProduct) ; 


module.exports = app ; 
