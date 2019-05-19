const next = require('next')
const app = require('express')()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const io = require('socket.io')(server)

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

const aws = require('aws-sdk')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//config initize
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL)

//AWS
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_RESGION,
})

//Socket
require('./services-backend/socket')(io)

//Models
require('./models/Organization')
require('./models/Group')
require('./models/Seller')
require('./models/Item')
require('./models/PO')

//API
require('./api/Organization')(app)
require('./api/Group')(app)
require('./api/Seller')(app)
require('./api/Item')(app)
require('./api/PurchaseOrder')(app)

nextApp
  .prepare()
  .then(() => {
    app.get('*', (req, res) => {
      return nextHandler(req, res)
    })

    app.use((err, req, res, next) => {
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
