const next = require('next')
const routes = require('./routes')
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

//config initize
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL)

//Models
require('./models/Organization')

//API
require('./api/Organization')(server)

app
  .prepare()
  .then(() => {
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.use((err, req, res, next) => {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: 'Unauthorized' })
      }
    })

    server.use(handle).listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
