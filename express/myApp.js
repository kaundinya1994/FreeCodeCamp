var express = require('express');
var app = express();
var bodyParser = require('body-parser')
//console.log("Hello World")
var mongoose = require('mongoose')
// app.get('/', (req,res)=>{res.send("Hello Express")})

// var absPath = __dirname + "/views/index.html"
// app.get("/",(req,res)=>{
//   res.sendFile(absPath)
// })

// app.use('/public',express.static(__dirname+"/public"))
// app.get("/json", function (req, res) { 
//   var message = "Hello json"; 
//   if(process.env.MESSAGE_STYLE == "uppercase"){
//     message=message.toUpperCase()
//   }else {
//     message=message; 
//   } 
//   console.log(message)
//   res.json({"message": message}); 
// });


// 6 Use the .env File
// app.get("/json", function(req, res) {
// const mySecret = process.env['MESSAGE_STYLE']

//   if (mySecret === "uppercase")
//     {
//     res.json({"message": "HELLO JSON"})
//     }
//   else
//   {
//     res.json({"message": "Hello json"})

//   }
// })

// 7 Implement a Root-Level Request Logger Middleware
// app.use('/',(req,res,next)=>{
//   console.log(req.method + " " + req.path + " - " + req.ip)
//   next()
// })

// 8 Chain Middleware to Create a Time Server
// app.get('/now', (req,res,next)=>{
//   req.time = new Date().toString()
//   next()
// },
// (req,res)=>{
//   res.json({time:req.time})
// },
// )


// 9 Get Route Parameter Input from the Client
// app.get('/:word/echo', (req,res)=>{
//   res.json({echo:req.params.word})
// })

// 10 Get Query Parameter Input from the Client
// app.get('/name', (req,res)=>{
//   console.log(req.query.first +" "+ req.query.last)
//   res.json({name: req.query.first +" "+ req.query.last})
// })

// 11 Use body-parser to Parse POST Requests
// app.use(bodyParser.urlencoded({extended: false}))

// // 12 Get Data from POST Requests
// app.post('/name', (req,res)=>{

//   res.json({name : req.body.first +" "+req.body.last})
// })


// 1 Install and Set Up Mongoose

const mySecret = "mongodb+srv://username:pass123@cluster0.eio2c.mongodb.net/clusterDB?retryWrites=true&w=majority"

mongoose.connect(mySecret, { useNewUrlParser: true });


















 module.exports = app;
