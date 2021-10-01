const mongoose = require("mongoose");

// var mongoDBURL = 'mongodb+srv://sathya:sathyapr@cluster0.dkuc0.mongodb.net/mern-ecommerce'
var mongoDBURL = 'mongodb+srv://cgray009:Iwillfollow7@demo-cluster.40t16.mongodb.net/Gray_Shop?retryWrites=true&w=majority'

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose
