const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongo = require("mongodb")
const mongoose = require("mongoose")
const parser = require('body-parser')


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const mongoURI = "mongodb+srv://username:pass123@cluster0.eio2c.mongodb.net/clusterDB?retryWrites=true&w=majority"

mongoose.connect(mongoURI, {useNewUrlParser :true, useUnifiedTopology:true})
////////////////////////////////////////
// User Schema and Model

var userSchema = mongoose.Schema({
  username : {type: String}
})

var userModel = mongoose.model("userModel", userSchema)

////////////////////////////////////////


app.use(parser.json())
app.use(parser.urlencoded({extended:true}))

///////////////////////////////////////


///////////////////////////////////////
// Excersice Schema and Model
var excerSchema = new mongoose.Schema({
  userID : {type : String, required: true},
  description : {type : String, required: true},
  duration : {type : Number, required: true},
  date : Date
})

var excerModel = mongoose.model("excerModel", excerSchema)

///////////////////////////////////////


// First API
app.post("/api/users", (req,res)=>{

  var user_name = req.body.username

  var newUser = new userModel({
    username: user_name
  })

  newUser.save((err, data)=>{
    if(err) console.log(err)

    res.json(data)
  })

})
// First API - End
///////////////////////////////////////

///////////////////////////////////////
// Second API 

app.get("/api/users", (req,res)=>{

  userModel.find((err,data)=>{
    // console.log(data)
    res.json(data)
  })
})
// Second API - End
///////////////////////////////////////

///////////////////////////////////////
// Third API 
app.post("/api/users/:_id/exercises", (req,res)=>{

  var uid = req.params._id

  var newExcer = new excerModel({
    userID: uid,
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date || new Date() 
  })

  newExcer.save((err,data)=>{
    if(err) res.json(err)
    // res.json(data)
    var excerData = data
    userModel.findById(data.userID, 
    (err,data)=>{
      if(err) res.json(err)
        console.log("\n This is from findById")
        console.log({
          username: data.username,
          description: excerData.description,
          duration: excerData.duration,
          date: excerData.date.toDateString(),
          _id: excerData.userID
        })    
        console.log("\n ==================")

          res.json({
          username: data.username,
          description: excerData.description,
          duration: excerData.duration,
          date: excerData.date.toDateString(),
          _id: excerData.userID
        })     
    })
  })
  // res.json(req.body)
})

// Second API - END
///////////////////////////////////////


///////////////////////////////////////
// Third API 
var allExcerUserData

app.get("/api/users/:_id/logs", async (req,res)=>{


  // Example : Copy paste this into browser to test 
  
  //https://boilerplate-project-exercisetracker.tryanyways1.repl.co/api/users/6150251676c17cf78ff221ca/logs?limit=3&from=%221994-02-01%22&to=%222200-01-01%22

  var fromDate = new Date(req.query.from)
  var toDate = new Date(req.query.to)
  var nextToDate = new Date(toDate)
  nextToDate.setDate(nextToDate.getDate() + 1);

  var limit = req.query.limit
  var userID = req.params._id

  if(fromDate == "Invalid Date" ){
     fromDate = new Date("1970-1-01") 
  }

  if(nextToDate == "Invalid Date" ){
     nextToDate = new Date()
     nextToDate.setDate(nextToDate.getDate() + 1) 
  }

  if(!limit){
     limit = 10000 
  }
  

  console.log(req.params._id)
  console.log(fromDate)
  console.log( nextToDate )
  console.log(parseInt(limit))

  var excersiceData = await excerModel
  .find({userID: req.params._id, "date": {
    '$gte': fromDate,
    '$lt': nextToDate
  }}).limit(parseInt(limit))
  .exec((err,data)=>{
  // console.log("data ", data)

  var dataArr = []
  var info = {}
  for(var i = 0; i < data.length; i++) 
  {
    info.description = data[i].description;
    info.duration = data[i].duration;
    info.date = data[i].date.toDateString();
    dataArr.push(info)
    info = {}
  }
      // console.log("dataArr", dataArr)
      // res.json(dataArr)

      
  userModel.findById(userID)
  .exec((er, data)=>{
      info._id = data._id,
      info.username = data.username,
      info.count = dataArr.length
      info.log = dataArr
    res.json(info)
  })
  })
})





// Thrid API - END
///////////////////////////////////////
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
