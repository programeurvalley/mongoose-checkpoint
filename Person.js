const mongoose = require("mongoose")

// Create Schema 

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age: Number,
    favoriteFoods:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model("Person", personSchema)