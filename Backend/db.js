const mongoose = require('mongoose');
require("dotenv").config();


const connectToMongo=()=>{
    mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo");
}
module.exports = connectToMongo;