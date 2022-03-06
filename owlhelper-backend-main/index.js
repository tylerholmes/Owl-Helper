/*
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`)) 
  */

let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
//let multer = require('multer');
//let upload = multer();

let app = express();

//app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(upload.array());

//Require the Router we defined in professors.js
let professors = require('./routes/professors.js');

//Use the Router on the sub route /professors
app.use('/professors', professors);

app.listen(process.env.PORT || 5000);
