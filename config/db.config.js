const mongoose = require("mongoose");

// DB connection 
exports.connection = () => {
    try {
        mongoose.set("strictQuery", false);
        return mongoose.connect(
            process.env.CONNECTION_STRING,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => console.log("DB config is done .... ")) ;
    }
    catch (err) {
        console.log(`faild to conncect to database at ${process.env.CONNECTION_STRING}`) ;
    }

}

