var express = require('express');
var cors = require('cors');
require('dotenv').config()
var parser = require('body-parser')
var multer = require('multer')
const upload = multer({ dest: 'uploads/' })


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(parser.json())
app.use(parser.urlencoded({extended:true}))

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
    
});

app.post("/api/fileanalyse", upload.single('upfile'), (req,res)=>{

  var fileData = req.file
  // res.json(fileData)
  res.json(
    {
      name:fileData.originalname, 
      type:fileData.mimetype, 
      size : fileData.size
    })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
