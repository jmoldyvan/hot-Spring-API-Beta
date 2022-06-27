// REQUIRE DEPENDENCIES
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
// var path = require('path')

app.use(cors())

// DECLARED DB VARIABLES
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'hot-spring-db'


// MONGO CONNECT
MongoClient.connect(dbConnectionStr)
    .then(client =>{
        console.log('ITS CONNECTED, TO THE DATABASE');
        db = client.db(dbName)
    })


// SET MIDDLEWARE
app.set('view engine','ejs')
// app.set("views", __dirname + "views")
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req,res) => {
    res.render(__dirname + "/views/index.ejs");
    // db.collection('hot-spring-col').find().toArray()
    // .then(data=>)
})

app.get('/:link', (req,res) => {
    const newPageLink = req.params.link.toLowerCase()
    console.log(newPageLink);
    res.render(__dirname + `/views/${newPageLink}.ejs`);
})

app.post('/api/nearest', (req, res) => {
    console.log('POST GOT');
    const {  lng, lat } = req.body
    console.log({lng, lat});
    db.collection('hot-spring-col').find({
      loc: {
         $geoWithin: { $centerSphere: [ [ lng, lat ], 50000/3963.2 ] }
             }
    }).toArray()
    .then(results => {
        console.log(results)
        res.send(results)
    })
  })









// SET UP LOCALHOST
app.listen(process.env.PORT || PORT, () => {
    console.log('SERVER ONLINE MAINFRAME');
})