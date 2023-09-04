# inventory application : 

#### This was my first task on my internship @Asterisc Technocra 

#### The objective is to ensure accurate recording, computation, and production of sales reports, providing reliable insights into business performance. By achieving these goals, the project aims to enhance mentorint , recording , keep track of products , bussiness and inventory management processes

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
|/addProduct|POST|allow you to add your products
|/deleteProduct/:productId|DELETE|allow you to delete any product
|/updateProduct/:productId|PUT|allow you to update/edit any product
|/getSpecificProduct/:productId|POST|allow you to search for any product
|/getSpecificCategory/:categoryName|POST|allow you to get all products that belongs a specific category
|/getLimitedItems|POST|allow you to get all the limited products which need to be refiled
|/getAllProducts|POST|allow you to get all the products you have in your inventory system



#### note : all the services is on production mode using onrender cloud services

