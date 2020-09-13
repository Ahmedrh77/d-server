const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin-ahmed:test123@cluster0.hn6mg.mongodb.net/data', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log('MongoDb Connected')
    } catch (error) {

        console.log(error.message)
    }
}

module.exports=connect