const express = require("express");
const fs = require('fs');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const path = require('path');
const { stringify } = require("querystring");

app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const contactschema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    text:String
});

const contact = mongoose.model('contact', contactschema);
 
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('index.html',params);
})

app.get('/contact',(req,res)=>{
    const params={};
    res.sendFile('contact.html' , params);
})

app.post('/contact' , (req,res)=>{
    var myData =new Contact (req.body);
    myData.save().then(()=>{
        res.send("data saved")
    }).catch(()=>{
            res.status(400).send("data not saved")
    });
})    

app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})