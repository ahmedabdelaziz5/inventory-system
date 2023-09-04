# inventory application 

#### The objective is to ensure accurate recording, computation, and production of sales reports, providing reliable insights into business performance. By achieving these goals, the project aims to enhance operational efficiency, facilitate informed decision-making, and optimize sales and inventory management processes

#### You can mentor , record and keep track of your products and bussiness

# User module :

#### user schema : 

```JavaScript
{
    email  : { type : String, required : true } , 
    bussinesName  : { type : String, required : true } , 
    inventoryName  : { type : String, required : true  } , 
    userName  : { type : String, required : true  } , 
    password  : { type : String, required : true  } , 
    bussinesIndustry : {type : String , required : true },
    isVerified : {type : Boolean , default : false },
}

```

#### User endPoints : 

|Endpoint|Method|Usage
|-------:|-----:|-----
|/signUp|POST|allow you t ocreate account 
|/login|POST|allow you to sign in your account
|/forgetPassword|POST|allow you to ask for a new password
|/changePassword|PATCH|allow you to update/change your password
|/editProfile|POST|allow you to edit/update youe prodile data
|/verifyAccount|GET|allow you to send a verification mail after creating account



# Product module :

#### user schema : 

```JavaScript
{
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
}

```

#### Product endPoints : 

|Endpoint|Method|Usage
|-------:|-----:|-----
|/addProduct|POST|allow you t ocreate account 
|/deleteProduct/:productId|DELETE|allow you to sign in your account
|/updateProduct/:productId|PUT|allow you to ask for a new password
|/getSpecificProduct/:productId|POST|allow you to update/change your password
|/getSpecificCategory/:categoryName|POST|allow you to edit/update youe prodile data
|/getLimitedItems|POST|allow you to send a verification mail after creating account
|/getAllProducts|POST|



