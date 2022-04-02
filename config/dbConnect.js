const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI;
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async() =>{
    try{
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }catch(err) {
        console.log(err);
    }
}

module.exports = connectDB;