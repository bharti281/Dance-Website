const express= require("express")
const path = require('path')
const app= express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser")
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contact_Dance');
//   console.log("We are connected...");
}
const port = 800;

//Define mongooese schmea

const contactSchema = new mongoose.Schema({
    name: String,
    Phone: String,
    email: String,
    address: String,
    desc: String
  });


  const Contact = mongoose.model('Contact', contactSchema);




app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))


app.get('/',(req,res)=>{
    
    const params = { }
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    
    const params = { }
    res.status(200).render('contact.pug',params);
})


app.post('/contact',(req,res)=>{
    
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database ")
    }).catch(()=>{
        res.status(400).send("item was not save to the database")
    })

    // res.status(200).render('contact.pug');
})

app.listen(port,()=>{
    console.log(`This application started sucessfully on part ${port}`)
})


