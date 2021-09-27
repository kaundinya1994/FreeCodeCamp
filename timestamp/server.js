// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// ==========================================

app.get("/api/:date", (req,res)=>{
  let date = req.params.date
  
  if(parseInt(date) > 10000){
    let unixDate = new Date(parseInt(date))
    res.json({unix : unixDate.valueOf(), utc:unixDate.toUTCString()})
  }
  else{
    var dateT = new Date(date)
    if(dateT == "Invalid Date"){
      res.json({error : "Invalid Date"})
    }
    res.json({unix : dateT.valueOf(), utc:dateT.toUTCString()})
  }

  

})

app.get("/api/", (req,res)=>{

  var date = new Date()
  res.json({unix : date.valueOf(), utc: date.toUTCString()})
})

// ==========================================


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});