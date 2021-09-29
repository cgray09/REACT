const mongoose = require("mongoose");

var mongoDBURL = 'mongodb+srv://cgray009:Iwillfollow7@demo-cluster.40t16.mongodb.net/Hotel?retryWrites=true&w=majority'
// var mongoDBURL = 'mongodb+srv://sathya:sathyapr@cluster0.wrqpt.mongodb.net/sheyrooms'
// mongodb+srv://cgray009:Iwillfollow7@demo-cluster.40t16.mongodb.net/Hotel?retryWrites=true&w=majority

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose