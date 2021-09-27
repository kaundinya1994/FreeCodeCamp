require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongo  = require('mongodb')
const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const dns = require('dns')
const urlparser = require('url')

const shortid = require('shortid')

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());


bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// =================================================
// Defining MongoDB URI
var mongoURI = "mongodb+srv://username:pass123@cluster0.eio2c.mongodb.net/clusterDB?retryWrites=true&w=majority"

// Connecting Mongoose to MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

// Cretaing Schema
const URLSchema = new Schema({
  original_url: String ,
  short_url : String,
  suffix: String
})

// Creating Model
const URLModel = mongoose.model("URLModel", URLSchema)

app.post("/api/shorturl", (req,res)=>{

  var url = req.body.url
  var suffix = shortid.generate()
  
  var URLInfo = new URLModel({
    original_url: url ,
    short_url :  __dirname + "/api/shorturl/" + suffix,
    suffix: suffix
  })

  console.log(urlparser.parse(url))

  const something = dns.lookup(urlparser.parse(url).hostname,
  async (error,address) =>{

    if(!address){res.json({error:"Invalid URL"})}

    else
    {
      await URLInfo.save((err,data)=>{
      
      console.log(" Original URL \n",URLInfo.original_url)

        res.json(
          {
            status: 'Good URL',
            original_url : URLInfo.original_url,
            short_url : URLInfo.suffix
          })    
      })    
      
    }
  })      

  
})



app.get("/api/shorturl/:suffixID", (req,res)=>{


  var suffix_id = req.params.suffixID
  console.log("==============================")
  console.log("Suffix ID : ",req.params.suffixID)

  URLModel.find({suffix:suffix_id}, (err, data)=>{
    if(!data) {
      res.json({error:"Invalid URL"})
    }
    else{      
      console.log("data here ", data)
      var redirectURL = data[0].original_url
      res.redirect(redirectURL)
    }
  })

})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
