const next = require('next')
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

//config initize
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL)

//Models
require('./models/Organization')
require('./models/Group')
require('./models/Seller')
require('./models/Item')

//API
require('./api/Organization')(server)
require('./api/Group')(server)
require('./api/Seller')(server)
require('./api/Item')(server)



const upload = require('./services-backend/image-upload');
const singleUpload = upload.single('image')

app
  .prepare()
  .then(() => {

    server.post('/image-upload', function(req, res) {
      singleUpload(req, res, function(err, some) {
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
        return res.json({'imageUrl': req.file.location});
      });
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.use((err, req, res, next) => {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: 'Unauthorized' })
      }
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack) 
    process.exit(1)
  })
