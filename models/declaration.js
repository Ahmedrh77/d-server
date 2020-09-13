const mongoose = require('mongoose')


const declarationSchema = new mongoose.Schema({
    userId:{type:String,require:true},
    title: { type: String, require: true },
    date: { type: Date },
    status: { type: String, default: 'Non-Payée' }
})


const Declaration = mongoose.model('Declaration', declarationSchema)
module.exports = Declaration
