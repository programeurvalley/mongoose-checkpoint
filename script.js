const mongoose = require('mongoose');
const dotenv = require("dotenv");
const Person = require("./Person")

dotenv.config()

// Connect to the Database 

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xttzpjy.mongodb.net/test`, { useNewUrlParser: true, useUnifiedTopology: true });

//! Create and Save the Record 

/*

const person = new Person({name:"Abderrahmane", age:22 , favoriteFoods : ["Tacos","Pizza","Ramen"]})

person.save(function(err ,  data){ 
    if (err){
        console.log(err);
    }
    else{
        console.log(data)
    }
})

*/

//! Create Many Record

/*

async function ManyRecord(){
    const persons = await Person.create([
        {name:"John",age:21,favoriteFoods:["Panini","Pizza"]},
        {name:"Tarek",age:23,favoriteFoods:["Burger","Pizza"]},
        {name:"Racim",age:21,favoriteFoods:["Rechta","Couscous"]}
    ])
    
    console.log(persons)

}

ManyRecord()

*/

// Search In Database

Person.find({},function (err, data){
    if (err){
        console.log(err);
    }
    else{
        console.log(data);
    }
})

// Search for One Single Matching 

Person.find({favoriteFoods:"Rechta"}, function (err, data){
    if (err){
        console.log(err);
    }
    else{
        console.log(data);
    }
})

// Search for One by ID

var id = "6391ef79a09775a30f798940"

Person.findById(id, function (err, data){
    if (err){
        console.log(err);
    }
    else{
        console.log(data);
    }
})

//! Classic Update 

/*

const addfood = Person.findById("6391ef79a09775a30f798941" , function (err, data){
    if (err){
        console.log(err);
    }
    else{
        var foodlist = data.favoriteFoods
        foodlist = foodlist.push("Humburger");
        data.save();
        console.log(data.favoriteFoods);
    }
})

*/

// New Update Methods 

async function UpdatePerson(){
    let doc = await Person.findOneAndUpdate({name:"John"},{age:20},{new:true})
}

UpdatePerson()

//! Delete One Person 

/*
async function DeletePerson(){
    Person.findByIdAndRemove("6391ef79a09775a30f79893f", function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Removed User : ", docs.name);
        }
    })
}

DeletePerson()

*/

//! Delete all who has the name 'Mary'

Person.remove({name:'Mary'},function (err, result) {
    if (err){
        console.log(err)
    }else{
        console.log("Result :", result) 
    }
})

//? Search Query

    Person.aggregate([{$sort:{"name":1}},{$match:{favoriteFoods:"Burritos"}},{$limit:2},{$project:{"age":0}}]).exec(function done(err , data)  {
        if(err){
            console.log(err)
        }else{
            console.log(data)
        }
    })


// Person.updateOne({_id:ObjectId("6391ef79a09775a30f798941")},{$push:{favoriteFoods:"Humburger"}})
// db.people.updateOne({_id:ObjectId("6391ef79a09775a30f798941")},{$set : {favoriteFoods:["Rechta","Couscous"]}})
// db.people.aggregate({$sort:{"name":1}},{$match:{favoriteFoods:"Burritos"}},{$limit:2},{$project:{"age":0}})



