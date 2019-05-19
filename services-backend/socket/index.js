module.exports = io => {
  io.on('connection', client => {
    let userSocket = client.handshake.query.userSocket

    client.on('joinroom', () => {
      client.join(userSocket)
    })

    client.on('openpo', () => {
      io.to(userSocket).emit('openpo', {})
    })

    client.on('disconnect', () => {
      console.log('Got disconnect!', userSocket)
      io.to(userSocket).emit('closepo', {})
    })

    client.on('showitem', item => {
      // console.log('send item', userSocket, item)
      io.to(userSocket).emit('showitem', item)
    })

    // client.on('dc', function(data) {
    //   console.log('send dc')

    //   const {
    //     auth: { _id },
    //     value,
    //   } = data

    //   io.to(_id).emit('dc', value)
    // })

    // client.on('credit', function(data) {
    //   console.log('send credit')

    //   const {
    //     auth: { _id },
    //     value,
    //   } = data

    //   io.to(_id).emit('credit', value)
    // })

    // client.on('creditcharge', function(data) {
    //   console.log('send creditcharge')
    //   const {
    //     auth: { _id },
    //     value,
    //   } = data

    //   io.to(_id).emit('creditcharge', value)
    // })

    // client.on('closepo', function(data) {
    //   console.log('closepo')
    //   const {
    //     auth: { _id },
    //   } = data

    //   io.to(_id).emit('closepo', {})
    // })

    // client.on('submitpo', function(data) {
    //   console.log('submitpo')
    //   const {
    //     auth: { _id },
    //     receivecash,
    //     grandtotal,
    //   } = data

    //   io.to(_id).emit('submitpo', { receivecash, grandtotal })
    // })
  })
}
