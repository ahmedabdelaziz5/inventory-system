const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors()); // http -> https  

require("dotenv").config();

// db config  
const {connection} = require("./config/db.config");
connection();

//routes
app.use(require('./route/user.route')) ; 
app.use(require('./route/product.route')) ; 

const http = require("http");
const server = http.createServer(app);

//production port
server.listen(process.env.PORT || 3000, process.env.LOCAL_HOST || "0.0.0.0", () => {
    console.log(`Server is up and runing on port ${process.env.PORT}!`)
})

