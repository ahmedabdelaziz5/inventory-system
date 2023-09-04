# inventory application : 

#### This was my first task on my internship @Asterisc Technocrat 

#### I used these technologies :
![Static Badge](https://img.shields.io/badge/5.1.1-bcrypt-red)
![Static Badge](https://img.shields.io/badge/5.1.1-bcrypt-red)
![Static Badge](https://img.shields.io/badge/16.3.1-dotenv-yellow)
![Static Badge](https://img.shields.io/badge/4.18.2-express-blue)
![Static Badge](https://img.shields.io/badge/17.10.1-joi-green)
![Static Badge](https://img.shields.io/badge/9.0.2-jsonwebtoken-purple)
![Static Badge](https://img.shields.io/badge/7.0.4-mongoose-white)
![Static Badge](https://img.shields.io/badge/20.5.0-node-darkgreen)
![Static Badge](https://img.shields.io/badge/6.9.4-nodemailer-orange)
![Static Badge](https://img.shields.io/badge/3.0.1-nodemon-09c)

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



#### note : all the services is full production using `onrender` cloud services
#### you can run the project using the following command : `npm start`

