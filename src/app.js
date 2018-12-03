console.log('Iniciando servidor back')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// configuración db
const mongo_conn = require('./mongoDBController')

// conexión db
var db = mongo_conn.connect();

// schema usuario
var User = require('../models/user')

// servicio get user
app.get('/user', (req,res) => {
  User.find(function(err,User){
    //res.send(User)
    if (err) {throw err;}
    else{
      res.json(User);
    }
  })
})

// Crear usuario 
app.post('/add_user', (req,res) => {
  var db = req.db
  var name = req.body.text1
  var job = req.body.text2

  var new_user = new User (
    {
      name: name,
      job: job
    }
  )

  new_user.save( (error) => {
    if (error){
      console.log(error)
    } else {
      console.log('Usuario insertado exitosamente')
      console.log(req.body);
    
    res.send({
      success: true,
      message: "Usuario dado de alta exitosamente",
      })
    }
  })
})

//app.listen(8089, () => {
  //console.log('Server on port 8089');

//})
app.set('port',process.env.PORT || 8089);
app.listen(app.get('port'),() => {
  console.log('Server on port', app.get('port'));
})

app.use(express.static(__dirname + '/public'));