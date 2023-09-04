const mongoose = require('mongoose') ; 

const productSchema = new mongoose.Schema({
    userName : {type : String , required : true},
    userId : {type : mongoose.Types.ObjectId , required : true },
    inventoryName  : { type : String, required : true  } , 
    productName : {type : String, required : true  },
    productSerialNumber : {type : String, required : true  },
    productQuantity : {type : Number, required : true  },
    limit : {type : Number, required : true  },
    productCategory : {type : String, required : true  },
    countryOfProductOrigin : {type : String, required : true  },
    productPrice : {type : Number, required : true  },
    addedAt : {type : Date, required : true},
    islimited : {type : Boolean , default : false }
});


productSchema.index({userId : -1 });
productSchema.index( {productCategory : -1});

const productModel = mongoose.model('product', productSchema) ;
const collection = productModel.collection ; 

productModel.createIndexes(); 

// collection.getIndexes((error,indexes)=>{
//     if(error) console.log(error); 
//     else console.log(indexes) ;
// })

module.exports = productModel ;