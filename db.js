const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {

    const uri = process.env.MONGO_URI

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connection to MongoDB established!')
    }catch(err){
        console.error(err.message);
    }
}

module.exports =  dbConnection;