const mongoose = require("mongoose");

// var mongoURL = 'mongodb+srv://sathya:sathyapr@cluster0.dkuc0.mongodb.net/mern-pizza'
var mongoURL = 'mongodb+srv://cgray009:Iwillfollow7@demo-cluster.40t16.mongodb.net/pizza?retryWrites=true&w=majority'

mongoose.connect(mongoURL , {useUnifiedTopology:true , useNewUrlParser:true})

var db = mongoose.connection

db.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull');
})

db.on('error' , ()=>{
    console.log(`Mongo DB Connection failed`);
})

module.exports =mongoose